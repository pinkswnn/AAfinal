import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { upsertBrevoContact } from "@/lib/brevo";

// Basic in-memory rate limit (best effort). Replace with Upstash/Redis for production.
const bucket = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 15;

const Schema = z.object({
  formId: z.string().min(1).max(64),
  email: z.string().email().optional(),
  name: z.string().max(120).optional(),
  source: z.string().max(120).optional(),
  interest: z.string().max(200).optional(),
  payload: z.record(z.any()).optional(),
});

function getIP(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}

function hashIP(ip: string) {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIP(req);
    const ipHash = hashIP(ip);
    const now = Date.now();

    const existing = bucket.get(ipHash);
    if (!existing || now - existing.ts > WINDOW_MS) {
      bucket.set(ipHash, { count: 1, ts: now });
    } else {
      existing.count += 1;
      if (existing.count > MAX_PER_WINDOW) {
        return NextResponse.json(
          { ok: false, error: "Too many requests. Please try again soon." },
          { status: 429 }
        );
      }
    }

    const json = await req.json();
    const data = Schema.parse(json);

    const supabase = supabaseAdmin();

    if (data.email) {
      await supabase.from("leads").insert({
        email: data.email,
        name: data.name ?? null,
        source: data.source ?? "website",
        interest: data.interest ?? null,
      });

      // CRM tag/attributes mapping
      try {
        await upsertBrevoContact({
          email: data.email,
          attributes: {
            FIRSTNAME: data.name ?? "",
            SOURCE: data.source ?? "website",
            INTEREST: data.interest ?? "",
          },
        });
      } catch (e) {
        // Do not fail the user because CRM is down.
        console.error(e);
      }
    }

    await supabase.from("form_submissions").insert({
      form_id: data.formId,
      email: data.email ?? null,
      payload: data.payload ?? {},
      ip_hash: ipHash,
      user_agent: req.headers.get("user-agent") ?? null,
    });

    // Internal notification hook (replace with Brevo transactional or Resend)
    console.log("[forms/submit] new submission:", { formId: data.formId, email: data.email });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const msg = err?.message ?? "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}

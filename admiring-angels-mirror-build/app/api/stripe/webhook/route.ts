import { NextRequest, NextResponse } from "next/server";
import { stripeServer } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { upsertBrevoContact } from "@/lib/brevo";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ ok: false, error: "Missing signature/secret" }, { status: 400 });
  }

  const stripe = stripeServer();
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Bad signature" }, { status: 400 });
  }

  const supabase = supabaseAdmin();

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      await supabase.from("orders").insert({
        email: session.customer_details?.email ?? null,
        stripe_checkout_id: session.id,
        stripe_payment_intent: session.payment_intent ?? null,
        amount_cents: session.amount_total ?? null,
        currency: session.currency ?? "usd",
        status: "paid",
      });

      const email = session.customer_details?.email;
      if (email) {
        try {
          await upsertBrevoContact({
            email,
            attributes: { LAST_PURCHASE: new Date().toISOString() },
          });
        } catch (e) {
          console.error(e);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err?.message ?? "Webhook handler failed" }, { status: 500 });
  }
}

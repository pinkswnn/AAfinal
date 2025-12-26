"use client";

import { useEffect, useId, useRef, useState } from "react";

function buildMailto() {
  const subject = encodeURIComponent("I want a safe next step");
  const body = encodeURIComponent(
`Hi Admiring Angels,

I’m rebuilding after divorce or domestic violence. I’d like to know the next safe step to join your community.

Name (optional):
Preferred way to connect:

Thank you.`
  );
  return `mailto:support@admiringangels.com?subject=${subject}&body=${body}`;
}

export function ConnectModalTrigger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <>
      <button
        type="button"
        data-connect-open={id}
        className={
          "inline-flex items-center justify-center rounded-full border border-roseDeep/50 bg-gradient-to-br from-rose to-roseDeep px-4 py-3 text-sm font-semibold text-white shadow-silk2 transition hover:-translate-y-[1px] hover:shadow-silk " +
          className
        }
      >
        {children}
      </button>
      <ConnectModal anchorId={id} />
    </>
  );
}

function ConnectModal({ anchorId }: { anchorId: string }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.matches(`[data-connect-open="${anchorId}"]`)) setOpen(true);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [anchorId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const first = dialogRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const mailto = buildMailto();

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[640px] overflow-hidden rounded-xl2 border border-white/70 bg-white/90 shadow-[0_30px_90px_rgba(0,0,0,.25)] backdrop-blur-xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-black/10 p-5">
          <div>
            <div className="text-lg font-semibold">A private way to connect</div>
            <div className="mt-1 text-sm text-black/65">
              Choose the option that feels safest. You can edit everything before
              sending.
            </div>
          </div>
          <button
            type="button"
            className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold shadow-silk2 transition hover:-translate-y-[1px] hover:border-rose/35"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="grid gap-3 p-5">
          <a
            className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white/90 p-4 transition hover:border-rose/35 hover:shadow-silk2"
            href={mailto}
          >
            <div>
              <div className="text-sm font-semibold">Email (recommended)</div>
              <div className="text-sm text-black/65">
                Opens your email with a prewritten message.
              </div>
            </div>
            <span aria-hidden="true">→</span>
          </a>

          <a
            className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white/90 p-4 transition hover:border-rose/35 hover:shadow-silk2"
            href="https://www.facebook.com/share/1FoD9rCvGL/?mibextid=wwXIfr"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div>
              <div className="text-sm font-semibold">Visit Facebook</div>
              <div className="text-sm text-black/65">
                Opens in a new tab (if you’re ready).
              </div>
            </div>
            <span aria-hidden="true">↗</span>
          </a>

          <div className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white/90 p-4">
            <div>
              <div className="text-sm font-semibold">Prefer silence?</div>
              <div className="text-sm text-black/65">
                Copy our email and reach out later. No pressure.
              </div>
            </div>
            <button
              type="button"
              className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold shadow-silk2 transition hover:-translate-y-[1px] hover:border-rose/35"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText("support@admiringangels.com");
                } catch {
                  // ignore
                }
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ConnectModalTrigger } from "@/components/ui/connect-modal";
import { QuickExitButton } from "@/components/ui/quick-exit";
import { Reveal } from "@/components/motion/Reveal";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

export default function HomePage() {
  return (
    <SmoothScroll>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-transparent.png"
              alt="Admiring Angels"
              width={220}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-4 text-sm text-black/70 md:flex">
            <a className="rounded-xl px-3 py-2 hover:bg-rose/10 hover:text-black" href="#why">Why we exist</a>
            <a className="rounded-xl px-3 py-2 hover:bg-rose/10 hover:text-black" href="#support">How support works</a>
            <a className="rounded-xl px-3 py-2 hover:bg-rose/10 hover:text-black" href="#healing">Why healing matters</a>
            <a className="rounded-xl px-3 py-2 hover:bg-rose/10 hover:text-black" href="#resources">Immediate support</a>
          </nav>

          <div className="flex items-center gap-2">
            <QuickExitButton />
            <ConnectModalTrigger className="hidden sm:inline-flex">
              I need a safe next step
            </ConnectModalTrigger>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto grid w-[min(1120px,calc(100%-2rem))] gap-5 md:grid-cols-[1.1fr_.9fr] md:items-stretch">
            <div className="relative overflow-hidden rounded-xl2 border border-black/10 bg-white/80 shadow-silk">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_0%_0%,rgba(217,137,156,.20),transparent_55%),radial-gradient(620px_320px_at_100%_20%,rgba(201,162,76,.18),transparent_55%)]" />
              <div className="relative p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-gold to-rose" />
                  A dignity-first healing community
                </div>

                <Reveal>
                  <h1 className="mt-4 text-[clamp(34px,5.4vw,54px)] font-semibold leading-[1.06] tracking-[-.6px]">
                    Heal with dignity.
                    <br />
                    Begin again—without shame.
                  </h1>
                </Reveal>

                <p className="mt-3 max-w-[62ch] text-[clamp(16px,1.35vw,19px)] text-black/70">
                  Admiring Angels is a safe community for women rebuilding after{" "}
                  <span className="font-semibold text-black/90">divorce</span>{" "}
                  or{" "}
                  <span className="font-semibold text-black/90">
                    domestic violence
                  </span>
                  . You don’t have to explain everything to be supported. You only
                  need a gentle place to start.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <ConnectModalTrigger>Join the circle privately</ConnectModalTrigger>
                  <a
                    className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold shadow-silk2 transition hover:-translate-y-[1px] hover:border-rose/35"
                    href="#resources"
                  >
                    If you need help right now
                  </a>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-black/60">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-rose/20 bg-rose/10">
                      ✧
                    </span>
                    <div>
                      <span className="font-semibold text-black/80">
                        Privacy respected.
                      </span>{" "}
                      No public forms. No pressure. Just a calm next step.
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-rose/20 bg-rose/10">
                      ⌘
                    </span>
                    <div>
                      Safety tip: you can close this page fast with{" "}
                      <kbd className="rounded-lg border border-black/20 bg-black/5 px-2 py-0.5 font-mono text-xs">
                        Ctrl
                      </kbd>{" "}
                      +{" "}
                      <kbd className="rounded-lg border border-black/20 bg-black/5 px-2 py-0.5 font-mono text-xs">
                        W
                      </kbd>
                      .
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl2 border border-black/10 bg-black shadow-silk">
              <Image
                src="/images/hero-angelbarnes.jpg"
                alt="Angel Barnes standing outdoors"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,16,19,.15),rgba(15,16,19,.45)_75%),radial-gradient(800px_500px_at_20%_20%,rgba(217,137,156,.12),transparent_60%)]" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/80 p-3 backdrop-blur-xl">
                <div className="text-sm font-semibold">Led by lived experience.</div>
                <div className="text-xs text-black/65">
                  Built for women who want to rebuild with privacy, peace, and power.
                </div>
              </div>
            </div>
          </div>

          {/* trust strip */}
          <div className="mx-auto mt-5 w-[min(1120px,calc(100%-2rem))] overflow-hidden rounded-xl2 border border-black/10 bg-white/80 shadow-silk">
            <div className="grid bg-black/5 md:grid-cols-3">
              {[
                { icon: "🛡️", title: "Dignity First", desc: "Healing should protect a woman’s pride and privacy." },
                { icon: "🤍", title: "Sacred Community", desc: "No woman should have to heal alone." },
                { icon: "✨", title: "Freedom to Begin Again", desc: "Starting over isn’t failure—it’s power." },
              ].map((i) => (
                <div key={i.title} className="flex gap-3 bg-white/90 p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl border border-rose/20 bg-rose/10">
                    {i.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{i.title}</div>
                    <div className="text-sm text-black/65">{i.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="why" className="py-12">
          <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
            <div className="flex flex-col gap-2">
              <h2 className="text-[clamp(24px,3.4vw,34px)] font-semibold tracking-[-.3px]">
                Why Admiring Angels exists
              </h2>
              <p className="max-w-[70ch] text-black/70">
                A calm space for women who want to reclaim their lives—quietly, bravely, and with dignity.
              </p>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl2 border border-black/10 bg-white/80 p-6 shadow-silk">
                <p className="text-black/75">
                  Admiring Angels was born from a season of rebuilding. After divorce, I learned what it feels like to heal with privacy and dignity—
                  and how many women never get that chance.
                </p>
                <p className="mt-3 text-black/75">
                  This is a space to breathe, to speak without shame, and to find the next right step with support beside you.
                  Your truth shaped you—but it does not define you.
                </p>

                <div className="mt-4 rounded-2xl border border-rose/20 bg-rose/10 p-4">
                  <div className="text-sm font-semibold">Our promise:</div>
                  <div className="text-sm text-black/70">
                    You deserve freedom, dignity, and the chance to live again.
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <ConnectModalTrigger>Reach out privately</ConnectModalTrigger>
                  <a className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold shadow-silk2 transition hover:-translate-y-[1px] hover:border-rose/35" href="#support">
                    See how support works
                  </a>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl2 border border-black/10 bg-black shadow-silk">
                <Image
                  src="/images/angelbarnes-portrait.jpg"
                  alt="Angel Barnes portrait"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur-xl">
                  <div className="text-sm font-semibold">Angel Barnes</div>
                  <div className="text-xs text-black/65">
                    Founder • Admiring Angels Women Support Services
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Choose */}
        <section className="py-8">
          <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
            <div className="flex flex-col gap-2">
              <h2 className="text-[clamp(24px,3.4vw,34px)] font-semibold tracking-[-.3px]">
                What do you need today?
              </h2>
              <p className="max-w-[70ch] text-black/70">
                Choose the path that feels safest. We’ll meet you there—gently.
              </p>
            </div>

            <div className="mt-5 rounded-xl2 border border-black/10 bg-white/80 p-4 shadow-silk">
              <div className="grid gap-3 md:grid-cols-3">
                <a href="#support" className="group rounded-2xl border border-black/10 bg-white/90 p-5 transition hover:-translate-y-[2px] hover:border-rose/30 hover:shadow-silk2">
                  <div className="text-sm font-semibold">I want community—without pressure</div>
                  <div className="mt-1 text-sm text-black/65">Learn about Sister Circles and gentle gatherings.</div>
                </a>

                <button type="button" className="group rounded-2xl border border-black/10 bg-white/90 p-5 text-left transition hover:-translate-y-[2px] hover:border-rose/30 hover:shadow-silk2" data-connect-modal>
                  <div className="text-sm font-semibold">I want to reach out privately</div>
                  <div className="mt-1 text-sm text-black/65">Open an email with a prewritten message (edit anytime).</div>
                </button>

                <a href="#resources" className="group rounded-2xl border border-black/10 bg-white/90 p-5 transition hover:-translate-y-[2px] hover:border-rose/30 hover:shadow-silk2">
                  <div className="text-sm font-semibold">I need immediate support</div>
                  <div className="mt-1 text-sm text-black/65">Hotlines and crisis support resources.</div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section id="support" className="py-12">
          <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
            <div className="flex flex-col gap-2">
              <h2 className="text-[clamp(24px,3.4vw,34px)] font-semibold tracking-[-.3px]">
                How we support your rebuilding
              </h2>
              <p className="max-w-[70ch] text-black/70">
                Simple. Structured. Human. Built for women healing after divorce or domestic violence.
              </p>
            </div>

            <div className="mt-5 rounded-xl2 border border-black/10 bg-white/80 shadow-silk">
              <div className="grid gap-3 p-4 md:grid-cols-3">
                {[
                  { title: "Sister Circles", desc: "Guided, dignity-first conversations where you can breathe, share, and rebuild—without being “fixed.”", tag: "Community building priority" },
                  { title: "Healing Gatherings + Book Clubs", desc: "Gentle structure and shared reflection—so growth feels possible, not overwhelming.", tag: "Rhythm + belonging" },
                  { title: "Resource Support + Referrals", desc: "We help you find a next step and connect to trusted resources—at your pace.", tag: "No pressure. No shame." },
                ].map((o) => (
                  <div key={o.title} className="rounded-2xl border border-black/10 bg-white/90 p-5 transition hover:-translate-y-[2px] hover:border-rose/30 hover:shadow-silk2">
                    <div className="text-lg font-semibold">{o.title}</div>
                    <div className="mt-2 text-sm text-black/65">{o.desc}</div>
                    <div className="mt-4 inline-flex rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs font-semibold">
                      {o.tag}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 pt-0">
                <div className="rounded-2xl border border-black/10 bg-white/90 p-5">
                  <div className="text-sm font-semibold">Want to be notified about upcoming circles?</div>
                  <div className="mt-1 text-sm text-black/65">
                    Join privately. You can say as much—or as little—as you want.
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <ConnectModalTrigger>I’m ready for a gentle next step</ConnectModalTrigger>
                    <button
                      className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold shadow-silk2 transition hover:-translate-y-[1px] hover:border-rose/35"
                      type="button"
                      id="copyEmail"
                    >
                      Copy email address
                    </button>
                    <span className="text-sm text-black/60">support@admiringangels.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Healing */}
        <section id="healing" className="py-12">
          <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
            <div className="flex flex-col gap-2">
              <h2 className="text-[clamp(24px,3.4vw,34px)] font-semibold tracking-[-.3px]">
                Why healing matters
              </h2>
              <p className="max-w-[70ch] text-black/70">
                This is your permission slip to choose peace—without apology.
              </p>
            </div>

            <div className="mt-5 rounded-xl2 border border-black/10 bg-white/80 p-6 shadow-silk">
              <p className="text-black/75">
                Healing isn’t pretending it didn’t happen. It’s reclaiming your future.
                It’s choosing yourself—quietly, consistently—until your life feels like yours again.
              </p>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  { n: 1, t: "You deserve calm.", d: "Safety is not a luxury—it’s your baseline." },
                  { n: 2, t: "Starting over is strength.", d: "Rebuilding is proof you refused to stay stuck." },
                  { n: 3, t: "Your dignity stays intact.", d: "You can heal privately and still rise powerfully." },
                ].map((i) => (
                  <div key={i.n} className="flex gap-3 rounded-2xl border border-black/10 bg-black/5 p-4">
                    <div className="grid h-7 w-7 place-items-center rounded-full border border-rose/20 bg-rose/10 text-xs font-semibold">
                      {i.n}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{i.t}</div>
                      <div className="text-sm text-black/65">{i.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ConnectModalTrigger>I’m ready for a gentle next step</ConnectModalTrigger>
                <a className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold shadow-silk2 transition hover:-translate-y-[1px] hover:border-rose/35" href="#resources">
                  If you need help right now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section id="resources" className="py-12">
          <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
            <div className="flex flex-col gap-2">
              <h2 className="text-[clamp(24px,3.4vw,34px)] font-semibold tracking-[-.3px]">
                If you need immediate support
              </h2>
              <p className="max-w-[80ch] text-black/70">
                You are not alone. If you’re in danger, call 911. If you need someone right now, use the resources below.
              </p>
            </div>

            <div className="mt-5 rounded-xl2 border border-black/10 bg-white/80 p-4 shadow-silk">
              <div className="grid gap-3">
                <details open className="rounded-2xl border border-black/10 bg-white/90 p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    National Domestic Violence Hotline
                  </summary>
                  <div className="mt-2 text-sm text-black/70">
                    Call:{" "}
                    <a className="underline underline-offset-4" href="tel:18007997233">
                      1-800-799-7233
                    </a>{" "}
                    • Text: “START” to{" "}
                    <a className="underline underline-offset-4" href="sms:88788">
                      88788
                    </a>
                  </div>
                </details>

                <details className="rounded-2xl border border-black/10 bg-white/90 p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Crisis Text Line (24/7)
                  </summary>
                  <div className="mt-2 text-sm text-black/70">
                    Text <span className="font-semibold">HOME</span> to{" "}
                    <a className="underline underline-offset-4" href="sms:741741">
                      741741
                    </a>
                    .
                  </div>
                </details>

                <details className="rounded-2xl border border-black/10 bg-white/90 p-4">
                  <summary className="cursor-pointer text-sm font-semibold">Safety note</summary>
                  <div className="mt-2 text-sm text-black/70">
                    Use the <span className="font-semibold">Quick Exit</span> button in the header if you need to leave fast.
                    Clearing browser history may also help keep your visit private.
                  </div>
                </details>
              </div>
            </div>

            <footer className="mt-7 border-t border-black/10 pt-6 text-sm text-black/65">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Image src="/images/logo-transparent.png" alt="Admiring Angels" width={160} height={36} className="h-7 w-auto" />
                  <div>
                    <div className="font-semibold text-black/80">Admiring Angels Women Support Services</div>
                    <div>Helping women heal and live again after divorce and domestic violence.</div>
                  </div>
                </div>
                <div className="text-black/70">
                  Contact:{" "}
                  <a className="underline underline-offset-4" href="mailto:support@admiringangels.com">
                    support@admiringangels.com
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}

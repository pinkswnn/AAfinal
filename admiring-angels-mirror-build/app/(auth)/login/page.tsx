import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto w-[min(520px,calc(100%-2rem))] py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 text-black/70">
        This is a baseline auth shell. Connect Supabase Auth UI or your preferred flow.
      </p>

      <div className="mt-8 rounded-xl2 border border-black/10 bg-white/80 p-6 shadow-silk">
        <p className="text-sm text-black/70">
          For full Mirror Build: implement email magic link or password sign-in with Supabase.
        </p>
        <div className="mt-4">
          <Link className="underline underline-offset-4" href="/">
            Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}

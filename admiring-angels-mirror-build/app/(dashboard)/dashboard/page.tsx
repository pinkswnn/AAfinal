import { supabaseAdmin } from "@/lib/supabase";

export default async function DashboardPage() {
  const supabase = supabaseAdmin();

  const { data: leads } = await supabase
    .from("leads")
    .select("id,email,name,source,created_at")
    .order("id", { ascending: false })
    .limit(25);

  const { data: submissions } = await supabase
    .from("form_submissions")
    .select("id,form_id,email,created_at")
    .order("id", { ascending: false })
    .limit(25);

  return (
    <main className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-black/70">
        Baseline back-office view: leads + submissions. Expand to orders, exports, and analytics.
      </p>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl2 border border-black/10 bg-white/80 p-6 shadow-silk">
          <h2 className="text-lg font-semibold">Leads</h2>
          <div className="mt-3 overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-black/60">
                <tr>
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Source</th>
                </tr>
              </thead>
              <tbody>
                {(leads ?? []).map((l) => (
                  <tr key={l.id} className="border-t border-black/10">
                    <td className="py-2 pr-3">{l.email}</td>
                    <td className="py-2 pr-3">{l.name ?? "—"}</td>
                    <td className="py-2 pr-3">{l.source ?? "—"}</td>
                  </tr>
                ))}
                {(leads ?? []).length === 0 && (
                  <tr><td className="py-4 text-black/60" colSpan={3}>No leads yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl2 border border-black/10 bg-white/80 p-6 shadow-silk">
          <h2 className="text-lg font-semibold">Form Submissions</h2>
          <div className="mt-3 overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-black/60">
                <tr>
                  <th className="py-2 pr-3">Form</th>
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {(submissions ?? []).map((s) => (
                  <tr key={s.id} className="border-t border-black/10">
                    <td className="py-2 pr-3">{s.form_id}</td>
                    <td className="py-2 pr-3">{s.email ?? "—"}</td>
                    <td className="py-2 pr-3">{new Date(s.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {(submissions ?? []).length === 0 && (
                  <tr><td className="py-4 text-black/60" colSpan={3}>No submissions yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

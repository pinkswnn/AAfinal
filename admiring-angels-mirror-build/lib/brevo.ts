type BrevoContact = {
  email: string;
  attributes?: Record<string, any>;
  listIds?: number[];
  updateEnabled?: boolean;
};

const BREVO_API = "https://api.brevo.com/v3";

export async function upsertBrevoContact(contact: BrevoContact) {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error("BREVO_API_KEY missing");

  const res = await fetch(`${BREVO_API}/contacts`, {
    method: "POST",
    headers: {
      "api-key": key,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ ...contact, updateEnabled: true }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Brevo error: ${res.status} ${txt}`);
  }
  return res.json().catch(() => ({}));
}

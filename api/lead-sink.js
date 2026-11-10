// Lead safety net — writes every form submission into Supabase `leads`.
// This is the record that survives even if email delivery fails.
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (Vercel → Settings → Environment Variables).
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return res.status(503).json({ saved: false, reason: 'Lead store not configured (missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).' });
  }

  try {
    const b = req.body || {};
    const row = {
      first_name: b.firstName || b.first_name || null,
      last_name: b.lastName || b.last_name || null,
      email: b.email || null,
      phone: b.phone || null,
      zip: b.zip || null,
      program: b.program || null,
      timeframe: b.startTimeframe || b.timeframe || null,
      message: b.message || null,
      source: b.source || 'website',
      page: b.page || null,
      emailed: b.emailed === true,
    };
    if (!row.phone && !row.email) {
      return res.status(400).json({ saved: false, reason: 'No phone or email supplied.' });
    }

    const r = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(row),
    });
    const text = await r.text();
    if (!r.ok) {
      console.error('[lead-sink] Supabase insert failed:', r.status, text.slice(0, 300));
      return res.status(502).json({ saved: false, reason: `Store rejected the lead (${r.status}).` });
    }
    let id = null;
    try { id = JSON.parse(text)?.[0]?.id ?? null; } catch { /* ignore */ }
    return res.status(200).json({ saved: true, id });
  } catch (err) {
    console.error('[lead-sink] Error:', err.message);
    return res.status(500).json({ saved: false, reason: 'Unexpected error.' });
  }
}

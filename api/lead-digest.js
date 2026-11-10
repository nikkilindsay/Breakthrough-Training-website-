// Daily lead digest — emails a summary of every lead captured in the last 24 hours.
// Call on a schedule (cron) or open /api/lead-digest?key=CRON_SECRET to run manually.
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, LEAD_ALERT_TO, CRON_SECRET
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.query?.key !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resend = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_TO || 'admissions@btieducation.com';
  if (!url || !key) return res.status(503).json({ error: 'Lead store not configured.' });

  try {
    const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const r = await fetch(
      `${url}/rest/v1/leads?select=*&created_at=gte.${since}&order=created_at.desc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    const rows = await r.json();
    if (!Array.isArray(rows)) return res.status(502).json({ error: 'Could not read leads.' });

    if (!rows.length) return res.status(200).json({ sent: false, count: 0, note: 'No leads in the last 24 hours.' });
    if (!resend) return res.status(200).json({ sent: false, count: rows.length, note: 'RESEND_API_KEY not set — leads are stored but not emailed.', leads: rows });

    const html = `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
        <h2 style="color:#0a7ea4;margin-bottom:4px">${rows.length} new lead${rows.length === 1 ? '' : 's'} in the last 24 hours</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr style="background:#f1f5f9">
            <th style="text-align:left;padding:8px;border:1px solid #ddd">When</th>
            <th style="text-align:left;padding:8px;border:1px solid #ddd">Name</th>
            <th style="text-align:left;padding:8px;border:1px solid #ddd">Phone</th>
            <th style="text-align:left;padding:8px;border:1px solid #ddd">Email</th>
            <th style="text-align:left;padding:8px;border:1px solid #ddd">Program</th>
            <th style="text-align:left;padding:8px;border:1px solid #ddd">Page</th>
          </tr>
          ${rows.map(l => `<tr>
            <td style="padding:8px;border:1px solid #ddd">${esc(new Date(l.created_at).toLocaleString('en-US', { timeZone: 'America/Chicago' }))}</td>
            <td style="padding:8px;border:1px solid #ddd"><strong>${esc(l.first_name)} ${esc(l.last_name)}</strong></td>
            <td style="padding:8px;border:1px solid #ddd"><a href="tel:${esc(l.phone)}">${esc(l.phone)}</a></td>
            <td style="padding:8px;border:1px solid #ddd">${esc(l.email)}</td>
            <td style="padding:8px;border:1px solid #ddd">${esc(l.program)}</td>
            <td style="padding:8px;border:1px solid #ddd">${esc(l.page || l.source)}</td>
          </tr>`).join('')}
        </table>
        <p style="margin-top:16px"><strong>Every lead is also saved in the database</strong> — ask for the admin view if this email is ever missed.</p>
      </div>`;

    const send = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resend}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LEAD_ALERT_FROM || 'BTI Leads <onboarding@resend.dev>',
        to: [to],
        subject: `${rows.length} new lead${rows.length === 1 ? '' : 's'} — Breakthrough Training Institute`,
        html,
      }),
    });
    const body = await send.text();
    if (!send.ok) return res.status(502).json({ error: 'Email provider rejected the digest.', detail: body.slice(0, 300) });
    return res.status(200).json({ sent: true, count: rows.length });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

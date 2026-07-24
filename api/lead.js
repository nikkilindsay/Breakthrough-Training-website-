import nodemailer from 'nodemailer';

// Lead capture endpoint — receives Request Info form submissions
// and emails them to admissions so the team can follow up by phone.
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, zip, program, startTimeframe, source } = req.body || {};

    if (!firstName || !lastName || !phone) {
      return res.status(400).json({ error: 'Please provide your first name, last name, and phone number.' });
    }

    const lead = {
      firstName: String(firstName).slice(0, 100),
      lastName: String(lastName).slice(0, 100),
      email: email ? String(email).slice(0, 200) : 'Not provided',
      phone: String(phone).slice(0, 40),
      zip: zip ? String(zip).slice(0, 20) : 'Not provided',
      program: program ? String(program).slice(0, 100) : 'Not specified',
      startTimeframe: startTimeframe ? String(startTimeframe).slice(0, 100) : 'Not specified',
      source: source ? String(source).slice(0, 100) : 'Website',
      receivedAt: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
    };

    // Email the lead to admissions (best effort — never block the lead on email failure)
    let emailSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        // 1) Notify admissions
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'admissions@btieducation.com',
          subject: `🔥 NEW LEAD: ${lead.firstName} ${lead.lastName} — ${lead.program}`,
          html: `
            <div style="font-family: Arial, sans-serif; font-size: 16px; color: #111;">
              <h2 style="color:#1d4ed8;">New Request Info Lead</h2>
              <table style="border-collapse: collapse; font-size: 16px;">
                <tr><td style="padding:6px 12px; font-weight:bold;">Name</td><td style="padding:6px 12px;">${lead.firstName} ${lead.lastName}</td></tr>
                <tr><td style="padding:6px 12px; font-weight:bold;">Phone</td><td style="padding:6px 12px;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
                <tr><td style="padding:6px 12px; font-weight:bold;">Email</td><td style="padding:6px 12px;">${lead.email}</td></tr>
                <tr><td style="padding:6px 12px; font-weight:bold;">ZIP</td><td style="padding:6px 12px;">${lead.zip}</td></tr>
                <tr><td style="padding:6px 12px; font-weight:bold;">Program</td><td style="padding:6px 12px;">${lead.program}</td></tr>
                <tr><td style="padding:6px 12px; font-weight:bold;">Wants to start</td><td style="padding:6px 12px;">${lead.startTimeframe}</td></tr>
                <tr><td style="padding:6px 12px; font-weight:bold;">Source</td><td style="padding:6px 12px;">${lead.source}</td></tr>
                <tr><td style="padding:6px 12px; font-weight:bold;">Received</td><td style="padding:6px 12px;">${lead.receivedAt} (Central)</td></tr>
              </table>
              <p style="margin-top:16px;"><strong>Speed to lead wins:</strong> call or text within 5 minutes if possible!</p>
            </div>
          `,
        });
        emailSent = true;

        // 2) Auto-reply to the lead (if they gave an email)
        if (email && String(email).includes('@')) {
          try {
            await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: email,
              subject: 'Your CNA info from Breakthrough Training Institute 💙',
              html: `
                <div style="font-family: Arial, sans-serif; font-size: 17px; color: #111; line-height: 1.6;">
                  <h2 style="color:#1d4ed8;">You're one step closer, ${lead.firstName}!</h2>
                  <p>Thanks for requesting info about our CNA training. Here's the quick rundown:</p>
                  <ul>
                    <li><strong>Self-Paced Program — $475:</strong> online classroom on your schedule + in-person clinicals</li>
                    <li><strong>Hybrid Program — $1,175:</strong> next class starts <strong>July 28</strong> (only 25 seats), first 2 days in person, rest online + clinicals</li>
                    <li><strong>Job Guarantee:</strong> every graduate gets a job offer — pass the state exam and start as a CNA, or start as a home health aide while you prepare</li>
                    <li><strong>Ways to pay:</strong> payment plans, the Warren Collins Jr. Scholarship, and programs like SkillUP &amp; WIOA that may cover 100% of tuition — see <a href="https://www.btieducation.com/how-to-pay">How to Pay</a></li>
                  </ul>
                  <p>A member of our admissions team will call you shortly. Want to skip the wait?</p>
                  <p style="font-size:18px;"><strong>📞 Call us: 636-242-5722</strong><br/>
                  🌐 Enroll now: <a href="https://www.btieducation.com/enroll">btieducation.com/enroll</a></p>
                  <p>We can't wait to meet you — everyone deserves a breakthrough!</p>
                  <p><strong>Breakthrough Training Institute</strong><br/>
                  11862 Lackland Rd, Suite BTI, Maryland Heights, MO 63146<br/>
                  Missouri Certificate #78357-00</p>
                </div>
              `,
            });
          } catch (autoReplyErr) {
            console.error('[lead] Auto-reply email error:', autoReplyErr.message);
          }
        }
      } catch (emailErr) {
        console.error('[lead] Admissions email error:', emailErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      emailSent,
      message: 'Lead received',
    });
  } catch (error) {
    console.error('[lead] Error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please call us at 636-242-5722.' });
  }
}

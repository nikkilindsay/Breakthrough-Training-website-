import React from 'react'
import { Link } from 'react-router-dom'

const Quote = ({ children, src }) => (
  <div className="border-l-4 border-teal-600 bg-gray-50 px-4 py-3 my-3">
    <p className="text-gray-800 text-sm">{children}</p>
    <p className="text-gray-500 text-xs mt-1">BTI Course Catalog v5 &mdash; {src}</p>
  </div>
)

const RefundPolicy = () => (
  <div className="min-h-screen bg-white">
    <section className="bg-gradient-to-r from-teal-700 to-blue-800 text-white py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="uppercase tracking-widest text-sm text-teal-200 mb-3">Course Catalog v5 &middot; Missouri 6 CSR 10-5.010(6)(E),(F)</p>
        <h1 className="text-4xl font-bold mb-3">Cancellation, Withdrawal &amp; Refund Policy</h1>
        <p className="text-teal-50">
          Every rule below is quoted from the BTI Course Catalog, Version 5, and restated in the CNA Enrollment Agreement.
        </p>
      </div>
    </section>

    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your three-business-day right to cancel</h2>
        <Quote src="Cancellation, Dismissal, Withdrawal">
          Students have at least three (3) business days, excluding Saturdays, Sundays, and state holidays, after both parties sign the Enrollment Agreement to cancel and receive a full refund of all monies paid, regardless of when instruction begins.
        </Quote>
        <Quote src="Fees & Timing">
          To comply with Missouri&rsquo;s required three-business-day cancellation period, BTI observes a 3-day waiting period before initiating any services or expenses that become non-refundable once performed. This waiting period protects prospective students by giving them time to review the Enrollment Agreement and change their mind without penalty, as required under state law.
        </Quote>
        <p className="text-gray-700">
          Your <strong>down payment is fully refundable during that window</strong> and then applies to tuition &mdash; it is
          not an extra fee. Application processing and background checks are performed only after the window expires,
          except for waitlist admissions processed promptly for immediate seat availability; even then, all fees remain
          fully refundable during the three business days.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Refunds after instruction begins</h2>
        <p className="text-gray-700 mb-4">
          Refunds are calculated on clock hours attempted divided by total program hours, using your Last Date of
          Attendance. Refunds are provided through at least one-half (1/2) of the enrollment period:
        </p>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-sm font-bold text-gray-700">Portion of program completed</th>
                <th className="px-5 py-3 text-sm font-bold text-gray-700">Refund</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200"><td className="px-5 py-3 text-gray-700">0% &ndash; 10%</td><td className="px-5 py-3 font-semibold text-teal-700">90% refund</td></tr>
              <tr className="border-t border-gray-200"><td className="px-5 py-3 text-gray-700">More than 10% &ndash; 25%</td><td className="px-5 py-3 font-semibold text-teal-700">75% refund</td></tr>
              <tr className="border-t border-gray-200"><td className="px-5 py-3 text-gray-700">More than 25% &ndash; 50%</td><td className="px-5 py-3 font-semibold text-teal-700">50% refund</td></tr>
              <tr className="border-t border-gray-200"><td className="px-5 py-3 text-gray-700">More than 50%</td><td className="px-5 py-3 font-semibold text-teal-700">0% refund</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 mt-4">
          A clock hour is 50 minutes of supervised instruction. The formula applies to any student who completes a full
          withdrawal or is dismissed for academic or conduct violations. Approved refunds are issued within 30 days of
          BTI&rsquo;s receipt of the written request.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">What is not refundable</h2>
        <p className="text-gray-700">
          After the three-business-day period, and only once incurred or issued: application processing, background
          check once ordered, uniforms/badges once issued, and books/workbooks once opened or issued. These items are
          disclosed before purchase.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Dismissal</h2>
        <p className="text-gray-700">
          Progressive discipline runs: verbal warning, written warning, probation, dismissal &mdash; with immediate
          dismissal for safety violations, falsification, or misconduct. A dismissed student is refunded under the same
          clock-hour formula above.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Failure to pay</h2>
        <p className="text-gray-700">
          BTI may place financial holds &mdash; no lab access, no OJT assignment, no exam scheduling &mdash; until the
          account is current.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">How to request a refund</h2>
        <p className="text-gray-700 mb-3">
          Submit a written request to the Program Director by email or mail. It must include:
        </p>
        <ul className="space-y-1 text-gray-700 mb-4">
          <li>&bull; Full legal name</li>
          <li>&bull; Date of birth</li>
          <li>&bull; Current mailing address</li>
          <li>&bull; Program enrolled in</li>
          <li>&bull; Last Date of Attendance (if applicable)</li>
          <li>&bull; Reason for the refund request</li>
        </ul>
        <div className="bg-gray-50 rounded-xl p-5 text-gray-800 text-sm leading-relaxed">
          <div className="font-bold mb-1">Breakthrough Training Institute</div>
          11862 Lackland Rd., Suite BTI, St. Louis, MO 63146<br />
          Phone: 636-242-5722 &middot; Email: <a className="text-teal-700 underline" href="mailto:btiadmissionoffice@gmail.com">btiadmissionoffice@gmail.com</a><br />
          Office hours: Monday&ndash;Friday, 8:00 AM&ndash;4:30 PM; after-hours voicemail monitored.
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">If you disagree with a decision</h2>
        <Quote src="Grievance Procedures">
          Submit written grievance to the BTI Administrator at btiadmissionoffice@gmail.com or mail to BTI within 10 business days of the incident. The Program Director will respond within 10 business days; appeal to the School Administrator if needed by calling 636-242-5722.
        </Quote>
        <p className="text-gray-700">
          If unresolved, students may contact the Missouri Department of Higher Education &amp; Workforce Development
          (MDHEWD), P.O. Box 1469, Jefferson City, MO 65102-1469; Phone: (573) 751-2361; CBHE Board Line: (573) 751-1876.
        </p>
      </section>

      <div className="bg-teal-50 border-l-4 border-teal-600 p-5 rounded">
        <p className="text-sm text-gray-800">
          Deposit and payment-plan terms are on the{' '}
          <Link to="/how-to-pay" className="underline font-semibold">How to Pay</Link> page and restate the same catalog.
        </p>
      </div>
    </div>
  </div>
)

export default RefundPolicy

import React from 'react'
import { Link } from 'react-router-dom'

const Scholarship = () => {
  const criteria = [
    'Nominated by a church, faith-based ministry, or church-affiliated outreach',
    'Committed to working as a CNA in the St. Louis region after certification',
    'Demonstrated financial need — no income paperwork required from the candidate',
    '18 or older with one valid ID (passport, driver\'s license, state ID, or birth certificate)',
    'Able to complete 75 hours of theory and the clinical requirement',
  ]

  const steps = [
    {
      n: '1',
      t: 'A church recommends',
      d: 'Any pastor, ministry leader, or church outreach coordinator can recommend a member of their congregation. One short email is all it takes — no application portal, no essays from the candidate.',
    },
    {
      n: '2',
      t: 'We confirm eligibility',
      d: 'Within five business days we contact the nominee to confirm program fit and which track they need — self-paced, hybrid, or clinical-only — and answer their questions.',
    },
    {
      n: '3',
      t: 'Selection committee reviews',
      d: 'Nominations are reviewed in the order received by the BTI selection committee. We weigh need, commitment to care work, and the recommender\'s statement.',
    },
    {
      n: '4',
      t: 'Three awarded each year',
      d: 'BTI awards three scholarships every calendar year. Nominations roll forward — a nominee not selected this round stays in the pool for the next one unless the church withdraws them.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-teal-700 to-blue-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase tracking-widest text-sm text-teal-200 mb-3">Warren Collins Jr. Scholarship</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Three CNA scholarships a year, nominated by churches</h1>
          <p className="text-lg text-teal-50 max-w-3xl">
            Instead of asking students to compete for an application, we ask the people who already know them.
            Churches recommend; Breakthrough Training Institute trains. Three full scholarships are awarded every year,
            and nominations are accepted on a rolling basis with no deadline.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="/images/warren-collins-jr-scholarship.webp"
              alt="Warren Collins Jr. Scholarship"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Who Warren Collins Jr. was</h2>
            <p className="text-gray-700 mb-4">
              The scholarship carries the name of Warren Collins Jr., whose family believed that a healthcare career should
              never be decided by a bank balance. It is awarded in his memory to people who are ready to work and only need
              the training paid for.
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-600 p-4 rounded">
              <p className="text-sm text-gray-800">
                <strong>Award value:</strong> full tuition for the self-paced CNA theory program ($475).
                A recipient who needs the hybrid or clinical-only track has the award applied to that tuition instead.
                The state exam fee is paid separately to the testing center and is not part of the award.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">How a nomination works</h2>
          <p className="text-gray-600 mb-8">Four steps, no deadline, no application fee.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-9 w-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center">{s.n}</span>
                  <h3 className="font-bold text-gray-900">{s.t}</h3>
                </div>
                <p className="text-gray-700 text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Who can be nominated</h2>
        <ul className="space-y-3">
          {criteria.map((c) => (
            <li key={c} className="flex items-start gap-3">
              <span className="text-teal-600 font-bold mt-0.5">&#10003;</span>
              <span className="text-gray-700">{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-teal-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Recommend someone from your congregation</h2>
          <p className="text-teal-50 mb-3 max-w-2xl mx-auto">
            Send the nominee's name, phone number, and two or three sentences on why you are recommending them.
            That is the entire nomination.
          </p>
          <p className="text-teal-100 text-sm mb-8">
            Email <a className="underline font-semibold" href="mailto:admissions@btieducation.com?subject=Scholarship%20Nomination">admissions@btieducation.com</a> with the subject line
            &ldquo;Scholarship Nomination&rdquo; &mdash; or call 636-242-5722.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:admissions@btieducation.com?subject=Scholarship%20Nomination"
              className="bg-white text-teal-800 font-bold px-7 py-3 rounded-lg hover:bg-teal-50"
            >
              Nominate a Student
            </a>
            <Link to="/programs" className="border-2 border-white text-white font-bold px-7 py-3 rounded-lg hover:bg-white hover:text-teal-800">
              See the Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-2">What a nomination is not</h3>
          <p className="text-gray-700 text-sm">
            A nomination is not a promise of an award, and it is not an endorsement by Breakthrough Training Institute of the
            nominating church. Recipients are chosen by our selection committee. Nominations may be submitted at any time
            during the year; there is no deadline and no limit on how many people a single church may recommend.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Scholarship

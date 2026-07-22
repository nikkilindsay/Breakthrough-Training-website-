import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: 'Enrollment & Getting Started',
    questions: [
      {
        q: 'How do I enroll in a CNA program?',
        a: 'You can enroll directly on our website by visiting the Enroll page. Select your program, complete the registration form, and submit your payment. You\'ll receive a confirmation email within 24-48 hours with your next steps and login credentials for the student app.'
      },
      {
        q: 'What are the requirements to enroll?',
        a: 'You must be at least 18 years old (or 16 with parental consent), have a valid government-issued ID, and be able to pass a background check. No prior healthcare experience is required — we teach you everything you need to know!'
      },
      {
        q: 'Do I need any prior experience or certifications?',
        a: 'No! Our programs are designed for beginners. Whether you\'re starting fresh or changing careers, we\'ll prepare you from the ground up for your CNA certification.'
      },
      {
        q: 'When does the next class start?',
        a: 'Our Self-Paced CNA program allows you to start immediately after enrollment. The Hybrid Program runs in cohorts starting every 4th Tuesday — the next class starts July 28, 2026. Check our Class Schedule page for upcoming dates.'
      },
      {
        q: 'Can I enroll if I live outside of St. Louis?',
        a: 'Yes! Our Self-Paced CNA program is 100% online for the theory portion, so you can complete it from anywhere in Missouri. However, clinical hours must be completed in person at a local facility. The Hybrid Program requires in-person attendance in St. Louis.'
      }
    ]
  },
  {
    category: 'Programs & Curriculum',
    questions: [
      {
        q: 'What is the difference between the Self-Paced and Hybrid programs?',
        a: 'The Self-Paced CNA program ($475) is 100% online theory that you complete at your own pace within 4 months. The Hybrid Program ($1,175) is a 5-week intensive that starts with 2 days of in-person classroom instruction to kick off your cohort, then the remainder of your theory classes are completed online, followed by supervised clinical practice. Both prepare you for the state certification exam.'
      },
      {
        q: 'What is the Clinical Experience Only program?',
        a: 'The Clinical Experience Only program ($915) is for students who have already completed their CNA classroom/theory training elsewhere but still need to fulfill their supervised clinical hours and prepare for the state test. The CNA certificate is issued only after successfully completing clinicals AND passing the state test.'
      },
      {
        q: 'How long does it take to become a CNA?',
        a: 'With our Hybrid Program, you can be certified in as little as 5 weeks. With the Self-Paced program, you can complete the theory at the pace of a snail or the pace of lightning — the choice is yours! Most students finish within 2-3 months. Clinical hours are completed separately.'
      },
      {
        q: 'Is the program approved by the state of Missouri?',
        a: 'Yes! Breakthrough Training Institute LLC holds a Certificate to Operate from the Missouri Coordinating Board for Higher Education (Certificate #78357-00), and our curriculum meets all Missouri Department of Health and Senior Services requirements for CNA certification.'
      },
      {
        q: 'What does the curriculum cover?',
        a: 'Our comprehensive curriculum covers patient care fundamentals, vital signs, infection control, body mechanics, nutrition, mental health, communication skills, patient rights, and all 22+ clinical skills required for the Missouri state exam.'
      },
      {
        q: 'Do you provide study materials?',
        a: 'Yes! All study materials are included in your tuition — textbook access, video tutorials, interactive study guides, practice quizzes, and state test preparation materials. Everything is accessible through our student app.'
      }
    ]
  },
  {
    category: 'Clinicals & State Exam',
    questions: [
      {
        q: 'Where do I complete my clinical hours?',
        a: 'Clinical hours are completed at local St. Louis healthcare facilities. We help connect you with approved clinical sites. For the Hybrid Program, clinical placements are arranged as part of the program. For Self-Paced students, clinicals are completed separately.'
      },
      {
        q: 'How many clinical hours are required?',
        a: 'Missouri requires a minimum of 100 hours of supervised clinical practice. Our programs include 100+ hours to ensure you\'re fully prepared for real-world patient care.'
      },
      {
        q: 'What is the state certification exam like?',
        a: 'The Missouri CNA state exam has two parts: a written/oral knowledge test and a skills demonstration test. You\'ll need to pass both to receive your certification. Our program includes comprehensive test prep for both portions.'
      },
      {
        q: 'What if I fail the state exam?',
        a: 'Don\'t worry — you can retake the exam (Missouri allows up to three attempts), and we provide additional study support and test prep to help you pass the next time. Even better: under the Breakthrough Job Guarantee, completing your BTI training earns you a job offer from Breakthrough Healthcare as a Home Health Aide even before you\'re certified — so you can start earning while you prepare to retest. When you pass, you move up to the CNA pay tier.'
      }
    ]
  },
  {
    category: 'Payment & Financial Aid',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept credit/debit cards (Visa, Mastercard, Amex, Discover), cash (in person by appointment), Venmo, and Zelle. Visit our How to Pay page for full details.'
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes! We partner with Klarna, Affirm, and Afterpay so you can split your tuition into manageable payments. Klarna and Afterpay offer 4 interest-free payments, while Affirm offers flexible monthly plans from 3-12 months.'
      },
      {
        q: 'Are there any scholarships available?',
        a: 'Yes! We offer the Warren Collins Jr. Scholarship, which covers full tuition for the Self-Paced CNA program ($475 value). Two scholarships are awarded per year. Visit our How to Pay page for eligibility requirements and application details.'
      },
      {
        q: 'Is there a refund policy?',
        a: 'Please contact our admissions office at admissions@btieducation.com to discuss our refund policy. Refund eligibility depends on how far you\'ve progressed in the program.'
      },
      {
        q: 'Do you accept financial aid or grants?',
        a: 'Yes — there are several ways your training could be paid for or even paid back! If you\'re hired by a Medicaid/Medicare-certified nursing facility within 12 months of certification, federal law (OBRA \'87) requires them to reimburse your training costs. St. Louis City residents may qualify for up to $10,000 through SLATE, SNAP recipients can use SkillUP, income-qualified adults 25+ may qualify for the Missouri Fast Track grant, military spouses can use MyCAA (up to $4,000), and WIOA funds are available through Missouri Job Centers. Visit our How to Pay page for the full list — we\'ll help you figure out which ones fit you.'
      }
    ]
  },
  {
    category: 'Student App & Technology',
    questions: [
      {
        q: 'What is the Breakthrough Training app?',
        a: 'Our mobile app is your complete learning companion. It includes all course materials, video lessons, quizzes, progress tracking, and direct communication with instructors. Available on Android (iOS coming soon).'
      },
      {
        q: 'Do I need a computer to take classes?',
        a: 'For the Self-Paced program, you can complete everything on your phone or tablet using our app. However, we recommend having access to a computer for the best learning experience, especially for watching video tutorials and completing assessments. If you need a computer, you can use one in our classroom by scheduling through the office — just email us at admissions@btieducation.com to reserve a time.'
      },
      {
        q: 'How do I access my course materials?',
        a: 'After enrollment confirmation (within 24-48 hours), you\'ll receive login credentials for the Breakthrough Training app. All your course materials, videos, quizzes, and progress tracking are available there.'
      }
    ]
  },
  {
    category: 'Career & After Certification',
    questions: [
      {
        q: 'What can I do with a CNA certification?',
        a: 'CNAs work in hospitals, nursing homes, assisted living facilities, home health agencies, rehabilitation centers, and more. It\'s also a stepping stone to becoming an LPN, RN, or other advanced healthcare roles.'
      },
      {
        q: 'How much do CNAs make in St. Louis?',
        a: 'CNA salaries in the St. Louis area typically range from $17-$35 per hour depending on experience, facility type, and shift. Many facilities offer sign-on bonuses, shift differentials, and benefits.'
      },
      {
        q: 'Do you help with job placement?',
        a: 'We do better than help — we guarantee it. Through the Breakthrough Job Guarantee, every student who completes BTI training receives a job offer from our family of care companies: Breakthrough Healthcare LLC (voted "Best Home Caregiver" by St. Louis American readers) and Daybreak Adult Day Care. Pass your state exam and you\'re hired at the CNA pay tier; still working toward your exam and you\'re hired as a Home Health Aide while you study. We also have affiliate partners and healthcare facilities where graduates can apply directly. (Job offers are contingent on the standard background screening Missouri requires for healthcare workers.)'
      },
      {
        q: 'Can I work while taking classes?',
        a: 'Absolutely! Our Self-Paced program is designed for working adults — study on your schedule. The Hybrid Program starts with just 2 in-person days, then moves online, making it possible to maintain employment during training.'
      }
    ]
  }
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-900 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp size={20} className="text-orange-500 flex-shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-700 leading-relaxed pt-3">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={36} className="text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to know about our CNA programs, enrollment, and certification process.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        {faqs.map((category, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </span>
              {category.category}
            </h2>
            <div className="space-y-3">
              {category.questions.map((item, qIdx) => (
                <FAQItem key={qIdx} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 text-lg mb-8">
            We're here to help! Reach out to our admissions team and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:admissions@btieducation.com" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
              Email Us
            </a>
            <a href="tel:6362425722" className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full transition-colors">
              Call 636-242-5722
            </a>
            <Link to="/contact" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full transition-colors">
              Contact Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

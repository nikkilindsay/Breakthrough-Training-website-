import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-4 text-blue-100 text-lg">Breakthrough Training Institute</p>
          <p className="mt-2 text-blue-200 text-sm">Last Updated: June 21, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none text-gray-800">

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Introduction</h2>
            <p className="text-lg leading-relaxed">
              Breakthrough Training Institute ("BTI," "we," "us," or "our") is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website at <strong>www.btieducation.com</strong>, use our mobile application, or engage with our services.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              By accessing or using our website or mobile app, you agree to the terms of this Privacy Policy. If you do not agree with the practices described herein, please do not use our services.
            </p>
          </section>

          {/* What Data We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">What Data We Collect</h2>
            <p className="text-lg leading-relaxed mb-4">
              We collect information that you provide directly to us, as well as information collected automatically when you use our services. This includes:
            </p>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Personal Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li><strong>Name</strong> — First and last name provided during registration or enrollment</li>
                <li><strong>Email Address</strong> — Used for account creation, communications, and course updates</li>
                <li><strong>Phone Number</strong> — For enrollment verification, reminders, and support communications</li>
                <li><strong>Payment Information</strong> — Credit/debit card details and billing address processed securely through our payment provider</li>
                <li><strong>Course Progress</strong> — Enrollment status, course completion data, quiz scores, certificates earned, and attendance records</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Device type, operating system, and browser information</li>
                <li>IP address and general location data</li>
                <li>App usage data and interaction patterns</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">How We Use Your Data</h2>
            <p className="text-lg leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>To process your enrollment and manage your student account</li>
              <li>To process payments for courses and programs</li>
              <li>To track and display your course progress, grades, and certifications</li>
              <li>To communicate with you about your courses, schedules, and important updates</li>
              <li>To send administrative information such as receipts, confirmations, and policy changes</li>
              <li>To provide customer support and respond to your inquiries</li>
              <li>To improve our website, mobile app, and educational services</li>
              <li>To comply with legal obligations and regulatory requirements</li>
              <li>To protect against fraudulent or unauthorized activity</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Third-Party Services</h2>
            <p className="text-lg leading-relaxed mb-4">
              We use trusted third-party service providers to help us operate our business. These providers have access to your personal information only to perform specific tasks on our behalf and are obligated to protect your data.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Stripe (Payment Processing)</h3>
              <p className="text-lg leading-relaxed">
                We use <strong>Stripe</strong> to process all payment transactions. When you make a payment, your credit/debit card information is transmitted directly to Stripe's secure servers. We do not store your full card number on our systems. Stripe's privacy policy and security practices can be found at{' '}
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">stripe.com/privacy</a>.
              </p>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              We may also use third-party services for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg mt-2">
              <li>Website hosting and content delivery</li>
              <li>Email communications and notifications</li>
              <li>Analytics to improve our services</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Data Security</h2>
            <p className="text-lg leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg mt-4">
              <li>SSL/TLS encryption for all data transmitted between your device and our servers</li>
              <li>Secure payment processing through PCI-DSS compliant providers (Stripe)</li>
              <li>Regular security assessments and updates to our systems</li>
              <li>Access controls limiting employee access to personal data on a need-to-know basis</li>
              <li>Secure data storage with regular backups</li>
            </ul>
            <p className="text-lg leading-relaxed mt-4">
              While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining industry-standard protections.
            </p>
          </section>

          {/* User Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Your Rights</h2>
            <p className="text-lg leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li><strong>Access</strong> — You may request a copy of the personal data we hold about you</li>
              <li><strong>Correction</strong> — You may request that we correct inaccurate or incomplete information</li>
              <li><strong>Deletion</strong> — You may request that we delete your personal data, subject to legal retention requirements</li>
              <li><strong>Opt-Out</strong> — You may opt out of marketing communications at any time by contacting us or using the unsubscribe link in our emails</li>
              <li><strong>Data Portability</strong> — You may request your data in a commonly used, machine-readable format</li>
              <li><strong>Withdraw Consent</strong> — Where processing is based on consent, you may withdraw it at any time</li>
            </ul>
            <p className="text-lg leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the information provided below. We will respond to your request within 30 days.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Data Retention</h2>
            <p className="text-lg leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Course progress and certification records may be retained indefinitely to support credential verification. Payment records are retained as required by applicable tax and financial regulations.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Children's Privacy</h2>
            <p className="text-lg leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child without parental consent, we will take steps to delete that information promptly.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-lg leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the revised policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
            <p className="text-lg leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-lg font-semibold text-blue-900">Breakthrough Training Institute</p>
              <ul className="mt-3 space-y-2 text-lg list-none">
                <li>Email: <a href="mailto:btiadmissionoffice@gmail.com" className="text-blue-600 underline">btiadmissionoffice@gmail.com</a></li>
                <li>Phone: <a href="tel:6362425722" className="text-blue-600 underline">636-242-5722</a></li>
                <li>Address: 11862 Lackland Rd, Suite BTI, St. Louis, MO 63146</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

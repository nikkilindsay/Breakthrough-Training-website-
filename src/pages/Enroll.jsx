import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { programs } from '../data/schoolData';
import { ArrowRight, CheckCircle, Phone, Mail, AlertCircle, Upload } from 'lucide-react';

export default function Enroll() {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState('cna');
  const [step, setStep] = useState(1); // 1 = program + personal, 2 = document + agreement
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: 'MO',
    zip: '',
    experience: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    agreeToContact: true,
    agreeToTerms: false,
  });
  const [idDocument, setIdDocument] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifyWarning, setNotifyWarning] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0]);
      if (errors.idDocument) setErrors(prev => ({ ...prev, idDocument: null }));
    }
  };

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
  };

  const handleEmergencyPhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, emergencyContactPhone: formatted }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!formData.experience) newErrors.experience = 'Please select your experience level';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!idDocument) newErrors.idDocument = 'Please upload one identifying document (passport, ID card, birth certificate, or student visa)';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the enrollment terms';
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  // Emails the enrollment details (with the ID document attached when possible)
  // to the admissions inbox so the school is notified before payment.
  const notifyAdmissions = async () => {
    const program = programs.find(p => p.id === selectedProgram);
    try {
      const payload = new FormData();
      payload.append('_subject', `New Enrollment: ${formData.firstName} ${formData.lastName} — ${program ? program.name : selectedProgram}`);
      payload.append('_template', 'table');
      payload.append('_captcha', 'false');
      payload.append('program', program ? `${program.name} ($${program.price})` : selectedProgram);
      payload.append('firstName', formData.firstName);
      payload.append('lastName', formData.lastName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('dateOfBirth', formData.dateOfBirth);
      payload.append('address', `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`);
      payload.append('healthcareExperience', formData.experience);
      payload.append('emergencyContact', `${formData.emergencyContactName} — ${formData.emergencyContactPhone}`);
      payload.append('idDocumentAttached', idDocument ? `Yes — ${idDocument.name}` : 'No — student will text/email it');
      payload.append('submittedAt', new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
      if (idDocument) payload.append('attachment', idDocument);

      const resp = await fetch('https://formsubmit.co/ajax/admissions@btieducation.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: payload,
      });
      return resp.ok;
    } catch (err) {
      console.error('Admissions notification failed:', err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    const notified = await notifyAdmissions();
    if (!notified) setNotifyWarning(true);

    setSubmitted(true);
    setLoading(false);
    window.scrollTo(0, 0);

    // Redirect to checkout (Stripe payment link) after a short pause
    setTimeout(() => {
      navigate(`/checkout/${selectedProgram}`, { state: { formData } });
    }, 2500);
  };

  const selectedProgramData = programs.find(p => p.id === selectedProgram);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            We've received your enrollment information. Redirecting to secure payment...
          </p>
          <div className="animate-spin inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Your CNA Journey Today</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Be part of our founding class. Quick enrollment, flexible learning, affordable pricing.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-4 bg-white border-b">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <span className="font-medium hidden sm:inline">Personal Info</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200">
              <div className={`h-full transition-all ${step >= 2 ? 'bg-blue-600 w-full' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <span className="font-medium hidden sm:inline">Document</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-gray-200 text-gray-500">3</div>
              <span className="font-medium hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="card">
                {step === 1 && (
                  <form onSubmit={handleNext} className="space-y-8">
                    <h2 className="text-3xl font-bold text-dark">Enrollment Form</h2>
                    <p className="text-gray-600">Please fill out all required fields. Your information is kept secure and confidential.</p>

                    {/* Program Selection */}
                    <div>
                      <h3 className="font-bold text-lg text-dark mb-4">Select Your Program</h3>
                      <div className="space-y-3">
                        {programs.map(program => (
                          <label key={program.id} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary" style={{borderColor: selectedProgram === program.id ? '#0066cc' : '#e5e7eb'}}>
                            <input
                              type="radio"
                              name="program"
                              value={program.id}
                              checked={selectedProgram === program.id}
                              onChange={(e) => setSelectedProgram(e.target.value)}
                              className="w-4 h-4 text-primary"
                            />
                            <div className="ml-4 flex-1">
                              <p className="font-semibold text-dark">{program.name}</p>
                              <p className="text-sm text-gray-600">{program.duration} • ${program.price}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div>
                      <h3 className="font-bold text-lg text-dark mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First name"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last name"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-dark mb-2">Date of Birth *</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="font-bold text-lg text-dark mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="(555) 123-4567"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <h3 className="font-bold text-lg text-dark mb-4">Mailing Address</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">Street Address *</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="123 Main St, Apt 4"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-dark mb-2">City *</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="St. Louis"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-dark mb-2">State</label>
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              <option value="MO">MO</option>
                              <option value="IL">IL</option>
                              <option value="KS">KS</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-dark mb-2">ZIP *</label>
                            <input
                              type="text"
                              name="zip"
                              value={formData.zip}
                              onChange={handleInputChange}
                              placeholder="63146"
                              maxLength={10}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="font-bold text-lg text-dark mb-4">Healthcare Experience *</h3>
                      <div className="space-y-3">
                        {[
                          { value: 'none', label: 'No healthcare experience' },
                          { value: 'some', label: 'Some healthcare experience (less than 1 year)' },
                          { value: 'experienced', label: 'Experienced (1+ years)' }
                        ].map(option => (
                          <label key={option.value} className="flex items-center">
                            <input
                              type="radio"
                              name="experience"
                              value={option.value}
                              checked={formData.experience === option.value}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-primary"
                            />
                            <span className="ml-3 text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg"
                    >
                      Continue to Document &amp; Agreement
                      <ArrowRight size={20} />
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                      <button
                        type="button"
                        onClick={() => { setStep(1); window.scrollTo(0, 0); }}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                      >
                        ← Back to Personal Info
                      </button>
                    </div>
                    <h2 className="text-3xl font-bold text-dark">Identification &amp; Agreement</h2>

                    {/* One identifying document — works for everyone including visa students */}
                    <div>
                      <p className="text-gray-600 mb-4">
                        Upload <strong>one</strong> identifying document. Any of these works:
                        <strong> passport, driver's license or state ID card, birth certificate, or student visa</strong>.
                        International students are welcome — a passport or student visa is all you need to get started.
                      </p>
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.idDocument ? 'border-red-400 bg-red-50' : idDocument ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400'}`}>
                        <Upload size={32} className={`mx-auto mb-3 ${idDocument ? 'text-green-600' : 'text-gray-400'}`} />
                        <h4 className="font-semibold text-dark mb-1">Identifying Document *</h4>
                        <p className="text-sm text-gray-500 mb-3">A clear photo or scan — passport, ID card, birth certificate, or student visa</p>
                        {idDocument ? (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle size={16} />
                            <span className="text-sm font-medium">{idDocument.name}</span>
                          </div>
                        ) : (
                          <label className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                            Choose File
                            <input
                              type="file"
                              name="idDocument"
                              accept="image/*,.pdf"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        )}
                        {errors.idDocument && <p className="text-red-500 text-xs mt-2">{errors.idDocument}</p>}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Trouble uploading? You can also text it to <strong>636-242-5722</strong> or email <strong>admissions@btieducation.com</strong> after checkout.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Note: when it's time to register for the state certification exam, Missouri may ask for a Social Security Number — our office will help you with that step when you get there.
                      </p>
                    </div>

                    {/* Emergency Contact */}
                    <div>
                      <h3 className="font-bold text-lg text-dark mb-4">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">Contact Name *</label>
                          <input
                            type="text"
                            name="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={handleInputChange}
                            placeholder="Full name"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.emergencyContactName ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.emergencyContactName && <p className="text-red-500 text-xs mt-1">{errors.emergencyContactName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">Contact Phone *</label>
                          <input
                            type="tel"
                            name="emergencyContactPhone"
                            value={formData.emergencyContactPhone}
                            onChange={handleEmergencyPhoneChange}
                            placeholder="(555) 123-4567"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.emergencyContactPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyContactPhone}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Agreement */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <input
                          type="checkbox"
                          id="agreeToContact"
                          name="agreeToContact"
                          checked={formData.agreeToContact}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 text-primary"
                        />
                        <label htmlFor="agreeToContact" className="text-sm text-gray-700">
                          I agree to be contacted by Breakthrough Training Institute about my enrollment and program updates.
                        </label>
                      </div>

                      <div className={`flex items-start gap-3 p-4 rounded-lg ${errors.agreeToTerms ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 text-primary"
                        />
                        <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                          <strong>I certify that all information provided is true and accurate.</strong> I understand that providing false information may result in dismissal from the program. I agree to the <a href="/terms" className="text-blue-600 underline">enrollment terms and conditions</a> and <a href="/privacy-policy" className="text-blue-600 underline">privacy policy</a>.
                        </label>
                      </div>
                      {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
                      <AlertCircle size={20} className="text-gray-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        Your information is used only for enrollment and state certification registration. We never share your information with third parties.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg"
                    >
                      {loading ? 'Processing...' : 'Continue to Secure Payment'}
                      <ArrowRight size={20} />
                    </button>

                    {notifyWarning && (
                      <p className="text-xs text-amber-600 text-center">
                        Note: we had trouble delivering your document automatically — after paying, please text it to 636-242-5722 so we can finish your file.
                      </p>
                    )}

                    <p className="text-xs text-gray-500 text-center">
                      After submitting, you will be redirected to our secure Stripe payment page.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Program Summary */}
              {selectedProgramData && (
                <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
                  <h3 className="font-bold text-lg text-dark mb-4">Program Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Program</p>
                      <p className="font-semibold text-dark">{selectedProgramData.name}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-dark">{selectedProgramData.duration}</p>
                    </div>
                    <div className="border-t pt-4 bg-white p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Total Price</p>
                      <p className="text-3xl font-bold text-primary">${selectedProgramData.price}</p>
                      <p className="text-xs text-gray-500 mt-1">State exam fee paid separately to the testing center</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Why Choose Us */}
              <div className="card">
                <h3 className="font-bold text-lg text-dark mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  {[
                    'Industry-recognized certification',
                    'Expert healthcare instructors',
                    'Flexible self-paced learning',
                    'Affordable pricing',
                    '95% pass rate',
                    'Guaranteed job offer at our sister company'
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="card bg-gradient-to-br from-primary to-secondary text-white">
                <h3 className="font-bold text-lg mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm opacity-90">Call us</p>
                      <p className="font-semibold">636-242-5722</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm opacity-90">Email us</p>
                      <p className="font-semibold">admissions@btieducation.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { q: 'How long does the CNA program take?', a: 'The self-paced course is 75 hours of theory you can complete on your schedule (up to 14 weeks). The hybrid program runs 5 weeks; the clinical-only track runs 3 weeks.' },
              { q: "What's the pass rate?", a: 'We have a 95% pass rate on the state certification exam. Our comprehensive training prepares you thoroughly.' },
              { q: 'Do you offer payment plans?', a: 'Yes — Klarna installment options appear automatically at checkout, and you can contact us about other arrangements.' },
              { q: 'Is the program online or in-person?', a: 'We offer self-paced online learning, a hybrid program with in-person lab and clinical hours, and a clinical-only track.' },
              { q: "What if I don't pass the exam?", a: 'We offer retake support and additional study materials at no extra cost.' },
              { q: 'Can I get a refund?', a: 'Per your enrollment agreement: a full refund is available within 3 business days of signing; after class begins, refunds follow the schedule in your agreement (50% if less than 25% of the program is completed).' },
              { q: 'What ID do I need to enroll?', a: 'Just one identifying document: a passport, driver\'s license or state ID card, birth certificate, or student visa. International students are welcome — a passport or student visa is all you need to get started.' },
              { q: 'Is the state exam fee included?', a: 'No — the state exam fee is paid directly to the testing center when you register for the exam.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-dark mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

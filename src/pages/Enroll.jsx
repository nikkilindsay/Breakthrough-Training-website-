import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { programs } from '../data/schoolData';
import { ArrowRight, CheckCircle, Phone, Mail, Upload, AlertCircle } from 'lucide-react';

export default function Enroll() {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState('cna');
  const [step, setStep] = useState(1); // 1 = program + personal, 2 = documents + agreement
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn: '',
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
  const [files, setFiles] = useState({
    driversLicense: null,
    socialSecurityCard: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList[0]) {
      setFiles(prev => ({
        ...prev,
        [name]: fileList[0]
      }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    }
  };

  const formatSSN = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  };

  const handleSSNChange = (e) => {
    const formatted = formatSSN(e.target.value);
    setFormData(prev => ({ ...prev, ssn: formatted }));
    if (errors.ssn) setErrors(prev => ({ ...prev, ssn: null }));
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
    if (!formData.ssn || formData.ssn.replace(/\D/g, '').length !== 9) newErrors.ssn = 'Valid SSN is required (XXX-XX-XXXX)';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!formData.experience) newErrors.experience = 'Please select your experience level';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!files.driversLicense) newErrors.driversLicense = 'Driver\'s license or State ID is required';
    if (!files.socialSecurityCard) newErrors.socialSecurityCard = 'Social Security card is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);

    try {
      // In production, this would send to your backend with file uploads
      console.log('Enrollment submitted:', { ...formData, program: selectedProgram, files });
      
      setSubmitted(true);
      
      // Redirect to checkout after 2 seconds
      setTimeout(() => {
        const program = programs.find(p => p.id === selectedProgram);
        if (program) {
          navigate(`/checkout/${selectedProgram}`, {
            state: { formData }
          });
        }
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedProgramData = programs.find(p => p.id === selectedProgram);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            We've received your enrollment information. Redirecting to payment...
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
            Join hundreds of successful students. Quick enrollment, flexible learning, affordable pricing.
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
              <span className="font-medium hidden sm:inline">Documents</span>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
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
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">Social Security Number *</label>
                          <input
                            type="text"
                            name="ssn"
                            value={formData.ssn}
                            onChange={handleSSNChange}
                            placeholder="XXX-XX-XXXX"
                            maxLength={11}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.ssn ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.ssn && <p className="text-red-500 text-xs mt-1">{errors.ssn}</p>}
                          <p className="text-xs text-gray-500 mt-1">Required for state certification registration</p>
                        </div>
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
                      Continue to Document Upload
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
                    <h2 className="text-3xl font-bold text-dark">Required Documents</h2>
                    <p className="text-gray-600">Please upload clear photos or scans of the following documents. These are required for state certification registration.</p>

                    {/* Document Uploads */}
                    <div className="space-y-6">
                      {/* Driver's License */}
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.driversLicense ? 'border-red-400 bg-red-50' : files.driversLicense ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400'}`}>
                        <Upload size={32} className={`mx-auto mb-3 ${files.driversLicense ? 'text-green-600' : 'text-gray-400'}`} />
                        <h4 className="font-semibold text-dark mb-1">Driver's License or State ID *</h4>
                        <p className="text-sm text-gray-500 mb-3">Upload a clear photo of the front of your ID</p>
                        {files.driversLicense ? (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle size={16} />
                            <span className="text-sm font-medium">{files.driversLicense.name}</span>
                          </div>
                        ) : (
                          <label className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                            Choose File
                            <input
                              type="file"
                              name="driversLicense"
                              accept="image/*,.pdf"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        )}
                        {errors.driversLicense && <p className="text-red-500 text-xs mt-2">{errors.driversLicense}</p>}
                      </div>

                      {/* Social Security Card */}
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.socialSecurityCard ? 'border-red-400 bg-red-50' : files.socialSecurityCard ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400'}`}>
                        <Upload size={32} className={`mx-auto mb-3 ${files.socialSecurityCard ? 'text-green-600' : 'text-gray-400'}`} />
                        <h4 className="font-semibold text-dark mb-1">Social Security Card *</h4>
                        <p className="text-sm text-gray-500 mb-3">Upload a clear photo of your Social Security card</p>
                        {files.socialSecurityCard ? (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle size={16} />
                            <span className="text-sm font-medium">{files.socialSecurityCard.name}</span>
                          </div>
                        ) : (
                          <label className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                            Choose File
                            <input
                              type="file"
                              name="socialSecurityCard"
                              accept="image/*,.pdf"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        )}
                        {errors.socialSecurityCard && <p className="text-red-500 text-xs mt-2">{errors.socialSecurityCard}</p>}
                      </div>
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
                        Your personal information including SSN and documents are encrypted and stored securely. We only use this information for state certification registration and program enrollment. We never share your information with third parties.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg"
                    >
                      {loading ? 'Processing...' : 'Continue to Payment'}
                      <ArrowRight size={20} />
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      After submitting, you will be redirected to our secure payment page.
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
                    'Job placement support'
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
                      <p className="font-semibold">314-649-5586</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm opacity-90">Email us</p>
                      <p className="font-semibold">btiadmissionoffice@gmail.com</p>
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
              { q: 'How long does the CNA program take?', a: 'Our self-paced CNA program can be completed in as little as 4 weeks or at your own pace up to 6 months.' },
              { q: "What's the pass rate?", a: 'We have a 95% pass rate on the state certification exam. Our comprehensive training prepares you thoroughly.' },
              { q: 'Do you offer payment plans?', a: 'Yes! We offer flexible payment options. Contact us for details on payment plans.' },
              { q: 'Is the program online or in-person?', a: 'We offer self-paced online learning with optional in-person clinical experience components.' },
              { q: "What if I don't pass the exam?", a: 'We offer retake support and additional study materials at no extra cost.' },
              { q: 'Can I get a refund?', a: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with the program." }
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

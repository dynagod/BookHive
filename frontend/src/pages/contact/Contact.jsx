import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Send, Check, AlertCircle, Loader, Copy, ExternalLink } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(null);
  const [formTouched, setFormTouched] = useState(false);

  // Reset copied text status
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Clear submit status after delay
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Validate form fields
  const validateForm = (data) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Invalid email format (e.g., user@domain.com)';
    }
    if (!data.message.trim()) newErrors.message = 'Message is required';
    else if (data.message.length > 500) newErrors.message = 'Message cannot exceed 500 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (!formTouched) setFormTouched(true);

    // Debounce validation
    clearTimeout(window.validateTimeout);
    window.validateTimeout = setTimeout(() => {
      setErrors(validateForm({ ...formData, [id]: value }));
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsSubmitting(true);
    setProgress(0);
    const interval = setInterval(() => setProgress((p) => Math.min(p + 10, 90)), 100);

    try {
      const emailData = {
        to_email: 'bookhivehelp@gmail.com',
        subject: `Contact Form: Message from ${formData.name}`,
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        emailData,
        'YOUR_PUBLIC_KEY'
      );

      clearInterval(interval);
      setProgress(100);
      setShowConfetti(true);
      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully to BookHive Help!',
      });
      setFormData({ name: '', email: '', message: '' });
      setFormTouched(false);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      clearInterval(interval);
      console.error('Error sending email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later or email us directly at bookhivehelp@gmail.com',
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
  };

  const faqs = [
    {
      q: 'How long does it take to get a response?',
      a: 'We typically respond within 24-48 hours during business days. For urgent matters, please call our support line.',
    },
    {
      q: 'Can I call instead of emailing?',
      a: 'Yes, our phone line is open 9 AM - 5 PM IST Monday through Friday. Feel free to call us for immediate assistance.',
    },
    {
      q: 'What information should I include in my message?',
      a: 'Please include your full name, order number (if applicable), and a detailed description of your question or concern so we can assist you more efficiently.',
    },
    {
      q: 'Do you offer support in languages other than English?',
      a: 'No, we currently offer support in English only. However, we are working on expanding our language support in the future.',
    },
  ];

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, label: 'Email', value: 'bookhivehelp@gmail.com' },
    { icon: <Phone className="h-5 w-5" />, label: 'Phone', value: '+1 (234) 567-8900' },
  ];

  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/bookhive' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/bookhive' },
    { name: 'Instagram', url: 'https://instagram.com/bookhive' },
    { name: 'Facebook', url: 'https://facebook.com/bookhive' },
  ];

  return (
    <div
      className="min-h-screen bg-amber-50 transition-colors duration-500 font-serif relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")',
      }}
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#FCD34D', '#F59E0B', '#FBBF24', '#F97316', '#C2410C'][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}

      {/* Progress Bar - Fixed at top */}
      {isSubmitting && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Header */}
      <div className="pt-16 pb-12 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-800 mb-6 animate-fade-in">
          Write to Us
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto animate-fade-in animation-delay-200">
          Your story matters. Reach out and let's turn the page together.
        </p>
        {submitStatus && (
          <div
            className={`mt-6 mx-auto max-w-md p-4 rounded-lg shadow-md flex items-center justify-center space-x-3 animate-bounce-in ${
              submitStatus.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
            role="alert"
          >
            {submitStatus.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p className="font-medium">{submitStatus.message}</p>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div
              className="p-8 rounded-2xl shadow-2xl bg-white/90 border border-amber-200 hover:shadow-amber-200/30 transition-all duration-500 animate-slide-in animation-delay-100"
            >
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b text-amber-800 border-amber-200">
                Send Your Message
              </h2>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`peer w-full p-4 border-b-2 ${
                      errors.name ? 'border-red-500' : 'border-amber-300'
                    } bg-transparent focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-gray-900 placeholder-transparent transition-all duration-300 rounded-t-md`}
                    placeholder="Name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-amber-500 ${
                      formData.name ? '-top-6 text-sm text-amber-500' : 'top-4 text-base text-gray-500'
                    }`}
                  >
                    Name
                  </label>
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.name}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`peer w-full p-4 border-b-2 ${
                      errors.email ? 'border-red-500' : 'border-amber-300'
                    } bg-transparent focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-gray-900 placeholder-transparent transition-all duration-300 rounded-t-md`}
                    placeholder="Email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-amber-500 ${
                      formData.email ? '-top-6 text-sm text-amber-500' : 'top-4 text-base text-gray-500'
                    }`}
                  >
                    Email
                  </label>
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.email}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`peer w-full p-4 border-b-2 ${
                      errors.message ? 'border-red-500' : 'border-amber-300'
                    } bg-transparent focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-gray-900 placeholder-transparent resize-none transition-all duration-300 rounded-t-md`}
                    placeholder="Message"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    disabled={isSubmitting}
                  ></textarea>
                  <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-amber-500 ${
                      formData.message ? '-top-6 text-sm text-amber-500' : 'top-4 text-base text-gray-500'
                    }`}
                  >
                    Message
                  </label>
                  <div className="flex justify-between mt-2">
                    <p
                      className={`text-sm ${
                        formData.message.length > 450 ? 'text-amber-600' : 'text-gray-600'
                      }`}
                    >
                      {formData.message.length}/500 characters
                    </p>
                    {errors.message && (
                      <p id="message-error" className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full p-4 rounded-md ${
                    isSubmitting
                      ? 'bg-amber-300 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-600'
                  } text-white font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-500/30 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Sending to BookHive...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                <p className="text-sm text-center text-gray-500 mt-4">
                  Your message will be sent directly to{' '}
                  <span className="font-medium text-amber-600">bookhivehelp@gmail.com</span>
                </p>
              </form>
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div>
            <div
              className="p-8 rounded-2xl shadow-2xl bg-white/90 border border-amber-200 hover:shadow-amber-200/30 transition-all duration-500 mb-8 animate-slide-in animation-delay-200"
            >
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b text-amber-800 border-amber-200">
                Connect With Us
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 rounded-full bg-amber-100 mr-3 text-amber-600">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{item.label}</h3>
                      <div className="flex items-center">
                        <button
                          onClick={() => copyToClipboard(item.value, item.label.toLowerCase())}
                          className="text-amber-700 hover:text-amber-900 flex items-center transition-colors"
                          aria-label={`Copy ${item.label}`}
                        >
                          <span className="mr-2">{item.value}</span>
                          {copied === item.label.toLowerCase() ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 opacity-70" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4 text-gray-800">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                      aria-label={`Visit our ${link.name} page`}
                    >
                      <span className="mr-1">{link.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div
              className="p-8 rounded-2xl shadow-2xl bg-white/90 border border-amber-200 hover:shadow-amber-200/30 transition-all duration-500 animate-slide-in animation-delay-300"
            >
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b text-amber-800 border-amber-200">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-amber-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                      className={`w-full text-left p-4 ${
                        faqOpen === index ? 'bg-amber-100' : 'bg-amber-50 hover:bg-amber-100'
                      } transition-colors flex justify-between items-center`}
                      aria-expanded={faqOpen === index}
                      aria-controls={`faq-${index}`}
                    >
                      <span className="font-medium">{faq.q}</span>
                      <div className={`transition-transform duration-300 ${faqOpen === index ? 'rotate-180' : ''}`}>
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </button>
                    <div
                      id={`faq-${index}`}
                      className={`overflow-hidden transition-all duration-300 ${
                        faqOpen === index ? 'max-h-40' : 'max-h-0'
                      }`}
                    >
                      <div className="p-4 bg-white">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div
          className="mt-8 p-8 rounded-2xl shadow-2xl bg-white/90 border border-amber-200 hover:shadow-amber-200/30 transition-all duration-500 animate-slide-in animation-delay-400"
        >
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b text-amber-800 border-amber-200">
            Business Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-amber-50">
              <h3 className="font-medium text-center mb-2">Monday - Friday</h3>
              <p className="text-center text-amber-600 text-lg">9:00 AM - 6:00 PM</p>
            </div>
            <div className="p-4 rounded-lg bg-amber-50">
              <h3 className="font-medium text-center mb-2">Saturday</h3>
              <p className="text-center text-amber-600 text-lg">10:00 AM - 4:00 PM</p>
            </div>
            <div className="p-4 rounded-lg bg-amber-50">
              <h3 className="font-medium text-center mb-2">Sunday</h3>
              <p className="text-center text-amber-600 text-lg">Closed</p>
            </div>
            <div className="p-4 rounded-lg bg-amber-50">
              <h3 className="font-medium text-center mb-2">Holidays</h3>
              <p className="text-center text-amber-600 text-lg">Hours may vary</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-slide-in {
          opacity: 0;
          animation: slideIn 0.8s ease-out forwards;
        }
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out forwards;
        }
        .animate-confetti {
          animation: confetti 3s linear forwards;
        }
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

export default Contact;
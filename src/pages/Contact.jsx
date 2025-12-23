import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiMessageSquare } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  const contactMethods = [
    {
      icon: <FiMail className="w-8 h-8" />,
      title: "Email Us",
      details: ["support@loanlink.com", "info@loanlink.com"],
      description: "We respond within 24 hours",
      color: "bg-blue-500"
    },
    {
      icon: <FiPhone className="w-8 h-8" />,
      title: "Call Us",
      details: ["+1 (800) 123-4567", "+1 (800) 987-6543"],
      description: "Mon-Fri, 9AM-6PM EST",
      color: "bg-green-500"
    },
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: "Visit Us",
      details: ["123 Finance Street", "Suite 500", "New York, NY 10001"],
      description: "Headquarters location",
      color: "bg-purple-500"
    }
  ];

  const faqs = [
    {
      question: "How long does loan approval take?",
      answer: "Most applications are processed within 24-48 hours."
    },
    {
      question: "What documents do I need to apply?",
      answer: "Typically, ID proof, income documents, and address proof are required."
    },
    {
      question: "Can I pay off my loan early?",
      answer: "Yes, with no prepayment penalties or hidden fees."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-800/10 dark:from-primary-600/5 dark:to-primary-800/5"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full font-semibold text-sm">
                Get In Touch
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              We're Here to <span className="text-primary-600">Help You</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Have questions about loans, applications, or our services? Our dedicated support team 
              is ready to assist you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {method.title}
                </h3>
                {method.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 dark:text-gray-400 mb-1">
                    {detail}
                  </p>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {method.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <FiMessageSquare className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Send Us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      First Name
                    </label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Last Name
                    </label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <select
                    {...register('subject', { required: 'Please select a subject' })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a topic</option>
                    <option value="loan-application">Loan Application</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required', minLength: 10 })}
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.type === 'minLength' ? 'Message must be at least 10 characters' : 'Message is required'}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-200 dark:hover:shadow-primary-900 flex items-center justify-center gap-3"
                >
                  <FiSend className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>

            {/* FAQ & Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* FAQ Section */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-4">
                      <h4 className="font-bold mb-2">{faq.question}</h4>
                      <p className="text-primary-200 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-xl transition-colors">
                  View All FAQs
                </button>
              </div>

              {/* Office Hours */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <FiClock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Office Hours</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Closed</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Emergency support available 24/7 via phone for existing customers
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Interactive map would display here</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
              Our customer support team is ready to help you with any questions or concerns
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-200 dark:hover:shadow-primary-900 flex items-center gap-3">
                <FiPhone />
                Call Now: +1 (800) 123-4567
              </button>
              <button className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3">
                <FiMail />
                Email Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import api from "../utils/api";
import LoanCard from "../components/LoanCard";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FiCheckCircle,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiMail,
  FiFileText,
  FiHelpCircle,
  FiArrowRight,
  FiCalendar,
  FiUserCheck,
  FiShield,
  FiClock,
} from "react-icons/fi";

const Home = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    document.title = "LoanLink - Home";
    fetchFeaturedLoans();
  }, []);

  const fetchFeaturedLoans = async () => {
    try {
      const response = await api.get("/loans/featured");
      setLoans(response.data.loans);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setNewsletterLoading(false);
    }
  };

  const steps = [
    {
      icon: <FiUsers size={40} />,
      title: "Create Account",
      description: "Sign up and complete your profile",
    },
    {
      icon: <FiDollarSign size={40} />,
      title: "Apply for Loan",
      description: "Choose a loan and submit application",
    },
    {
      icon: <FiCheckCircle size={40} />,
      title: "Get Approved",
      description: "Wait for verification and approval",
    },
    {
      icon: <FiTrendingUp size={40} />,
      title: "Grow Business",
      description: "Receive funds and achieve your goals",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://i.pravatar.cc/150?img=1",
      text: "LoanLink helped me expand my bakery business. The process was smooth and the support team was excellent!",
    },
    {
      name: "Michael Chen",
      role: "Farmer",
      image: "https://i.pravatar.cc/150?img=2",
      text: "I got a loan for agricultural equipment within days. This platform is a game-changer for rural entrepreneurs.",
    },
    {
      name: "Priya Sharma",
      role: "Student",
      image: "https://i.pravatar.cc/150?img=3",
      text: "Thanks to LoanLink, I could afford my education. The flexible repayment terms made it stress-free.",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "How to Improve Your Credit Score for Better Loan Terms",
      excerpt:
        "Learn practical tips to boost your credit score and qualify for lower interest rates on your microloans.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      category: "Financial Tips",
      date: "Mar 15, 2024",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Understanding Different Types of Business Loans",
      excerpt:
        "A comprehensive guide to various business loan options and which one is right for your venture.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w-800",
      category: "Business",
      date: "Mar 10, 2024",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "The Impact of Microloans on Local Economies",
      excerpt:
        "How small loans are making big differences in communities and driving economic growth.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      category: "Community",
      date: "Mar 5, 2024",
      readTime: "6 min read",
    },
  ];

  const faqs = [
    {
      question: "What are the eligibility criteria for a LoanLink loan?",
      answer:
        "To be eligible, you must be at least 18 years old, have a valid government ID, provide proof of income or business activity, and have a bank account. Specific requirements may vary by loan type.",
    },
    {
      question: "How long does the loan approval process take?",
      answer:
        "Most applications are processed within 24-48 hours. Once approved, funds are typically disbursed within 1-3 business days, depending on your bank.",
    },
    {
      question: "What is the minimum and maximum loan amount?",
      answer:
        "Loan amounts range from $500 to $50,000, depending on your creditworthiness, income, and the purpose of the loan.",
    },
    {
      question: "Are there any hidden fees or charges?",
      answer:
        "No hidden fees. All charges including processing fees and interest rates are clearly stated upfront during the application process.",
    },
    {
      question: "Can I repay my loan early?",
      answer:
        "Yes! We encourage early repayment. There are no prepayment penalties, and you can save on interest by paying off your loan ahead of schedule.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We use bank-level encryption and follow strict data protection protocols to ensure your personal and financial information is completely secure.",
    },
  ];

  const benefits = [
    {
      icon: <FiClock size={32} />,
      title: "Fast Approval",
      description: "Get loan decisions within 24 hours",
    },
    {
      icon: <FiUserCheck size={32} />,
      title: "Flexible Terms",
      description: "Choose repayment schedules that work for you",
    },
    {
      icon: <FiShield size={32} />,
      title: "Secure & Safe",
      description: "Bank-level security for your data",
    },
    {
      icon: <FiDollarSign size={32} />,
      title: "No Hidden Fees",
      description: "Transparent pricing with no surprises",
    },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Empowering Dreams with Accessible Microloans
              </h1>
              <p className="text-xl mb-8 text-primary-100 leading-relaxed">
                Get quick access to funds for your business, education, or
                personal needs. Simple application, fast approval, flexible
                terms.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/loans"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Explore Loans
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-all duration-300 hover:scale-105 border-2 border-white"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"
                  alt="Financial Growth"
                  className="rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
                      <FiUsers className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        10K+
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Happy Customers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Loans */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                Featured Loans
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Popular Loan Options
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Browse our most popular loan products with competitive rates and
              flexible terms
            </p>
          </motion.div>

          {loans.length > 0 ? (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loans.map((loan, index) => (
                  <motion.div
                    key={loan._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="h-full"
                  >
                    <div className="card h-full border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-xl transition-all duration-300">
                      <LoanCard loan={loan} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
                <FiDollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-300">
                  No Featured Loans Available
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Check back soon for new loan opportunities
                </p>
                <Link
                  to="/loans"
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
                >
                  Browse All Loans
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          )}

          {loans.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link
                to="/loans"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-200 dark:hover:shadow-primary-900 transition-all duration-300"
              >
                <span>Explore All Loan Options</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                Competitive rates starting from 5.99% APR
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get your loan in four simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-primary-200 dark:bg-primary-800"></div>
                  )}
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
              <FiFileText className="text-primary-600 dark:text-primary-400" />
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                Latest Insights
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Financial Insights & Tips
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay informed with our latest articles on finance, loans, and
              business growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={14} />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
                  >
                    Read More
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:gap-3 transition-all"
            >
              View All Articles
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              <FiHelpCircle className="text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                Need Help?
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our loan process
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Still have questions?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
            >
              Contact Our Support Team
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <FiMail />
                <span className="font-semibold">Stay Updated</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-xl mb-8 text-primary-100">
                Get financial tips, loan updates, and exclusive offers directly
                in your inbox
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={newsletterLoading}
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {newsletterLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : newsletterSuccess ? (
                    "Subscribed! ✓"
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </form>
              <p className="mt-4 text-sm text-primary-200">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Real stories from real people who achieved their goals with
              LoanLink
            </p>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full p-6 md:p-8 border border-gray-100 dark:border-gray-700">
                  <div className="mb-6">
                    <svg
                      className="w-10 h-10 text-blue-500 dark:text-blue-400 opacity-80"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 italic">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-50 dark:ring-gray-700"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Happy Borrowers" },
              { number: "$5M+", label: "Loans Disbursed" },
              { number: "98%", label: "Approval Rate" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Join thousands of satisfied borrowers and take the first step
              towards achieving your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
              >
                Apply for a Loan Now
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-block"
              >
                Talk to Our Experts
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

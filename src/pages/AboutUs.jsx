import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiTrendingUp, FiAward, FiHeart, FiGlobe } from 'react-icons/fi';

const AboutUs = () => {
  const features = [
    {
      icon: <FiTarget size={32} />,
      title: "Our Mission",
      description: "To democratize access to financial resources and empower underserved communities."
    },
    {
      icon: <FiUsers size={32} />,
      title: "Our Vision",
      description: "A world where everyone has equal opportunities to grow and succeed financially."
    },
    {
      icon: <FiTrendingUp size={32} />,
      title: "Our Impact",
      description: "Helping thousands of individuals and businesses achieve their financial goals."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Borrowers" },
    { number: "$25M+", label: "Loans Disbursed" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Former banker with 15+ years of financial experience"
    },
    {
      name: "Maria Garcia",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w-400",
      bio: "Specializes in microfinance and community development"
    },
    {
      name: "David Chen",
      role: "Tech Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "Fintech expert with focus on secure digital solutions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-800/10 dark:from-primary-600/5 dark:to-primary-800/5"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full font-semibold text-sm">
                About LoanLink
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Empowering Dreams, <span className="text-primary-600">One Loan at a Time</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
              We're revolutionizing access to financial opportunities by connecting borrowers with 
              fair, transparent, and accessible micro-loans through our innovative platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-12 text-white mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-primary-200">Real results, real impact</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-primary-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FiHeart className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Our Story</h2>
              </div>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400">
                <p>
                  Founded in 2020, LoanLink emerged from a simple observation: traditional financial 
                  institutions often overlook small businesses and individuals with limited credit history.
                </p>
                <p>
                  Our founders, with backgrounds in finance, technology, and community development, 
                  came together to create a platform that bridges this gap. We believe that everyone 
                  deserves a fair chance to grow their business, pursue education, or handle emergencies 
                  without being burdened by unfair terms or inaccessible loans.
                </p>
                <p>
                  Today, we're proud to be a trusted partner for thousands of borrowers across the 
                  country, helping them achieve their dreams while maintaining the highest standards 
                  of transparency and customer service.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Meet Our Leadership</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Passionate professionals dedicated to making financial inclusion a reality
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white rounded-3xl p-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <FiGlobe className="w-10 h-10 text-primary-400" />
              <h2 className="text-4xl font-bold">Our Values</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary-300">Transparency First</h3>
                <p className="text-gray-300">
                  No hidden fees, no confusing terms. We believe in clear, honest communication 
                  about every aspect of our loans.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary-300">Community Focus</h3>
                <p className="text-gray-300">
                  We measure our success by the success of our borrowers. Their growth is our growth.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary-300">Innovation Driven</h3>
                <p className="text-gray-300">
                  Constantly improving our platform to provide faster, smarter, and more accessible 
                  financial solutions.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary-300">Responsible Lending</h3>
                <p className="text-gray-300">
                  We ensure our loans are affordable and sustainable for borrowers, promoting 
                  financial health over quick profits.
                </p>
              </div>
            </div>
          </motion.div>
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
              Ready to Start Your Financial Journey?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
              Join thousands of satisfied borrowers who have found their financial partner in LoanLink
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-200 dark:hover:shadow-primary-900">
                Apply for a Loan
              </button>
              <button className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 font-semibold py-4 px-8 rounded-xl transition-all duration-300">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
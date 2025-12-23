import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDollarSign, FiPercent, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const LoanCard = ({ loan }) => {
  // Determine loan category color
  const getCategoryColor = (category) => {
    const colors = {
      'Business': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300',
      'Education': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300',
      'Personal': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300',
      'Emergency': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300',
      'Agriculture': 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300',
      'default': 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
    };
    return colors[category] || colors.default;
  };

  // Format loan duration
  const formatDuration = (months) => {
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  return (
    <motion.div
      whileHover={{ 
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300,
        damping: 20 
      }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700"></div>
      
      {/* Image section */}
      <div className="relative overflow-hidden h-56">
        <img
          src={loan.images?.[0] || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop'}
          alt={loan.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(loan.category)}`}>
            {loan.category || 'Loan'}
          </span>
        </div>
        
        {/* Verified badge */}
        {loan.isVerified && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold flex items-center gap-1">
              <FiCheckCircle size={12} /> Verified
            </span>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
          {loan.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm line-clamp-2 min-h-[40px]">
          {loan.description || 'Get flexible funding for your needs with competitive rates and easy application process.'}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Interest Rate */}
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex justify-center mb-2">
              <FiPercent className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Interest</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {loan.interest || '8.5'}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">APR</p>
          </div>

          {/* Loan Amount */}
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex justify-center mb-2">
              <FiDollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Up to</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ${(loan.maxLimit || 50000).toLocaleString()}
            </p>
          </div>

          {/* Duration */}
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex justify-center mb-2">
              <FiCalendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Term</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {formatDuration(loan.duration || 24)}
            </p>
          </div>
        </div>

        {/* Additional features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {loan.features?.map((feature, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs rounded-full"
            >
              {feature}
            </span>
          )) || (
            <>
              <span className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs rounded-full">
                Quick Approval
              </span>
              <span className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs rounded-full">
                Flexible Terms
              </span>
              <span className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs rounded-full">
                No Hidden Fees
              </span>
            </>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to={`/loans/${loan._id}`}
          className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-200 dark:group-hover:shadow-primary-900 flex items-center justify-center gap-3"
        >
          <span>View Details</span>
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
        
        {/* Footer note */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          Apply in minutes • Decision within 24h
        </p>
      </div>
    </motion.div>
  );
};

export default LoanCard;
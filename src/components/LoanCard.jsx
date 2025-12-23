import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const LoanCard = ({ loan }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card h-full flex flex-col"
    >
      <img
        src={loan.images?.[0] || 'https://via.placeholder.com/400x250'}
        alt={loan.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        {loan.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
        {loan.category}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-2">
        {loan.description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Interest</p>
          <p className="text-lg font-bold text-primary-600">{loan.interest}%</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Max Limit</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ${loan.maxLimit?.toLocaleString()}
          </p>
        </div>
      </div>
      <Link
        to={`/loans/${loan._id}`}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        View Details <FiArrowRight />
      </Link>
    </motion.div>
  );
};

export default LoanCard;
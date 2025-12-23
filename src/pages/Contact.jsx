import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <div className="card space-y-6">
          <div className="flex items-start gap-4">
            <FiMail className="text-primary-600 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">support@loanlink.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FiPhone className="text-primary-600 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">+1 234 567 8900</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FiMapPin className="text-primary-600 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Address</h3>
              <p className="text-gray-600 dark:text-gray-400">
                123 Finance Street, City, Country
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;


import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">About LoanLink</h1>
        <div className="card">
          <p className="text-lg mb-4">
            LoanLink is a revolutionary platform connecting borrowers with accessible microloans.
          </p>
          <p className="text-lg mb-4">
            Our mission is to empower individuals and small businesses by providing quick, easy
            access to funding for growth and development.
          </p>
          <p className="text-lg">
            With a streamlined application process and dedicated support team, we make financial
            growth possible for everyone.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
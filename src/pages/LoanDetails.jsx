import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiPercent, FiDollarSign, FiCalendar, FiFileText } from 'react-icons/fi';

const LoanDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoanDetails();
  }, [id]);

  const fetchLoanDetails = async () => {
    try {
      const response = await api.get(`/loans/${id}`);
      setLoan(response.data.loan);
      document.title = `LoanLink - ${response.data.loan.title}`;
    } catch (error) {
      console.error('Error fetching loan details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (user?.role === 'borrower') {
      navigate(`/apply/${id}`);
    } else {
      alert('Only borrowers can apply for loans');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!loan) return <div className="text-center py-20">Loan not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={loan.images?.[0] || 'https://via.placeholder.com/600x400'}
                alt={loan.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                {loan.category}
              </span>
              <h1 className="text-3xl font-bold mb-4">{loan.title}</h1>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <FiPercent className="text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</p>
                    <p className="font-bold">{loan.interest}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FiDollarSign className="text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Max Limit</p>
                    <p className="font-bold">${loan.maxLimit?.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <FiCalendar /> Available EMI Plans
                </h3>
                <div className="flex flex-wrap gap-2">
                  {loan.emiPlans?.map((plan, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {plan}
                    </span>
                  ))}
                </div>
              </div>

              {user?.role === 'borrower' && (
                <button onClick={handleApply} className="btn-primary w-full">
                  Apply Now
                </button>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {loan.description}
            </p>
          </div>

          {loan.requiredDocuments?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FiFileText /> Required Documents
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {loan.requiredDocuments.map((doc, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoanDetails;
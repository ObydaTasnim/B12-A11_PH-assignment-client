import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import LoanCard from '../components/LoanCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiSearch } from 'react-icons/fi';

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = 'LoanLink - All Loans';
    fetchLoans();
  }, [page, search]);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/loans?page=${page}&limit=9&search=${search}`);
      setLoans(response.data.loans);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">All Available Loans</h1>
        
        <div className="max-w-md mx-auto">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search loans by title or category..."
              className="input-field pl-10 w-full"
            />
          </div>
        </div>
      </motion.div>

      {loans.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loans.map((loan, index) => (
              <motion.div
                key={loan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LoanCard loan={loan} />
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${
                    page === pageNum
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          No loans found.
        </p>
      )}
    </div>
  );
};

export default AllLoans;
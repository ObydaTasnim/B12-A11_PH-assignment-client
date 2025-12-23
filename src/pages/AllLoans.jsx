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
    
    // Debounce search to avoid too many API calls
    const timer = setTimeout(() => {
      fetchLoans();
    }, 300);

    return () => clearTimeout(timer);
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            All Available Loans
          </h1>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search loans by title or category..."
                className="input-field pl-10 w-full"
              />
            </div>
            {search && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                Searching for "{search}"...
              </p>
            )}
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
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-lg ${
                    page === 1
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-primary-600 hover:text-white'
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      page === pageNum
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-primary-600 hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    page === totalPages
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-primary-600 hover:text-white'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <FiSearch className="mx-auto text-6xl text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                No loans found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {search 
                  ? `No loans match "${search}". Try a different search term.`
                  : 'There are no loans available at the moment.'
                }
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="btn-primary mt-4"
                >
                  Clear Search
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllLoans;
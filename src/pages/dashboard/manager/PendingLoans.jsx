import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../../utils/api';
import Modal from '../../../components/Modal';
import LoadingSpinner from '../../../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FiEye, FiCheck, FiX, FiUser, FiDollarSign } from 'react-icons/fi';

const PendingLoans = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Pending Applications';
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await api.get('/applications?status=Pending');
      console.log('Applications response:', response.data); // Debug log
      setApplications(response.data.applications || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (appId) => {
    try {
      await api.patch(`/applications/${appId}/approve`);
      toast.success('Application approved!');
      fetchApplications();
    } catch (error) {
      console.error('Approve error:', error);
      toast.error('Failed to approve');
    }
  };

  const handleReject = async (appId) => {
    try {
      await api.patch(`/applications/${appId}/reject`);
      toast.success('Application rejected');
      fetchApplications();
    } catch (error) {
      console.error('Reject error:', error);
      toast.error('Failed to reject');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Pending Applications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and approve loan applications
          </p>
        </motion.div>

        {applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12"
          >
            <FiUser className="mx-auto text-6xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Pending Applications</h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no pending applications at the moment.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="text-left p-4 font-semibold">Application ID</th>
                    <th className="text-left p-4 font-semibold">Applicant</th>
                    <th className="text-left p-4 font-semibold">Loan</th>
                    <th className="text-left p-4 font-semibold">Amount</th>
                    <th className="text-left p-4 font-semibold">Date</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <motion.tr
                      key={app._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="p-4">
                        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                          ...{app._id.slice(-8)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {app.firstName} {app.lastName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {app.userEmail}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {app.loanTitle}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {app.interestRate}% interest
                        </p>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          ${app.loanAmount?.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setShowModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FiEye size={20} />
                          </button>
                          <button
                            onClick={() => handleApprove(app._id)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <FiCheck size={20} />
                          </button>
                          <button
                            onClick={() => handleReject(app._id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <FiX size={20} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Application Details">
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                  <p className="font-semibold">{selectedApp.firstName} {selectedApp.lastName}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-semibold">{selectedApp.userEmail}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Contact</p>
                  <p className="font-semibold">{selectedApp.contactNumber}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">National ID</p>
                  <p className="font-semibold">{selectedApp.nationalId}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Income Source</p>
                  <p className="font-semibold">{selectedApp.incomeSource}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Income</p>
                  <p className="font-semibold">${selectedApp.monthlyIncome?.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg col-span-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Loan Amount Requested</p>
                  <p className="font-semibold text-primary-600 text-xl">
                    ${selectedApp.loanAmount?.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reason for Loan</p>
                <p className="text-gray-900 dark:text-white">{selectedApp.reason}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Address</p>
                <p className="text-gray-900 dark:text-white">{selectedApp.address}</p>
              </div>
              
              {selectedApp.notes && (
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Additional Notes</p>
                  <p className="text-gray-900 dark:text-white">{selectedApp.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t dark:border-gray-600">
                <button
                  onClick={() => {
                    handleApprove(selectedApp._id);
                    setShowModal(false);
                  }}
                  className="btn-primary flex-1"
                >
                  <FiCheck className="inline mr-2" />
                  Approve Application
                </button>
                <button
                  onClick={() => {
                    handleReject(selectedApp._id);
                    setShowModal(false);
                  }}
                  className="btn-secondary flex-1"
                >
                  <FiX className="inline mr-2" />
                  Reject Application
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PendingLoans;
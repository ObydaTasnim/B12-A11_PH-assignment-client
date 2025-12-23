import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import Modal from '../../../components/Modal';
import toast from 'react-hot-toast';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';

const PendingLoans = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = 'Pending Applications';
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications?status=Pending');
      setApplications(response.data.applications);
    } catch (error) {
      toast.error('Failed to fetch applications');
    }
  };

  const handleApprove = async (appId) => {
    try {
      await api.patch(`/applications/${appId}/approve`);
      toast.success('Application approved!');
      fetchApplications();
    } catch (error) {
      toast.error('Failed to approve');
    }
  };

  const handleReject = async (appId) => {
    try {
      await api.patch(`/applications/${appId}/reject`);
      toast.success('Application rejected');
      fetchApplications();
    } catch (error) {
      toast.error('Failed to reject');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pending Applications</h1>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Loan ID</th>
              <th className="text-left p-4">User Info</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b">
                <td className="p-4 font-mono text-sm">{app._id.slice(-8)}</td>
                <td className="p-4">
                  <div>
                    <p className="font-medium">{app.userId?.name}</p>
                    <p className="text-sm text-gray-600">{app.userId?.email}</p>
                  </div>
                </td>
                <td className="p-4">${app.loanAmount?.toLocaleString()}</td>
                <td className="p-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedApp(app); setShowModal(true); }} className="btn-secondary">
                      <FiEye /> View
                    </button>
                    <button onClick={() => handleApprove(app._id)} className="p-2 text-green-600 hover:bg-green-50 rounded">
                      <FiCheck size={20} />
                    </button>
                    <button onClick={() => handleReject(app._id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <FiX size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Application Details">
        {selectedApp && (
          <div className="space-y-3">
            <div><strong>Name:</strong> {selectedApp.firstName} {selectedApp.lastName}</div>
            <div><strong>Email:</strong> {selectedApp.userEmail}</div>
            <div><strong>Contact:</strong> {selectedApp.contactNumber}</div>
            <div><strong>National ID:</strong> {selectedApp.nationalId}</div>
            <div><strong>Income Source:</strong> {selectedApp.incomeSource}</div>
            <div><strong>Monthly Income:</strong> ${selectedApp.monthlyIncome?.toLocaleString()}</div>
            <div><strong>Loan Amount:</strong> ${selectedApp.loanAmount?.toLocaleString()}</div>
            <div><strong>Reason:</strong> {selectedApp.reason}</div>
            <div><strong>Address:</strong> {selectedApp.address}</div>
            {selectedApp.notes && <div><strong>Notes:</strong> {selectedApp.notes}</div>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PendingLoans;
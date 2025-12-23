import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import Modal from '../../../components/Modal';
import toast from 'react-hot-toast';
import { FiEye, FiFilter } from 'react-icons/fi';

const LoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = 'Loan Applications - Admin';
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      const response = await api.get(`/applications?status=${filter}&limit=100`);
      setApplications(response.data.applications);
    } catch (error) {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Loan Applications</h1>

      <div className="mb-6">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Loan ID</th>
              <th className="text-left p-4">User</th>
              <th className="text-left p-4">Loan Category</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
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
                <td className="p-4">{app.loanId?.category}</td>
                <td className="p-4">${app.loanAmount?.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-4">
                  <button onClick={() => viewDetails(app)} className="btn-secondary">
                    <FiEye /> View
                  </button>
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

export default LoanApplications;
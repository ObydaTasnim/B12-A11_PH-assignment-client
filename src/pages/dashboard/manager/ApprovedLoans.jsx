import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const ApprovedLoans = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    document.title = 'Approved Applications';
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications?status=Approved');
      setApplications(response.data.applications);
    } catch (error) {
      toast.error('Failed to fetch applications');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Approved Applications</h1>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Loan ID</th>
              <th className="text-left p-4">User Info</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Approved Date</th>
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
                <td className="p-4">{new Date(app.approvedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedLoans;
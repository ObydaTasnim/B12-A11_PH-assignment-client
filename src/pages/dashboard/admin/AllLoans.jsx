import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import Modal from '../../../components/Modal';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'All Loans - Admin';
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await api.get('/loans?limit=100');
      setLoans(response.data.loans);
    } catch (error) {
      toast.error('Failed to fetch loans');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHome = async (loanId) => {
    try {
      await api.patch(`/loans/${loanId}/toggle-home`);
      toast.success('Updated successfully');
      fetchLoans();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (loanId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/loans/${loanId}`);
        toast.success('Loan deleted successfully');
        fetchLoans();
      } catch (error) {
        toast.error('Failed to delete loan');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Loans</h1>
      
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Interest</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Created By</th>
              <th className="text-left p-4">Show on Home</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="border-b">
                <td className="p-4">
                  <img src={loan.images?.[0]} alt={loan.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-4">{loan.title}</td>
                <td className="p-4">{loan.interest}%</td>
                <td className="p-4">{loan.category}</td>
                <td className="p-4">{loan.createdByEmail}</td>
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={loan.showOnHome}
                    onChange={() => handleToggleHome(loan._id)}
                    className="w-5 h-5"
                  />
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded" onClick={() => handleDelete(loan._id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLoans;
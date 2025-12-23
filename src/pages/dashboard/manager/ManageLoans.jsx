import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

const ManageLoans = () => {
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.title = 'Manage Loans - Manager';
    fetchLoans();
  }, [search]);

  const fetchLoans = async () => {
    try {
      const response = await api.get(`/loans/manager/my-loans?search=${search}`);
      setLoans(response.data.loans);
    } catch (error) {
      toast.error('Failed to fetch loans');
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Loans</h1>
        <Link to="/dashboard/add-loan" className="btn-primary">Add New Loan</Link>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or category..."
            className="input-field pl-10 w-full"
          />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Interest</th>
              <th className="text-left p-4">Category</th>
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

export default ManageLoans;
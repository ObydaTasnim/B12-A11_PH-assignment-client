import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../../utils/api';
import Modal from '../../../components/Modal';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FiSearch, FiEdit, FiUserCheck, FiUserX } from 'react-icons/fi';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');

  useEffect(() => {
    document.title = 'Manage Users - LoanLink';
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    try {
      const response = await api.get(`/users?search=${search}`);
      setUsers(response.data.users);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await api.patch(`/users/${userId}/role`, { role: newRole });
      toast.success('Role updated successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleSuspend = async () => {
    if (!suspendReason.trim()) {
      toast.error('Please provide a reason for suspension');
      return;
    }

    try {
      await api.patch(`/users/${selectedUser._id}/suspend`, { suspendReason });
      toast.success('User suspended successfully');
      setShowModal(false);
      setSuspendReason('');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to suspend user');
    }
  };

  const handleActivate = async (userId) => {
    try {
      await api.patch(`/users/${userId}/activate`);
      toast.success('User activated successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to activate user');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <div className="mb-6">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="input-field pl-10 w-full"
          />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                    className="input-field py-1"
                  >
                    <option value="borrower">Borrower</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {user.status === 'active' ? (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FiUserX />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivate(user._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                      >
                        <FiUserCheck />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSuspendReason('');
        }}
        title="Suspend User"
      >
        <div className="space-y-4">
          <p>Are you sure you want to suspend {selectedUser?.name}?</p>
          <div>
            <label className="block text-sm font-medium mb-2">Reason for Suspension *</label>
            <textarea
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              className="input-field w-full"
              rows="4"
              placeholder="Provide a reason for suspending this user..."
            />
          </div>
          <div className="flex gap-4">
            <button onClick={handleSuspend} className="btn-danger flex-1">
              Suspend
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setSuspendReason('');
              }}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUsers;
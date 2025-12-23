import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import LoadingSpinner from '../components/LoadingSpinner';

const LoanApplication = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchLoanDetails();
  }, [id]);

  const fetchLoanDetails = async () => {
    try {
      const response = await api.get(`/loans/${id}`);
      setLoan(response.data.loan);
      document.title = `Apply - ${response.data.loan.title}`;
    } catch (error) {
      console.error('Error fetching loan:', error);
      toast.error('Failed to load loan details');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await api.post('/applications', {
        ...data,
        loanId: id,
        loanTitle: loan.title,
        interestRate: loan.interest,
        status: 'Pending',
        applicationFeeStatus: 'Unpaid'
      });
      
      setShowConfetti(true);
      toast.success('Application submitted successfully!');
      
      setTimeout(() => {
        navigate('/dashboard/my-loans');
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!loan) return <div className="text-center py-20">Loan not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="card">
          <h1 className="text-3xl font-bold mb-6">Loan Application Form</h1>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <h2 className="font-semibold mb-2">{loan.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Interest Rate: {loan.interest}% | Max Limit: ${loan.maxLimit?.toLocaleString()}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="input-field bg-gray-100 dark:bg-gray-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name *</label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  className="input-field"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Last Name *</label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  className="input-field"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact Number *</label>
              <input
                {...register('contactNumber', { required: 'Contact number is required' })}
                className="input-field"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">National ID / Passport Number *</label>
              <input
                {...register('nationalId', { required: 'National ID is required' })}
                className="input-field"
              />
              {errors.nationalId && (
                <p className="text-red-500 text-sm mt-1">{errors.nationalId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Income Source *</label>
              <input
                {...register('incomeSource', { required: 'Income source is required' })}
                className="input-field"
                placeholder="e.g., Business, Salary, Freelance"
              />
              {errors.incomeSource && (
                <p className="text-red-500 text-sm mt-1">{errors.incomeSource.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Monthly Income *</label>
              <input
                {...register('monthlyIncome', { 
                  required: 'Monthly income is required',
                  min: { value: 0, message: 'Must be positive' }
                })}
                type="number"
                className="input-field"
              />
              {errors.monthlyIncome && (
                <p className="text-red-500 text-sm mt-1">{errors.monthlyIncome.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Loan Amount *</label>
              <input
                {...register('loanAmount', { 
                  required: 'Loan amount is required',
                  max: { value: loan.maxLimit, message: `Maximum ${loan.maxLimit}` }
                })}
                type="number"
                className="input-field"
              />
              {errors.loanAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Reason for Loan *</label>
              <textarea
                {...register('reason', { required: 'Reason is required' })}
                className="input-field"
                rows="3"
              />
              {errors.reason && (
                <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address *</label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                className="input-field"
                rows="2"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <textarea
                {...register('notes')}
                className="input-field"
                rows="2"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Submit Application
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoanApplication;
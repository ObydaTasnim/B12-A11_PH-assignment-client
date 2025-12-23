import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import { FiDollarSign, FiPercent, FiFileText, FiCalendar, FiImage, FiHome } from 'react-icons/fi';

const AddLoan = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const loanData = {
        ...data,
        interest: parseFloat(data.interest),
        maxLimit: parseFloat(data.maxLimit),
        requiredDocuments: data.requiredDocuments.split(',').map(d => d.trim()),
        emiPlans: data.emiPlans.split(',').map(p => p.trim()),
        images: data.images.split(',').map(i => i.trim()),
        showOnHome: data.showOnHome || false
      };

      await api.post('/loans', loanData);
      toast.success('Loan created successfully!');
      navigate('/dashboard/manage-loans');
    } catch (error) {
      toast.error('Failed to create loan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Create New Loan</h1>
          <p className="text-gray-600 dark:text-gray-400">Fill in the details to add a new loan product</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
                Basic Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Title *
                </label>
                <input 
                  {...register('title', { required: 'Title is required' })} 
                  className="input-field"
                  placeholder="e.g., Small Business Startup Loan"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea 
                  {...register('description', { required: 'Description is required' })} 
                  className="input-field resize-none"
                  rows="5"
                  placeholder="Provide a detailed description of the loan product..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <input 
                  {...register('category', { required: 'Category is required' })} 
                  className="input-field"
                  placeholder="e.g., Business, Education, Personal, Agriculture"
                />
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
              </div>
            </div>

            {/* Financial Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
                Financial Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiPercent className="inline mr-1" />
                    Interest Rate (%) *
                  </label>
                  <input 
                    {...register('interest', { required: 'Interest rate is required', min: 0 })} 
                    type="number" 
                    step="0.01" 
                    className="input-field"
                    placeholder="5.5"
                  />
                  {errors.interest && <p className="text-red-500 text-sm mt-1">{errors.interest.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiDollarSign className="inline mr-1" />
                    Maximum Loan Amount *
                  </label>
                  <input 
                    {...register('maxLimit', { required: 'Max limit is required', min: 0 })} 
                    type="number" 
                    className="input-field"
                    placeholder="50000"
                  />
                  {errors.maxLimit && <p className="text-red-500 text-sm mt-1">{errors.maxLimit.message}</p>}
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
                Loan Requirements
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiFileText className="inline mr-1" />
                  Required Documents (comma-separated) *
                </label>
                <input 
                  {...register('requiredDocuments', { required: 'Required documents are required' })} 
                  className="input-field"
                  placeholder="National ID, Bank Statement, Income Proof, Tax Returns"
                />
                <p className="text-xs text-gray-500 mt-1">Separate each document with a comma</p>
                {errors.requiredDocuments && <p className="text-red-500 text-sm mt-1">{errors.requiredDocuments.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiCalendar className="inline mr-1" />
                  EMI Plans (comma-separated) *
                </label>
                <input 
                  {...register('emiPlans', { required: 'EMI plans are required' })} 
                  className="input-field"
                  placeholder="6 months, 12 months, 18 months, 24 months"
                />
                <p className="text-xs text-gray-500 mt-1">Available repayment durations</p>
                {errors.emiPlans && <p className="text-red-500 text-sm mt-1">{errors.emiPlans.message}</p>}
              </div>
            </div>

            {/* Media Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
                Media & Visibility
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiImage className="inline mr-1" />
                  Image URLs (comma-separated) *
                </label>
                <textarea 
                  {...register('images', { required: 'At least one image is required' })} 
                  className="input-field resize-none"
                  rows="3"
                  placeholder="https://example.com/loan-image1.jpg, https://example.com/loan-image2.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">Add image URLs separated by commas</p>
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    {...register('showOnHome')} 
                    type="checkbox" 
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <div>
                    <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                      <FiHome />
                      <span>Feature on Home Page</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Display this loan on the homepage for increased visibility
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button 
                type="button"
                onClick={() => navigate('/dashboard/manage-loans')}
                className="btn-secondary flex-1"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                className="btn-primary flex-1"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  'Create Loan'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddLoan;
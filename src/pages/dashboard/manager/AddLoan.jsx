import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Loan</h1>

      <div className="card max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Loan Title *</label>
            <input {...register('title', { required: 'Title is required' })} className="input-field" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea {...register('description', { required: 'Description is required' })} className="input-field" rows="4" />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <input {...register('category', { required: 'Category is required' })} className="input-field" placeholder="e.g., Business, Education" />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Interest Rate (%) *</label>
              <input {...register('interest', { required: 'Interest rate is required' })} type="number" step="0.01" className="input-field" />
              {errors.interest && <p className="text-red-500 text-sm mt-1">{errors.interest.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Loan Limit *</label>
              <input {...register('maxLimit', { required: 'Max limit is required' })} type="number" className="input-field" />
              {errors.maxLimit && <p className="text-red-500 text-sm mt-1">{errors.maxLimit.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Required Documents (comma-separated) *</label>
            <input {...register('requiredDocuments', { required: 'Required documents are required' })} className="input-field" placeholder="ID Card, Bank Statement, Income Proof" />
            {errors.requiredDocuments && <p className="text-red-500 text-sm mt-1">{errors.requiredDocuments.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">EMI Plans (comma-separated) *</label>
            <input {...register('emiPlans', { required: 'EMI plans are required' })} className="input-field" placeholder="6 months, 12 months, 24 months" />
            {errors.emiPlans && <p className="text-red-500 text-sm mt-1">{errors.emiPlans.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Images (comma-separated URLs) *</label>
            <input {...register('images', { required: 'At least one image is required' })} className="input-field" placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
            {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input {...register('showOnHome')} type="checkbox" className="w-5 h-5" />
            <label className="text-sm font-medium">Show on Home Page</label>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating...' : 'Create Loan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLoan;
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../../../utils/api';
import Modal from '../../../components/Modal';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FiEye, FiX, FiDollarSign } from 'react-icons/fi';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ applicationId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const { data } = await api.post('/applications/create-payment-intent', { applicationId });
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        await api.post('/applications/confirm-payment', {
          applicationId,
          paymentIntentId: paymentIntent.id
        });
        toast.success('Payment successful!');
        onSuccess();
      }
    } catch (error) {
      toast.error('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border rounded-lg" />
      <button type="submit" disabled={!stripe || loading} className="btn-primary w-full">
        {loading ? 'Processing...' : 'Pay $10'}
      </button>
    </form>
  );
};

const MyLoans = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentApp, setPaymentApp] = useState(null);

  useEffect(() => {
    document.title = 'My Loans';
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/my-applications');
      setApplications(response.data.applications);
    } catch (error) {
      toast.error('Failed to fetch applications');
    }
  };

  const handleCancel = async (appId) => {
    const result = await Swal.fire({
      title: 'Cancel Application?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/applications/${appId}`);
        toast.success('Application cancelled');
        fetchApplications();
      } catch (error) {
        toast.error('Failed to cancel');
      }
    }
  };

  const showPaymentDetails = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Loan Applications</h1>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Loan ID</th>
              <th className="text-left p-4">Loan Info</th>
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
                    <p className="font-medium">{app.loanTitle}</p>
                    <p className="text-sm text-gray-600">{app.loanId?.category}</p>
                  </div>
                </td>
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
                  <div className="flex gap-2">
                    {app.status === 'Pending' && (
                      <button onClick={() => handleCancel(app._id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <FiX size={20} />
                      </button>
                    )}
                    {app.applicationFeeStatus === 'Unpaid' ? (
                      <button onClick={() => { setPaymentApp(app); setShowPaymentModal(true); }} className="btn-primary text-sm">
                        Pay Fee
                      </button>
                    ) : (
                      <button onClick={() => showPaymentDetails(app)} className="btn-secondary text-sm">
                        Paid
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Payment Details">
        {selectedApp?.paymentDetails && (
          <div className="space-y-3">
            <div><strong>Transaction ID:</strong> {selectedApp.paymentDetails.transactionId}</div>
            <div><strong>Amount:</strong> ${selectedApp.paymentDetails.amount}</div>
            <div><strong>Paid At:</strong> {new Date(selectedApp.paymentDetails.paidAt).toLocaleString()}</div>
            <div><strong>Email:</strong> {selectedApp.userEmail}</div>
            <div><strong>Loan ID:</strong> {selectedApp._id}</div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Pay Application Fee">
        <Elements stripe={stripePromise}>
          <PaymentForm applicationId={paymentApp?._id} onSuccess={() => { setShowPaymentModal(false); fetchApplications(); }} />
        </Elements>
      </Modal>
    </div>
  );
};

export default MyLoans;
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ManagerRoute from './components/ManagerRoute';
import BorrowerRoute from './components/BorrowerRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllLoans from './pages/AllLoans';
import LoanDetails from './pages/LoanDetails';
import LoanApplication from './pages/LoanApplication';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import ManageUsers from './pages/dashboard/admin/ManageUsers';
import AdminAllLoans from './pages/dashboard/admin/AllLoans';
import LoanApplicationsAdmin from './pages/dashboard/admin/LoanApplications';

// Manager Pages
import AddLoan from './pages/dashboard/manager/AddLoan';
import ManageLoans from './pages/dashboard/manager/ManageLoans';
import PendingLoans from './pages/dashboard/manager/PendingLoans';
import ApprovedLoans from './pages/dashboard/manager/ApprovedLoans';
import ManagerProfile from './pages/dashboard/manager/Profile';

// Borrower Pages
import MyLoans from './pages/dashboard/borrower/MyLoans';
import BorrowerProfile from './pages/dashboard/borrower/Profile';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/loans" element={<AllLoans />} />
                <Route path="/loans/:id" element={<PrivateRoute><LoanDetails /></PrivateRoute>} />
                <Route path="/apply/:id" element={<PrivateRoute><LoanApplication /></PrivateRoute>} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Routes */}
                <Route path="/dashboard/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
                <Route path="/dashboard/all-loan" element={<AdminRoute><AdminAllLoans /></AdminRoute>} />
                <Route path="/dashboard/loan-applications" element={<AdminRoute><LoanApplicationsAdmin /></AdminRoute>} />

                {/* Manager Routes */}
                <Route path="/dashboard/add-loan" element={<ManagerRoute><AddLoan /></ManagerRoute>} />
                <Route path="/dashboard/manage-loans" element={<ManagerRoute><ManageLoans /></ManagerRoute>} />
                <Route path="/dashboard/pending-loans" element={<ManagerRoute><PendingLoans /></ManagerRoute>} />
                <Route path="/dashboard/approved-loans" element={<ManagerRoute><ApprovedLoans /></ManagerRoute>} />
                <Route path="/dashboard/profile" element={<ManagerRoute><ManagerProfile /></ManagerRoute>} />

                {/* Borrower Routes */}
                <Route path="/dashboard/my-loans" element={<BorrowerRoute><MyLoans /></BorrowerRoute>} />
                <Route path="/dashboard/my-profile" element={<BorrowerRoute><BorrowerProfile /></BorrowerRoute>} />
                <Route 
  path="/dashboard" 
  element={
    <PrivateRoute>
      <DashboardRedirect />
    </PrivateRoute>
  } 
/>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function DashboardRedirect() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  switch (user.role) {
    case 'admin':
      return <Navigate to="/dashboard/manage-users" replace />;
    case 'manager':
      return <Navigate to="/dashboard/add-loan" replace />;
    case 'borrower':
      return <Navigate to="/dashboard/my-loans" replace />;
    default:
      return <Navigate to="/" replace />;
  }
}

export default App;
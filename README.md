# LoanLink - Microloan Management Platform

A modern, full-featured microloan management platform built with React, Vite, Firebase, and Tailwind CSS. LoanLink connects borrowers with loan providers, streamlining the loan application and approval process.

## 🚀 Live Demo

**Frontend**: [https://loan-link-obyda.netlify.app/](https://loan-link-obyda.netlify.app/)

**Backend API**: [https://b12-a11-ph-assignment-server.vercel.app/](https://b12-a11-ph-assignment-server.vercel.app/)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [User Roles & Permissions](#user-roles--permissions)
- [Key Features by Role](#key-features-by-role)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **Firebase Authentication** with email/password and Google sign-in
- **Role-based access control** (Admin, Manager, Borrower)
- **Protected routes** with automatic redirects
- **JWT token management** with httpOnly cookies
- **Persistent login** across sessions

### 💼 Loan Management
- **Browse all available loans** with search and pagination
- **Detailed loan information** with images, interest rates, and EMI plans
- **Featured loans** on homepage
- **Category-based filtering**
- **Manager dashboard** for creating and managing loans

### 📝 Application Process
- **Easy application submission** with form validation
- **Document requirements** clearly displayed
- **Application tracking** for borrowers
- **Approval workflow** for managers
- **Application status updates** (Pending, Approved, Rejected)

### 💳 Payment Integration
- **Stripe payment processing** for application fees
- **Secure payment flow** with Stripe Elements
- **Payment status tracking**
- **Success confirmation** with confetti animation

### 🎨 User Experience
- **Modern, responsive design** with Tailwind CSS
- **Dark mode support** with theme toggle
- **Smooth animations** with Framer Motion
- **Toast notifications** for user feedback
- **Loading states** and spinners
- **Mobile-friendly** interface

### 👥 User Management (Admin)
- **View all users** with search and filters
- **Change user roles** (promote/demote)
- **Suspend/activate users** with reasons
- **User statistics** and activity tracking

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM 6** - Client-side routing

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Swiper** - Touch slider component

### State Management & Forms
- **React Context API** - Global state management
- **React Hook Form** - Form validation
- **Axios** - HTTP client
- **JS Cookie** - Cookie management

### Authentication & Payments
- **Firebase** - Authentication provider
- **Stripe** - Payment processing
- **JWT** - Token-based auth

### Notifications & Feedback
- **React Hot Toast** - Toast notifications
- **SweetAlert2** - Beautiful alerts
- **React Confetti** - Celebration animations

---

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project
- Stripe account

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/loanlink-frontend.git
cd loanlink-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```bash
cp .env.example .env
```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

5. **Start development server**
```bash
npm run dev
```

Application will run on `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyAQPhyXu7YCI6LhxqNaiPkkjX4aWbC1yJQ
VITE_FIREBASE_AUTH_DOMAIN=loan-link-cb6db.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=loan-link-cb6db
VITE_FIREBASE_STORAGE_BUCKET=loan-link-cb6db.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=496888475694
VITE_FIREBASE_APP_ID=1:496888475694:web:060616e1dd419400192fbf

# Backend API
VITE_API_URL=https://b12-a11-ph-assignment-server.vercel.app/api

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### Production Environment Variables (Netlify)

Set these in Netlify Dashboard → Site settings → Environment variables:

| Variable | Value |
|----------|-------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Your Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Your Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your Firebase sender ID |
| `VITE_FIREBASE_APP_ID` | Your Firebase app ID |
| `VITE_API_URL` | `https://b12-a11-ph-assignment-server.vercel.app/api` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key |

---

## 👥 User Roles & Permissions

### 🔴 Admin
**Full platform control**
- View and manage all users
- Change user roles (promote/demote)
- Suspend/activate users
- View all loans and applications
- Delete any loan
- Toggle loan visibility on homepage

**Dashboard Pages:**
- Manage Users
- All Loans
- Loan Applications

### 🟡 Manager
**Loan and application management**
- Create new loan products
- Edit and delete own loans
- View all loan applications
- Approve or reject applications
- Manage application workflow

**Dashboard Pages:**
- Add Loan
- Manage Loans
- Pending Applications
- Approved Applications
- Profile

### 🟢 Borrower
**Apply for loans**
- Browse available loans
- Search and filter loans
- Submit loan applications
- Track application status
- Pay application fees via Stripe
- Cancel pending applications

**Dashboard Pages:**
- My Applications
- Profile

---

## 🎯 Key Features by Role

### For Borrowers

#### Browse Loans
- View all available loans with images
- Search by title or category
- Filter by loan type
- Paginated results

#### Apply for Loan
- Fill application form with validation
- Upload required documents (simulated)
- Select EMI plan
- Pay application fee via Stripe
- Receive confirmation

#### Track Applications
- View all submitted applications
- Check application status
- See approval/rejection updates
- Cancel pending applications

### For Managers

#### Create Loans
- Add new loan products
- Set interest rates and limits
- Define required documents
- Set EMI options
- Upload loan images
- Feature on homepage

#### Manage Applications
- View pending applications
- Review applicant details
- Approve qualified applications
- Reject with reasons
- Track approval statistics

### For Admins

#### User Management
- View all registered users
- Search users by name/email
- Promote borrowers to managers
- Demote managers to borrowers
- Suspend problematic users
- Activate suspended accounts

#### Platform Oversight
- View all loans across managers
- Control homepage featured loans
- Monitor application activity
- Delete inappropriate content

---

## 📁 Project Structure

```
client/
├── public/
│   ├── _redirects           # Netlify SPA routing
│   └── vite.svg
├── src/
│   ├── assets/              # Images and static files
│   ├── components/
│   │   ├── AdminRoute.jsx   # Protected route for admins
│   │   ├── BorrowerRoute.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── LoanCard.jsx     # Loan display card
│   │   ├── ManagerRoute.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx       # Navigation with role-based menu
│   │   ├── PrivateRoute.jsx
│   │   └── ThemeToggle.jsx  # Dark mode toggle
│   ├── contexts/
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── ThemeContext.jsx # Theme state
│   ├── pages/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   │   ├── AllLoan.jsx
│   │   │   │   ├── LoanApplications.jsx
│   │   │   │   └── ManageUsers.jsx
│   │   │   ├── borrower/
│   │   │   │   ├── MyLoans.jsx
│   │   │   │   └── MyProfile.jsx
│   │   │   └── manager/
│   │   │       ├── AddLoan.jsx
│   │   │       ├── ApprovedLoans.jsx
│   │   │       ├── ManageLoans.jsx
│   │   │       ├── PendingLoans.jsx
│   │   │       └── Profile.jsx
│   │   ├── AboutUs.jsx
│   │   ├── AllLoans.jsx     # Browse all loans
│   │   ├── Contact.jsx
│   │   ├── Home.jsx         # Landing page
│   │   ├── LoanApplication.jsx
│   │   ├── LoanDetails.jsx  # Individual loan page
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   └── Register.jsx
│   ├── utils/
│   │   └── api.js           # Axios instance with interceptors
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .env                     # Environment variables
├── .gitignore
├── index.html
├── netlify.toml             # Netlify configuration
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🗺️ Pages & Routes

### Public Routes
- `/` - Home page with featured loans
- `/loans` - Browse all loans
- `/loans/:id` - Loan details page
- `/about` - About us page
- `/contact` - Contact page
- `/login` - User login
- `/register` - User registration

### Protected Routes (Require Authentication)

#### Admin Routes
- `/dashboard/manage-users` - User management
- `/dashboard/all-loan` - All loans overview
- `/dashboard/loan-applications` - All applications

#### Manager Routes
- `/dashboard/add-loan` - Create new loan
- `/dashboard/manage-loans` - Manage own loans
- `/dashboard/pending-loans` - Pending applications
- `/dashboard/approved-loans` - Approved applications
- `/dashboard/profile` - Manager profile

#### Borrower Routes
- `/dashboard/my-loans` - My applications
- `/dashboard/my-profile` - Borrower profile
- `/apply/:loanId` - Apply for loan
- `/payment/:applicationId` - Payment page

---

## 🧩 Components

### Layout Components
- **Navbar** - Responsive navigation with role-based menus
- **Footer** - Site footer with links
- **ThemeToggle** - Dark/light mode switcher

### Route Protection
- **PrivateRoute** - Requires authentication
- **AdminRoute** - Admin access only
- **ManagerRoute** - Manager access only
- **BorrowerRoute** - Borrower access only

### UI Components
- **LoanCard** - Displays loan information in a card
- **Modal** - Reusable modal dialog
- **LoadingSpinner** - Loading indicator

### Context Providers
- **AuthContext** - User authentication state
- **ThemeContext** - Theme (dark/light) state

---

## 🚀 Deployment

### Deploy to Netlify

#### Option 1: Git-based Deployment (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/loanlink-frontend.git
git push -u origin main
```

2. **Connect to Netlify**
- Go to [Netlify Dashboard](https://app.netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect your GitHub repository
- Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`

3. **Add Environment Variables**
- Site settings → Environment variables
- Add all `VITE_*` variables

4. **Deploy**
- Click "Deploy site"
- Wait for build to complete

#### Option 2: Manual Deployment

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Automatic Deployments
- Connected to GitHub for automatic deployments
- Push to `main` branch triggers deployment
- Preview deployments on pull requests

---

## 🎨 Design Features

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions

### Dark Mode
- System preference detection
- Manual toggle switch
- Persistent theme selection
- Smooth transitions

### Animations
- Page transitions with Framer Motion
- Card hover effects
- Button interactions
- Loading states
- Success celebrations (confetti)

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Color contrast compliance

---

## 🧪 Testing

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🔧 Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## 🐛 Common Issues & Solutions

### Build Fails
**Problem**: Deployment fails during build  
**Solution**: 
1. Check all environment variables are set
2. Run `npm run build` locally to identify errors
3. Ensure all dependencies are in `package.json`

### Routes Return 404
**Problem**: Direct navigation to routes gives 404  
**Solution**: 
1. Ensure `_redirects` file exists in `public/` directory
2. Or use `netlify.toml` with redirect rules

### Firebase Auth Errors
**Problem**: Can't login or register  
**Solution**: 
1. Check Firebase configuration in `.env`
2. Verify domain is authorized in Firebase Console
3. Check Firebase Authentication is enabled

### API Calls Fail
**Problem**: CORS errors or network errors  
**Solution**: 
1. Verify `VITE_API_URL` points to correct backend
2. Check backend `CLIENT_URL` includes your Netlify URL
3. Ensure backend is deployed and running

### Stripe Payment Fails
**Problem**: Payment form doesn't load  
**Solution**: 
1. Check `VITE_STRIPE_PUBLISHABLE_KEY` is set
2. Verify key matches your Stripe account
3. Check backend has matching Stripe secret key

---

## 📊 Performance Optimization

- **Code Splitting** - Automatic route-based splitting
- **Lazy Loading** - Images and components load on demand
- **Asset Optimization** - Minified CSS and JS
- **CDN Delivery** - Fast global content delivery via Netlify
- **Caching** - Browser caching for static assets

---

## 🔒 Security Features

- **httpOnly Cookies** - Secure token storage
- **JWT Authentication** - Token-based auth
- **CORS Protection** - Restricted API access
- **Input Validation** - Client and server-side validation
- **XSS Prevention** - Sanitized user inputs
- **HTTPS Only** - Secure connections

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Tasnimul Hasan Obyda**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing fast build tool
- Tailwind CSS for the utility-first framework
- Firebase for authentication services
- Stripe for payment processing
- Netlify for hosting

---

## 🌟 Features Roadmap

- [ ] Email notifications for application updates
- [ ] Document upload functionality
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Credit score integration
- [ ] Automated loan recommendations

---

## 📞 Support

For support, email your.email@example.com or create an issue in the repository.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Frontend Live**: [https://loan-link-obyda.netlify.app/](https://loan-link-obyda.netlify.app/)

**Backend API**: [https://b12-a11-ph-assignment-server.vercel.app/](https://b12-a11-ph-assignment-server.vercel.app/)

---

**Built with ❤️ by Tasnimul Hasan Obyda**

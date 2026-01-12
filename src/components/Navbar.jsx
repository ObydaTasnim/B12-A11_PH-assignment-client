import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiUser, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const publicLinks = [
    { path: "/", label: "Home" },
    { path: "/loans", label: "All Loans" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  const getDashboardLinks = () => {
    if (!user) return [];

    switch (user.role) {
      case "admin":
        return [
          { path: "/dashboard/manage-users", label: "Manage Users" },
          { path: "/dashboard/all-loan", label: "All Loans" },
          { path: "/dashboard/loan-applications", label: "Applications" },
          { path: "/dashboard/admin-profile", label: "Profile" },
        ];
      case "manager":
        return [
          { path: "/dashboard/add-loan", label: "Add Loan" },
          { path: "/dashboard/manage-loans", label: "Manage Loans" },
          { path: "/dashboard/pending-loans", label: "Pending Applications" },
          { path: "/dashboard/approved-loans", label: "Approved Applications" },
          { path: "/dashboard/profile", label: "Profile" },
        ];
      case "borrower":
        return [
          { path: "/dashboard/my-loans", label: "My Applications" },
          { path: "/dashboard/my-profile", label: "Profile" },
        ];
      default:
        return [];
    }
  };

  const dashboardLinks = getDashboardLinks();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-primary-600"
            >
              LoanLink
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-primary-600"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/loans"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-primary-600"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary-600"
                }`
              }
            >
              All Loans
            </NavLink>

            {!user && (
              <>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-primary-600"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-600"
                    }`
                  }
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-primary-600"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-600"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </>
            )}

            {user && dashboardLinks.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                  onBlur={() =>
                    setTimeout(() => setIsDashboardOpen(false), 200)
                  }
                  className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors flex items-center gap-1"
                >
                  Dashboard
                  <FiChevronDown
                    className={`transition-transform ${
                      isDashboardOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isDashboardOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 min-w-[200px]"
                    >
                      {dashboardLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsDashboardOpen(false)}
                          className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                      <FiUser size={20} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
                <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col gap-4">
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-primary-600"
                      : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/loans"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-primary-600"
                      : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                All Loans
              </NavLink>

              {!user && (
                <>
                  <NavLink
                    to="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-medium transition-colors ${
                        isActive
                          ? "text-primary-600"
                          : "text-gray-700 dark:text-gray-300"
                      }`
                    }
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-medium transition-colors ${
                        isActive
                          ? "text-primary-600"
                          : "text-gray-700 dark:text-gray-300"
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                </>
              )}

              {user && dashboardLinks.length > 0 && (
                <>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      Dashboard
                    </p>
                    {dashboardLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <ThemeToggle />
                {user ? (
                  <button onClick={logout} className="btn-secondary w-full">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn-secondary flex-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary flex-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

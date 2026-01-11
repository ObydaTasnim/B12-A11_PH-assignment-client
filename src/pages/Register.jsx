import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiUser, FiImage, FiBriefcase } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const {
    register: registerForm,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { register: registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const password = watch("password");

  const validatePassword = (value) => {
    if (!/[A-Z]/.test(value))
      return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must contain a lowercase letter";
    if (value.length < 6) return "Password must be at least 6 characters";
    return true;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(
        data.email,
        data.password,
        data.name,
        data.photoURL,
        data.role
      );
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google sign up failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join LoanLink to get started
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...registerForm("name", { required: "Name is required" })}
                  type="text"
                  className="w-full px-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...registerForm("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="w-full px-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Photo URL (Optional)
              </label>
              <div className="relative">
                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...registerForm("photoURL")}
                  type="url"
                  className="w-full px-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            {/* Role Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                I am a *
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                <select
                  {...registerForm("role", {
                    required: "Please select a role",
                  })}
                  className="w-full px-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none cursor-pointer transition-all duration-200"
                >
                  <option value="">Select your role</option>
                  <option value="borrower">Borrower (Looking for loans)</option>
                  <option value="manager">Manager (Managing loans)</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...registerForm("password", {
                    required: "Password is required",
                    validate: validatePassword,
                  })}
                  type="password"
                  className="w-full px-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Must contain uppercase, lowercase, and be 6+ characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleRegister}
            type="button"
            className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors duration-200"
          >
            <FaGoogle className="text-xl text-red-500" />
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

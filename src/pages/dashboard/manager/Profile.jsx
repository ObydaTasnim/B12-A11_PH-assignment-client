import { useAuth } from "../../../contexts/AuthContext";
import { FiEdit, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manager Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your account information and status
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
        >
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-6">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-primary-100 dark:ring-primary-900 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <button className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                <FiEdit
                  size={18}
                  className="text-gray-600 dark:text-gray-400"
                />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {user?.name}
            </h2>

            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-semibold rounded-full">
                {user?.role?.toUpperCase() || "MANAGER"}
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full">
                {user?.status?.toUpperCase() || "ACTIVE"}
              </span>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Manager ID */}
            {/* <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Manager ID
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    MG-{user?.uid?.slice(0, 8).toUpperCase() || "UNKNOWN"}
                  </p>
                </div>
              </div>
            </div> */}

            {/* Email */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Email Address
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white break-all">
                    {user?.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-800 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Account Status
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 font-semibold rounded-full">
                      {user?.status?.toUpperCase() || "ACTIVE"}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Your account is verified and active
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Member Since */}
            {/* <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-lg">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Member Since
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Not available"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Duration:{" "}
                    {user?.createdAt
                      ? Math.floor(
                          (new Date() - new Date(user.createdAt)) /
                            (1000 * 60 * 60 * 24 * 30)
                        ) + " months"
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </div> */}

            {/* Account Actions */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <button className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                  <FiEdit />
                  Edit Profile
                </button> */}
                <button
                  onClick={logout}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
                  Need help with your account? Contact support at
                  support@loanlink.com
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Simple Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Account Type
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {user?.role || "Manager"}
            </p>
          </div>
          {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Email Verified
            </p>
            <p className="font-semibold text-green-600 dark:text-green-400">
              {user?.emailVerified ? "Verified ✓" : "Pending"}
            </p>
          </div> */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Last Login
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {user?.lastLoginAt ? "Today" : "Recently"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

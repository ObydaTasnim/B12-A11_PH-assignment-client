import { useAuth } from "../../../contexts/AuthContext";
import {
  FiLogOut,
  FiMail,
  FiUser,
  FiShield,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiActivity,
} from "react-icons/fi";
import { motion } from "framer-motion";

const AdminProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            System administration and user management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Overview */}
          <div className="lg:col-span-2">
            {/* Main Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Avatar */}
                <div className="relative">
                  {user?.photoURL ? (
                    <div className="relative">
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-40 h-40 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Admin Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {user?.name}
                    </h2>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold rounded-full border border-red-500/20">
                        {user?.role?.toUpperCase() || "ADMIN"}
                      </span>
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full border border-green-500/20">
                        SUPER ADMIN
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Full system administrator with access to all platform
                    features, user management, and system configuration.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FiMail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Admin Email
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <FiShield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Access Level
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Full Access
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* System Stats */}
           
          </div>

          {/* Right Column - Admin Actions */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
             
              

              {/* Logout Card */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FiLogOut className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Admin Logout
                    </h3>
                    <p className="text-red-100 text-sm">
                      Secure session termination
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors"
                >
                  <FiLogOut />
                  Logout Admin
                </button>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-red-100 text-sm text-center">
                    For emergencies, contact: admin-support@loanlink.com
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

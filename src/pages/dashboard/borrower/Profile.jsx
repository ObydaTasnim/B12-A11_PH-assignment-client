import { useAuth } from "../../../contexts/AuthContext";
import {
  FiLogOut,
  FiMail,
  FiUser,
  FiCreditCard,
  FiCalendar,
  FiCheckCircle,
  FiEdit,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Profile = () => {
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
            My Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage your account and track your loan applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2">
            {/* Main Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
                {/* Avatar Section */}
                <div className="relative">
                  {user?.photoURL ? (
                    <div className="relative">
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-32 h-32 rounded-xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                      />
                      <button className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <FiEdit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <button className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <FiEdit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {user?.name}
                    </h2>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold rounded-full border border-primary-500/20">
                        {user?.role?.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full border border-green-500/20">
                        {user?.status?.toUpperCase() || "ACTIVE"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Welcome to your personal dashboard. Here you can manage your
                    profile, track applications, and view your loan history.
                  </p>
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Card */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                      <FiMail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Email Address
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Type */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                      <FiUser className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Account Type
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-800/30 rounded-lg">
                      <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Account Status
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 font-semibold rounded-full text-sm">
                          {user?.status?.toUpperCase() || "ACTIVE"}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Since */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 dark:bg-orange-800/30 rounded-lg">
                      <FiCalendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Member Since
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "Recently"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Loan Overview */}
           
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Account Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Account Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Email Verified
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full">
                      Verified ✓
                    </span>
                  </div>

                 

                  
                </div>
              </div>

              {/* Quick Actions */}
              

              {/* Logout Card */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FiLogOut className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Account Security
                    </h3>
                    <p className="text-red-100 text-sm">Secure your account</p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors mb-4"
                >
                  <FiLogOut />
                  Logout
                </button>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-red-100 text-sm text-center">
                    Need help? Contact support@loanlink.com
                  </p>
                </div>
              </div>

              {/* Credit Score Info */}
             
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

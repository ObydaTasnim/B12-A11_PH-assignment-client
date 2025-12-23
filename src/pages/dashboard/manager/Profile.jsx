import { useAuth } from '../../../contexts/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="card max-w-2xl">
        <div className="flex items-center gap-6 mb-6">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
            <p className="text-lg">{user?.email}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Role</label>
            <p className="text-lg capitalize">{user?.role}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
            <p className="text-lg capitalize">{user?.status}</p>
          </div>
        </div>

        <button onClick={logout} className="btn-danger mt-6">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
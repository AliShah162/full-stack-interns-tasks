'use client';
import { useSelector } from 'react-redux';
import { FiMail, FiPhone, FiMapPin, FiBriefcase, FiUser } from 'react-icons/fi';

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <FiUser className="mt-1 text-gray-400" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="text-sm text-gray-900">{user.firstName} {user.lastName}</dd>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FiMail className="mt-1 text-gray-400" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">{user.email}</dd>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FiPhone className="mt-1 text-gray-400" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="text-sm text-gray-900">{user.phone || 'N/A'}</dd>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FiBriefcase className="mt-1 text-gray-400" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="text-sm text-gray-900">Administrator</dd>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:col-span-2">
              <FiMapPin className="mt-1 text-gray-400" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="text-sm text-gray-900">{user.address || 'N/A'}</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
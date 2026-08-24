'use client';
import { useSelector } from 'react-redux';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white border-b border-gray-200 px-6 text-black py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              {user?.firstName?.[0] || <FiUser />}
            </div>
            <span className="text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
// import { logout } from './store/slices/authSlice';
import { logout } from '@/app/store/slices/authSlice';
import { 
  FiHome, 
  FiUsers, 
  FiUser, 
  FiSettings, 
  FiLogOut 
} from 'react-icons/fi';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: FiHome },
  { name: 'Employees', path: '/employees', icon: FiUsers },
  { name: 'Profile', path: '/profile', icon: FiUser },
  { name: 'Settings', path: '/settings', icon: FiSettings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">EmpDash</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
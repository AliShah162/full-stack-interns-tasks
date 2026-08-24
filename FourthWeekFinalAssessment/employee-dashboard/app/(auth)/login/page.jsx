'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/app/store/slices/authSlice';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('emilys'); //these are by defaulttt
  const [password, setPassword] = useState('emilyspass');//this tooo
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data
        dispatch(login(data));
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        // Show specific error message
        toast.error(data.message || 'Invalid username or password');
        console.error('Login error:', data);
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Employee Dashboard
          </h2>
          <p className="mt-2 text-center text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 border-t pt-4">
          <p className="font-medium text-gray-700">Demo Credentials:</p>
          <p className="mt-1">Username: <span className="font-mono bg-gray-100 px-2 py-1 rounded">emilys</span></p>
          <p>Password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">emilyspass</span></p>
        </div>
      </div>
    </div>
  );
}
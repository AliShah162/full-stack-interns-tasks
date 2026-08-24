'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
    itemsPerPage: 10,
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save settings logic here
    toast.success('Settings saved successfully!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {/* Notification Settings */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive email notifications about updates</p>
            </div>
            <button
              onClick={() => handleChange('notifications', !settings.notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Dark Mode</p>
              <p className="text-sm text-gray-500">Switch between light and dark theme</p>
            </div>
            <button
              onClick={() => handleChange('darkMode', !settings.darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Language</h3>
          <div className="max-w-xs">
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>

        {/* Display Settings */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Display</h3>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Items Per Page
            </label>
            <select
              value={settings.itemsPerPage}
              onChange={(e) => handleChange('itemsPerPage', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-6 bg-gray-50 rounded-b-lg">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
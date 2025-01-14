import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
// import { updateUser } from '../../store/slices/authSlice';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    specialty: user?.specialty || '',
    phone: user?.phone || '',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    appointments: true,
    messages: true,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser(profile));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    console.log('Password change submitted:', password);
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement notification settings update logic here
    console.log('Notification settings updated:', notifications);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
              <input
                type="text"
                id="specialty"
                name="specialty"
                value={profile.specialty}
                onChange={handleProfileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Profile
            </button>
          </div>
        </form>
      </div>

      {/* Password Management */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Password Management</h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="current" className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                id="current"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="new" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="new"
                name="new"
                value={password.new}
                onChange={handlePasswordChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Change Password
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <form onSubmit={handleNotificationSubmit}>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="email"
                name="email"
                checked={notifications.email}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="email" className="ml-2 block text-sm text-gray-900">
                Receive email notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sms"
                name="sms"
                checked={notifications.sms}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="sms" className="ml-2 block text-sm text-gray-900">
                Receive SMS notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="appointments"
                name="appointments"
                checked={notifications.appointments}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="appointments" className="ml-2 block text-sm text-gray-900">
                Receive appointment reminders
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="messages"
                name="messages"
                checked={notifications.messages}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="messages" className="ml-2 block text-sm text-gray-900">
                Receive message notifications
              </label>
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Notification Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;


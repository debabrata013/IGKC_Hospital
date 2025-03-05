import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Lock, Bell, Save } from 'lucide-react';
import axios from 'axios';
import { RootState } from '../../store';
import { updateUser } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';

interface UserSettings {
  name: string;
  email: string;
  phone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    appointments: boolean;
  };
}

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [settings, setSettings] = useState<UserSettings>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '', 
    notifications: {
      email: user?.notifications?.email ?? true,
      sms: user?.notifications?.sms ?? false,
      appointments: user?.notifications?.appointments ?? true
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [name]: checked }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate input before submission
      if (!settings.name || !settings.email) {
        toast.error('Name and email are required');
        return;
      }

      const result = await dispatch(updateUser({
        name: settings.name,
        email: settings.email,
        phone: settings.phone,
      }));

      // Check if the action was rejected
      if (updateUser.rejected.match(result)) {
        const error = result.payload as string;
        throw new Error(error || 'Update failed');
      }

      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Detailed update error:', error);
      
      // More specific error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error(error.response.data.message || 'Server error during update');
      } else if (error.message) {
        // Generic error message
        toast.error(error.message);
      } else {
        // Fallback error message
        toast.error('Failed to update profile. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <User className="mr-3 text-blue-600" /> Account Settings
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="mr-2 text-blue-500" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Lock className="mr-2 text-blue-500" /> Password
            </h2>
            <button 
              type="button" 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Change Password
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bell className="mr-2 text-blue-500" /> Notification Preferences
            </h2>
            <div className="space-y-3">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${key}Notif`}
                    name={key}
                    checked={value}
                    onChange={handleNotificationChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`${key}Notif`} className="text-gray-700 capitalize">
                    Receive {key} notifications
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <Save className="mr-2" /> Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;

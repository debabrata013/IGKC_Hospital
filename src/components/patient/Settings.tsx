import React, { useState, useEffect } from 'react';
import { User, Lock, Bell } from 'lucide-react';

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
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    email: '',
    phone: '',
    notifications: {
      email: true,
      sms: false,
      appointments: true
    }
  });

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setSettings({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        notifications: {
          email: true,
          sms: false,
          appointments: true
        }
      });
    }, 1000);
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated API call
    console.log('Settings updated:', settings);
    // You would typically send this data to your backend here
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2" /> Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Lock className="mr-2" /> Password
          </h2>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Change Password
          </button>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Bell className="mr-2" /> Notification Preferences
          </h2>
          <div className="space-y-2">
            <div>
              <input
                type="checkbox"
                id="emailNotif"
                name="email"
                checked={settings.notifications.email}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              <label htmlFor="emailNotif">Receive email notifications</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="smsNotif"
                name="sms"
                checked={settings.notifications.sms}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              <label htmlFor="smsNotif">Receive SMS notifications</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="appointmentNotif"
                name="appointments"
                checked={settings.notifications.appointments}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              <label htmlFor="appointmentNotif">Receive appointment reminders</label>
            </div>
          </div>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;


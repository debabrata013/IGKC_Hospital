import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-xl mb-4">Hello, {user?.email}</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <ul className="space-y-2">
          <li>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Manage Appointments
            </button>
          </li>
          <li>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
              View Patient Records
            </button>
          </li>
          <li>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300">
              Schedule Telemedicine
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;


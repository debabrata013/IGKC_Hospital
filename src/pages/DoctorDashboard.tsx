import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { RootState } from '../store';
import DashboardOverview from '../components/doctor/DashboardOverview';
import AppointmentsPage from '../components/doctor/AppointmentsPage';
import PatientManagementPage from '../components/doctor/PatientManagementPage';
import ReportsPage from '../components/doctor/ReportsPage';
import MessagingPage from '../components/doctor/MessagingPage';
import ScheduleManagementPage from '../components/doctor/ScheduleManagementPage';
import BillingPage from '../components/doctor/BillingPage';
import SettingsPage from '../components/doctor/SettingsPage';

const DoctorDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Dr. {user?.email}</h2>
        </div>
        <nav className="mt-6">
          <Link
            to="/doctor-dashboard"
            className={`flex items-center px-4 py-2 ${
              location.pathname === '/doctor-dashboard' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/doctor-dashboard/appointments"
            className={`flex items-center px-4 py-2 ${
              location.pathname === '/doctor-dashboard/appointments' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Appointments
          </Link>
          <Link
            to="/doctor-dashboard/patients"
            className={`flex items-center px-4 py-2 ${
              location.pathname === '/doctor-dashboard/patients' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Patient Management
          </Link>
          <Link
            to="/doctor-dashboard/reports"
            className={`flex items-center px-4 py-2 ${
              location.pathname === '/doctor-dashboard/reports' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Reports
          </Link>
          <Link
            to="/doctor-dashboard/messaging"
            className={`flex items-center px-4 py-2 ${
              location.pathname === '/doctor-dashboard/messaging' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Messaging
          </Link>
          <Link
            to="/doctor-dashboard/schedule"
            className={`flex items-center px-4 py-2 ${
              location.pathname === '/doctor-dashboard/schedule' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Schedule
          </Link>
          <Link
            to="/doctor-dashboard/billing"
            className={`flex items-center px-4 py-2 ${
              location.pathname === '/doctor-dashboard/billing' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Billing
          </Link>
          <Link
            to="/doctor-dashboard/settings"
            className={`flex items-center px-4 py-2 ${
              location.pathname === '/doctor-dashboard/settings' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/patients" element={<PatientManagementPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/messaging" element={<MessagingPage />} />
            <Route path="/schedule" element={<ScheduleManagementPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;


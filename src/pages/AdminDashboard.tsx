// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store';
// import UserManagement from '../components/admin/UserManagement';
// import DoctorManagement from '../components/admin/DoctorManagement';
// import BedMonitoring from '../components/admin/BedMonitoring';
// import PatientMonitoring from '../components/admin/PatientMonitoring';

// const AdminDashboard: React.FC = () => {
//   const { user } = useSelector((state: RootState) => state.auth);
//   const [activeTab, setActiveTab] = useState('users');

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
//       <p className="text-xl mb-4">Welcome, Admin {user?.email}</p>
//       <div className="mb-4">
//         <nav className="flex space-x-4">
//           <button
//             onClick={() => setActiveTab('users')}
//             className={`px-3 py-2 rounded-md ${
//               activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             User Management
//           </button>
//           <button
//             onClick={() => setActiveTab('doctors')}
//             className={`px-3 py-2 rounded-md ${
//               activeTab === 'doctors' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             Doctor Management
//           </button>
//           <button
//             onClick={() => setActiveTab('beds')}
//             className={`px-3 py-2 rounded-md ${
//               activeTab === 'beds' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             Bed Monitoring
//           </button>
//           <button
//             onClick={() => setActiveTab('patients')}
//             className={`px-3 py-2 rounded-md ${
//               activeTab === 'patients' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             Patient Monitoring
//           </button>
//         </nav>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         {activeTab === 'users' && <UserManagement />}
//         {activeTab === 'doctors' && <DoctorManagement />}
//         {activeTab === 'beds' && <BedMonitoring />}
//         {activeTab === 'patients' && <PatientMonitoring />}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  LayoutDashboard,
  Users,
  UserCog,
  Bed,
  Activity,
  ChevronLeft,
  ChevronRight,
  Calendar,
  DollarSign
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import UserManagement from '../components/admin/UserManagement';
import DoctorManagement from '../components/admin/DoctorManagement';
import BedMonitoring from '../components/admin/BedMonitoring';
import PatientMonitoring from '../components/admin/PatientMonitoring';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const AdminDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Sample data for charts
  const patientData = [
    { month: 'Jan', admitted: 65, discharged: 45 },
    { month: 'Feb', admitted: 75, discharged: 55 },
    { month: 'Mar', admitted: 85, discharged: 65 },
    { month: 'Apr', admitted: 70, discharged: 50 },
    { month: 'May', admitted: 90, discharged: 70 },
    { month: 'Jun', admitted: 95, discharged: 75 }
  ];

  const bedUtilization = [
    { name: 'Occupied', value: 75 },
    { name: 'Available', value: 25 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 }
  ];

  const menuItems: MenuItem[] = [
    { id: 'dashboard', title: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'users', title: 'User Management', icon: <Users size={20} /> },
    { id: 'doctors', title: 'Doctor Management', icon: <UserCog size={20} /> },
    { id: 'beds', title: 'Bed Monitoring', icon: <Bed size={20} /> },
    { id: 'patients', title: 'Patient Monitoring', icon: <Activity size={20} /> }
  ];

  const DashboardContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Stats Cards */}
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Users className="w-8 h-8" />
            <span className="text-2xl font-bold">1,234</span>
          </div>
          <p className="mt-2">Total Patients</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <UserCog className="w-8 h-8" />
            <span className="text-2xl font-bold">45</span>
          </div>
          <p className="mt-2">Active Doctors</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Bed className="w-8 h-8" />
            <span className="text-2xl font-bold">85%</span>
          </div>
          <p className="mt-2">Bed Occupancy</p>
        </div>
        <div className="bg-orange-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Calendar className="w-8 h-8" />
            <span className="text-2xl font-bold">156</span>
          </div>
          <p className="mt-2">Appointments</p>
        </div>
      </div>

      {/* Patient Trends Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Patient Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patientData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="admitted" stroke="#3b82f6" />
            <Line type="monotone" dataKey="discharged" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bed Utilization Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Bed Utilization</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={bedUtilization}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#3b82f6"
              dataKey="value"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Chart */}
      <div className="col-span-2 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" fill="#3b82f6" stroke="#2563eb" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 flex justify-between items-center">
          {!isSidebarCollapsed && <h2 className="font-bold text-xl">IGKC</h2>}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-4 ${
                activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              } ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}
            >
              {item.icon}
              {!isSidebarCollapsed && <span>{item.title}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.email}</p>
        </div>

        {/* Content based on active tab */}
        <div className="bg-white rounded-lg shadow-md">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'doctors' && <DoctorManagement />}
          {activeTab === 'beds' && <BedMonitoring />}
          {activeTab === 'patients' && <PatientMonitoring />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

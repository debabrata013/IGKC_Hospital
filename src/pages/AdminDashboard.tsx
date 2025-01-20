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
  ResponsiveContainer,
  Cell
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

  // Updated color scheme
  const colors = {
    blue: '#4F46E5',
    pink: '#EC4899',
    green: '#10B981',
    yellow: '#F59E0B',
    darkGray: '#f0f0f0'
  };

  const patientData = [
    { month: 'Jan', admitted: 65, discharged: 45 },
    { month: 'Feb', admitted: 75, discharged: 55 },
    { month: 'Mar', admitted: 85, discharged: 65 },
    { month: 'Apr', admitted: 70, discharged: 50 },
    { month: 'May', admitted: 90, discharged: 70 },
    { month: 'Jun', admitted: 95, discharged: 75 }
  ];

  const bedUtilization = [
    { name: 'Occupied', value: 75, color: colors.blue },
    { name: 'Available', value: 25, color: colors.pink }
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Stats Cards */}
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <Users className="w-10 h-10" />
            <span className="text-3xl font-bold">1,234</span>
          </div>
          <p className="mt-3 text-indigo-100">Total Patients</p>
        </div>
        <div className="bg-gradient-to-br from-pink-600 to-pink-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <UserCog className="w-10 h-10" />
            <span className="text-3xl font-bold">45</span>
          </div>
          <p className="mt-3 text-pink-100">Active Doctors</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <Bed className="w-10 h-10" />
            <span className="text-3xl font-bold">85%</span>
          </div>
          <p className="mt-3 text-green-100">Bed Occupancy</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <Calendar className="w-10 h-10" />
            <span className="text-3xl font-bold">156</span>
          </div>
          <p className="mt-3 text-yellow-50">Appointments</p>
        </div>
      </div>

      {/* Patient Trends Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Patient Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patientData} style={{ backgroundColor: colors.darkGray }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: colors.darkGray, borderColor: '#4B5563' }} />
            <Legend />
            <Line type="monotone" dataKey="admitted" stroke={colors.blue} strokeWidth={2} />
            <Line type="monotone" dataKey="discharged" stroke={colors.pink} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bed Utilization Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Bed Utilization</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart style={{ backgroundColor: colors.darkGray }}>
            <Pie
              data={bedUtilization}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {bedUtilization.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: colors.darkGray, borderColor: '#4B5563' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Chart */}
      <div className="col-span-2 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Revenue Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData} style={{ backgroundColor: colors.darkGray }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: colors.darkGray, borderColor: '#4B5563' }} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              fill={colors.green} 
              stroke={colors.yellow}
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white shadow-xl transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          {!isSidebarCollapsed && <h2 className="font-bold text-2xl text-gray-800">IGKC</h2>}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-4 transition-colors ${
                activeTab === item.id ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : 'text-gray-600 hover:bg-gray-50'
              } ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}
            >
              {item.icon}
              {!isSidebarCollapsed && <span className="font-medium">{item.title}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.email}</p>
        </div>

        {/* Content based on active tab */}
        <div>
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
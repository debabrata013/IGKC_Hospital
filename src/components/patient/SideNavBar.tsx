import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, FileText, Pill, CreditCard, MessageSquare, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: Home, path: '/patient-dashboard' },
  { name: 'Appointments', icon: Calendar, path: '/patient-dashboard/appointments' },
  { name: 'Medical Records', icon: FileText, path: '/patient-dashboard/medical-records' },
  { name: 'Prescriptions', icon: Pill, path: '/patient-dashboard/prescriptions' },
  { name: 'Billing & Payments', icon: CreditCard, path: '/patient-dashboard/billing' },
  { name: 'Messages', icon: MessageSquare, path: '/patient-dashboard/messages' },
  { name: 'Settings', icon: Settings, path: '/patient-dashboard/settings' },
];

const SideNavBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`bg-gray-800 text-white h-screen ${isExpanded ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="p-4 flex justify-between items-center">
        <h2 className={`font-bold ${isExpanded ? 'block' : 'hidden'}`}>Patient Portal</h2>
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-700">
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <ul className="space-y-2 mt-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center p-4 hover:bg-gray-700 ${
                location.pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              <item.icon size={24} className="mr-4" />
              <span className={isExpanded ? 'block' : 'hidden'}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0  p-4">
        <Link to="/logout" className="flex items-center p-4 hover:bg-gray-700">
          <LogOut size={24} className="mr-4" />
          <span className={isExpanded ? 'block' : 'hidden'}>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default SideNavBar;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideNavBar from '../components/patient/SideNavBar';
import DashboardHome from '../components/patient/DashboardHome';
import Appointments from '../components/patient/Appointments';
import MedicalRecords from '../components/patient/MedicalRecords';
import Prescriptions from '../components/patient/Prescriptions';
import Billing from '../components/patient/Billing';
import Messages from '../components/patient/Messages';
import Settings from '../components/patient/Settings';
import Telemedicine from '../components/patient/Telemedicine';

const PatientDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavBar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="" element={<DashboardHome />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="billing" element={<Billing />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
            <Route path="telemedicine" element={<Telemedicine />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;

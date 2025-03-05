// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutPage from './components/About';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Patientmedicalrecord from "./components/patient/Messages";
import Chat from "./components/patient/chatbot";
import ForgotPassword from './pages/Forgetpassword';
import ServicesPage from './components/home/service';
import ContactPage from './components/home/contactus';
import Careers from './components/home/careers';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<Careers />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Unprotected routes (for testing purposes) */}
            <Route path="/ad" element={<AdminDashboard />} />
            <Route path="/dd" element={<DoctorDashboard />} />
            <Route path="/pd" element={<PatientDashboard />} />
            <Route path="/pdmr" element={<Patientmedicalrecord />} />
            <Route path="/chat" element={<Chat />} />

            {/* Protected Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;

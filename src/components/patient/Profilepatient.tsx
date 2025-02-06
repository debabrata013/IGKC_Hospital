import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Edit2,
  HeartPulse,
  FileText,
  Calendar,
  Shield,
  AlertTriangle,
} from 'lucide-react';

interface Appointment {
  date: string;
  department: string;
  status: string;
}

interface Profile {
  name: string;
  age: number;
  gender: string;
  address: string;
  email: string;
  phone: string;
  emergencyContact: string;
  insurance: string;
  medicalHistory: string;
  appointments: Appointment[];
}

const PatientProfile: React.FC = () => {
  // State to toggle profile editing
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Patient profile state with necessary fields
  const [profile, setProfile] = useState<Profile>({
    name: 'Jane Doe',
    age: 34,
    gender: 'Female',
    address: '123 Main St, Springfield, USA',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    emergencyContact: 'John Doe - +1 (555) 987-6543',
    insurance: 'IGKC Health Insurance',
    medicalHistory: 'Diabetes, Hypertension, Allergies',
    appointments: [
      { date: '2025-01-15', department: 'Cardiology', status: 'Completed' },
      { date: '2025-02-10', department: 'Endocrinology', status: 'Scheduled' },
    ],
  });

  // Handle changes for input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // For age, convert to number if needed
    setProfile((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  // Save changes and exit edit mode
  const handleSave = (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Ideally, submit profile data to a backend API here.
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <HeartPulse className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-gray-800">IGKC Hospital</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Profile Cover & Main Info */}
      <section className="relative">
        {/* Cover Photo */}
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: "url('https://source.unsplash.com/random/1200x300?hospital')" }}
        ></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-6 relative -mt-16 flex flex-col md:flex-row">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src="https://source.unsplash.com/random/300x300?face"
                alt="Patient"
                className="object-cover w-full h-full"
              />
              <button
                onClick={() => alert('Implement profile image change')}
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transform translate-x-1/4 translate-y-1/4"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
            {/* Profile Details */}
            <div className="mt-4 md:mt-0 md:ml-6 flex-1">
              <div className="flex justify-between items-center">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                )}
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                  </button>
                )}
              </div>
              <div className="mt-2 text-gray-600">
                {isEditing ? (
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      name="age"
                      value={profile.age}
                      onChange={handleChange}
                      className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-16"
                    />
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                      className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                ) : (
                  <p>
                    Age: <span className="font-medium">{profile.age}</span> | Gender:{' '}
                    <span className="font-medium">{profile.gender}</span>
                  </p>
                )}
              </div>
              <p className="text-gray-600 mt-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    className="text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  />
                ) : (
                  <span>
                    <MapPin className="inline h-4 w-4 mr-1 text-gray-500" />
                    {profile.address}
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-gray-800">{profile.email}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span className="text-gray-800">{profile.phone}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm text-gray-500">Emergency Contact</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="emergencyContact"
                    value={profile.emergencyContact}
                    onChange={handleChange}
                    className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <span className="text-gray-800">{profile.emergencyContact}</span>
                )}
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm text-gray-500">Insurance</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="insurance"
                    value={profile.insurance}
                    onChange={handleChange}
                    className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <span className="text-gray-800">{profile.insurance}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          {/* Medical History */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical History</h3>
            {isEditing ? (
              <textarea
                name="medicalHistory"
                value={profile.medicalHistory}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              ></textarea>
            ) : (
              <p className="text-gray-600">{profile.medicalHistory}</p>
            )}
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-blue-500 hover:underline">
                  <Calendar className="h-5 w-5 mr-2" /> Upcoming Appointments
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-500 hover:underline">
                  <FileText className="h-5 w-5 mr-2" /> Medical Reports
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-500 hover:underline">
                  <Shield className="h-5 w-5 mr-2" /> Insurance Details
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Right Main Content */}
        <section className="md:col-span-2 space-y-6">
          {/* Appointment History */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment History</h3>
            <div className="space-y-4">
              {profile.appointments.map((appointment, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h4 className="font-medium text-gray-700">{appointment.department}</h4>
                    <p className="text-sm text-gray-500">Date: {appointment.date}</p>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      appointment.status === 'Completed' ? 'text-green-500' : 'text-blue-500'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Notifications</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    Your appointment with <span className="font-medium">Endocrinology</span> is scheduled on{' '}
                    <span className="font-medium">2025-02-10</span>.
                  </p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    New lab results available. Please check your{' '}
                    <span className="font-medium">Medical Reports</span>.
                  </p>
                  <p className="text-sm text-gray-500">3 days ago</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow py-4 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          &copy; {new Date().getFullYear()} IGKC Hospital. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PatientProfile;

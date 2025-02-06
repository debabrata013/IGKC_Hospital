import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Edit2,
  Stethoscope,
  Calendar,
  FileText,
  Award,
  AlertTriangle,
} from 'lucide-react';

interface DoctorProfileData {
  name: string;
  specialization: string;
  experience: number; // in years
  location: string;
  email: string;
  phone: string;
  consultationTimings: string;
  qualifications: string;
  biography: string;
  awards: string[];
  appointments: {
    date: string;
    patientName: string;
    status: string;
  }[];
}

const DoctorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [profile, setProfile] = useState<DoctorProfileData>({
    name: 'Dr. Emily Carter',
    specialization: 'Cardiology',
    experience: 12,
    location: 'IGKC Hospital, Cardiology Department, New York, USA',
    email: 'emily.carter@igkchospital.com',
    phone: '+1 (555) 321-9876',
    consultationTimings: 'Mon-Fri, 9 AM - 5 PM',
    qualifications: 'MD, PhD in Cardiology',
    biography:
      'Dr. Emily Carter is a board-certified cardiologist with over 12 years of experience in treating cardiovascular diseases. She is dedicated to providing compassionate care and leading research in innovative treatments.',
    awards: [
      'Best Cardiologist 2023',
      'Excellence in Medical Research 2022',
      'Top Doctor Award 2021',
    ],
    appointments: [
      { date: '2025-02-15', patientName: 'John Smith', status: 'Completed' },
      { date: '2025-02-20', patientName: 'Alice Johnson', status: 'Scheduled' },
      { date: '2025-02-22', patientName: 'Robert Lee', status: 'Scheduled' },
    ],
  });

  // Handle changes for input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === 'experience' ? Number(value) : value,
    }));
  };

  // Save changes and exit edit mode
  const handleSave = (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    // Optionally, save the updated profile to your backend here.
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Stethoscope className="h-8 w-8 text-green-600" />
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
                src="https://source.unsplash.com/random/300x300?doctor"
                alt="Doctor"
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <input
                      type="text"
                      name="specialization"
                      value={profile.specialization}
                      onChange={handleChange}
                      className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      placeholder="Specialization"
                    />
                    <input
                      type="number"
                      name="experience"
                      value={profile.experience}
                      onChange={handleChange}
                      className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-20"
                      placeholder="Experience"
                    />
                    <span className="text-sm text-gray-500">years of experience</span>
                  </div>
                ) : (
                  <p>
                    <span className="font-medium">{profile.specialization}</span> |{' '}
                    <span className="font-medium">{profile.experience} years</span> of experience
                  </p>
                )}
              </div>
              <p className="text-gray-600 mt-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    className="text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  />
                ) : (
                  <span>
                    <MapPin className="inline h-4 w-4 mr-1 text-gray-500" />
                    {profile.location}
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
                <label className="text-sm text-gray-500">Consultation Timings</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="consultationTimings"
                    value={profile.consultationTimings}
                    onChange={handleChange}
                    className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <span className="text-gray-800">{profile.consultationTimings}</span>
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
          {/* Biography */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Biography</h3>
            {isEditing ? (
              <textarea
                name="biography"
                value={profile.biography}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              ></textarea>
            ) : (
              <p className="text-gray-600">{profile.biography}</p>
            )}
          </div>
          {/* Qualifications & Awards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Qualifications & Awards</h3>
            <div className="mb-4">
              <label className="text-sm text-gray-500">Qualifications</label>
              {isEditing ? (
                <input
                  type="text"
                  name="qualifications"
                  value={profile.qualifications}
                  onChange={handleChange}
                  className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                />
              ) : (
                <p className="text-gray-800">{profile.qualifications}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-500">Awards</label>
              {isEditing ? (
                <textarea
                  name="awards"
                  value={profile.awards.join('\n')}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      awards: e.target.value.split('\n'),
                    }))
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                ></textarea>
              ) : (
                <ul className="list-disc pl-5 text-gray-800">
                  {profile.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* Quick Links */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-blue-500 hover:underline">
                  <Calendar className="h-5 w-5 mr-2" /> My Schedule
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-500 hover:underline">
                  <FileText className="h-5 w-5 mr-2" /> Patient Reports
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-500 hover:underline">
                  <Award className="h-5 w-5 mr-2" /> Achievements
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
                    <h4 className="font-medium text-gray-700">{appointment.patientName}</h4>
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
                    A new appointment has been scheduled with <span className="font-medium">Patient John Doe</span> on{' '}
                    <span className="font-medium">2025-02-25</span>.
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    New lab report received for <span className="font-medium">Patient Alice Brown</span>.
                  </p>
                  <p className="text-sm text-gray-500">5 hours ago</p>
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

export default DoctorProfile;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Doctor {
//   id: number;
//   name: string;
//   email: string;
//   specialization: string;
// }

// const DoctorManagement: React.FC = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [newDoctor, setNewDoctor] = useState({ name: '', email: '', specialization: '' });
//   const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get('https://api.example.com/doctors');
//       setDoctors(response.data);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   const handleCreateDoctor = async () => {
//     try {
//       await axios.post('https://api.example.com/doctors', newDoctor);
//       setNewDoctor({ name: '', email: '', specialization: '' });
//       fetchDoctors();
//     } catch (error) {
//       console.error('Error creating doctor:', error);
//     }
//   };

//   const handleUpdateDoctor = async () => {
//     if (!editingDoctor) return;
//     try {
//       await axios.put(`https://api.example.com/doctors/${editingDoctor.id}`, editingDoctor);
//       setEditingDoctor(null);
//       fetchDoctors();
//     } catch (error) {
//       console.error('Error updating doctor:', error);
//     }
//   };

//   const handleDeleteDoctor = async (id: number) => {
//     try {
//       await axios.delete(`https://api.example.com/doctors/${id}`);
//       fetchDoctors();
//     } catch (error) {
//       console.error('Error deleting doctor:', error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Doctor Management</h2>
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold mb-2">Add Doctor</h3>
//         <input
//           type="text"
//           placeholder="Name"
//           value={newDoctor.name}
//           onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newDoctor.email}
//           onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <input
//           type="text"
//           placeholder="Specialization"
//           value={newDoctor.specialization}
//           onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <button onClick={handleCreateDoctor} className="bg-green-500 text-white px-4 py-2 rounded">
//           Add
//         </button>
//       </div>
//       <table className="w-full">
//         <thead>
//           <tr>
//             <th className="text-left">Name</th>
//             <th className="text-left">Email</th>
//             <th className="text-left">Specialization</th>
//             <th className="text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.map((doctor) => (
//             <tr key={doctor.id}>
//               <td>{doctor.name}</td>
//               <td>{doctor.email}</td>
//               <td>{doctor.specialization}</td>
//               <td>
//                 <button
//                   onClick={() => setEditingDoctor(doctor)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteDoctor(doctor.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {editingDoctor && (
//         <div className="mt-4">
//           <h3 className="text-xl font-semibold mb-2">Edit Doctor</h3>
//           <input
//             type="text"
//             value={editingDoctor.name}
//             onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="email"
//             value={editingDoctor.email}
//             onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="text"
//             value={editingDoctor.specialization}
//             onChange={(e) => setEditingDoctor({ ...editingDoctor, specialization: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <button onClick={handleUpdateDoctor} className="bg-yellow-500 text-white px-4 py-2 rounded">
//             Update
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorManagement;

import React, { useState } from 'react';

const DoctorManagement = () => {
  // Mock initial data
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. John Smith', email: 'john.smith@hospital.com', specialization: 'Cardiology' },
    { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah.j@hospital.com', specialization: 'Pediatrics' },
  ]);
  const [newDoctor, setNewDoctor] = useState({ name: '', email: '', specialization: '' });
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate form inputs
  const validateForm = (doctor) => {
    const errors = {};
    if (!doctor.name.trim()) errors.name = 'Name is required';
    if (!doctor.email.trim()) errors.email = 'Email is required';
    else if (!isValidEmail(doctor.email)) errors.email = 'Invalid email format';
    if (!doctor.specialization.trim()) errors.specialization = 'Specialization is required';
    return errors;
  };

  // Create new doctor
  const handleCreateDoctor = () => {
    const errors = validateForm(newDoctor);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    const newDoctorEntry = {
      id: Date.now(),
      ...newDoctor
    };
    
    setDoctors([...doctors, newDoctorEntry]);
    setNewDoctor({ name: '', email: '', specialization: '' });
    setValidationErrors({});
  };

  // Update existing doctor
  const handleUpdateDoctor = () => {
    if (!editingDoctor) return;
    
    const errors = validateForm(editingDoctor);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setDoctors(doctors.map(doctor => 
      doctor.id === editingDoctor.id ? editingDoctor : doctor
    ));
    setEditingDoctor(null);
    setIsEditing(false);
    setValidationErrors({});
  };

  // Delete doctor
  const handleDeleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor Management System</h2>
        
        {/* Add New Doctor Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Doctor</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Doctor Name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Specialization"
                value={newDoctor.specialization}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.specialization ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.specialization && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.specialization}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleCreateDoctor}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Doctor
          </button>
        </div>

        {/* Doctors Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Specialization</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{doctor.name}</td>
                  <td className="px-6 py-4">{doctor.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {doctor.specialization}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setEditingDoctor(doctor);
                        setIsEditing(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isEditing && editingDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Edit Doctor Details</h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={editingDoctor.name}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      validationErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doctor Name"
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    value={editingDoctor.email}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      validationErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Email Address"
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={editingDoctor.specialization}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, specialization: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      validationErrors.specialization ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Specialization"
                  />
                  {validationErrors.specialization && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.specialization}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setEditingDoctor(null);
                      setIsEditing(false);
                      setValidationErrors({});
                    }}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateDoctor}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorManagement;


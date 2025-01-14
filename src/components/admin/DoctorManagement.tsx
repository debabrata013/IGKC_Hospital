import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Doctor {
  id: number;
  name: string;
  email: string;
  specialization: string;
}

const DoctorManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [newDoctor, setNewDoctor] = useState({ name: '', email: '', specialization: '' });
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('https://api.example.com/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleCreateDoctor = async () => {
    try {
      await axios.post('https://api.example.com/doctors', newDoctor);
      setNewDoctor({ name: '', email: '', specialization: '' });
      fetchDoctors();
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  const handleUpdateDoctor = async () => {
    if (!editingDoctor) return;
    try {
      await axios.put(`https://api.example.com/doctors/${editingDoctor.id}`, editingDoctor);
      setEditingDoctor(null);
      fetchDoctors();
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    try {
      await axios.delete(`https://api.example.com/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Doctor Management</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Add Doctor</h3>
        <input
          type="text"
          placeholder="Name"
          value={newDoctor.name}
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newDoctor.email}
          onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleCreateDoctor} className="bg-green-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Specialization</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.specialization}</td>
              <td>
                <button
                  onClick={() => setEditingDoctor(doctor)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDoctor(doctor.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingDoctor && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Edit Doctor</h3>
          <input
            type="text"
            value={editingDoctor.name}
            onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="email"
            value={editingDoctor.email}
            onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            value={editingDoctor.specialization}
            onChange={(e) => setEditingDoctor({ ...editingDoctor, specialization: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={handleUpdateDoctor} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;


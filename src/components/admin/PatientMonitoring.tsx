import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  admissionDate: string;
  status: string;
}

const PatientMonitoring: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '', diagnosis: '', admissionDate: '', status: 'Admitted' });
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://api.example.com/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleCreatePatient = async () => {
    try {
      await axios.post('https://api.example.com/patients', { ...newPatient, age: parseInt(newPatient.age) });
      setNewPatient({ name: '', age: '', gender: '', diagnosis: '', admissionDate: '', status: 'Admitted' });
      fetchPatients();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleUpdatePatient = async () => {
    if (!editingPatient) return;
    try {
      await axios.put(`https://api.example.com/patients/${editingPatient.id}`, editingPatient);
      setEditingPatient(null);
      fetchPatients();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleDeletePatient = async (id: number) => {
    try {
      await axios.delete(`https://api.example.com/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Patient Monitoring</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Add Patient</h3>
        <input
          type="text"
          placeholder="Name"
          value={newPatient.name}
          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Age"
          value={newPatient.age}
          onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
          className="border p-2 mr-2"
        />
        <select
          value={newPatient.gender}
          onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Diagnosis"
          value={newPatient.diagnosis}
          onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          placeholder="Admission Date"
          value={newPatient.admissionDate}
          onChange={(e) => setNewPatient({ ...newPatient, admissionDate: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleCreatePatient} className="bg-green-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Age</th>
            <th className="text-left">Gender</th>
            <th className="text-left">Diagnosis</th>
            <th className="text-left">Admission Date</th>
            <th className="text-left">Status</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.diagnosis}</td>
              <td>{patient.admissionDate}</td>
              <td>{patient.status}</td>
              <td>
                <button
                  onClick={() => setEditingPatient(patient)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePatient(patient.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingPatient && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Edit Patient</h3>
          <input
            type="text"
            value={editingPatient.name}
            onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            value={editingPatient.age}
            onChange={(e) => setEditingPatient({ ...editingPatient, age: parseInt(e.target.value) })}
            className="border p-2 mr-2"
          />
          <select
            value={editingPatient.gender}
            onChange={(e) => setEditingPatient({ ...editingPatient, gender: e.target.value })}
            className="border p-2 mr-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            value={editingPatient.diagnosis}
            onChange={(e) => setEditingPatient({ ...editingPatient, diagnosis: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="date"
            value={editingPatient.admissionDate}
            onChange={(e) => setEditingPatient({ ...editingPatient, admissionDate: e.target.value })}
            className="border p-2 mr-2"
          />
          <select
            value={editingPatient.status}
            onChange={(e) => setEditingPatient({ ...editingPatient, status: e.target.value })}
            className="border p-2 mr-2"
          >
            <option value="Admitted">Admitted</option>
            <option value="Discharged">Discharged</option>
            <option value="Critical">Critical</option>
          </select>
          <button onClick={handleUpdatePatient} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientMonitoring;


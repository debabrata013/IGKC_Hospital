import React, { useState } from 'react';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
}

const PatientManagementPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'John Doe', age: 35, gender: 'Male', lastVisit: '2025-01-10' },
    { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', lastVisit: '2025-01-12' },
    { id: 3, name: 'Alice Johnson', age: 42, gender: 'Female', lastVisit: '2025-01-14' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Patient Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Gender</th>
              <th className="py-3 px-6 text-left">Last Visit</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredPatients.map(patient => (
              <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{patient.name}</td>
                <td className="py-3 px-6 text-left">{patient.age}</td>
                <td className="py-3 px-6 text-left">{patient.gender}</td>
                <td className="py-3 px-6 text-left">{patient.lastVisit}</td>
                <td className="py-3 px-6 text-left">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-xs">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagementPage;


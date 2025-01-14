import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Bed {
  id: number;
  roomNumber: string;
  bedNumber: string;
  isOccupied: boolean;
  patientName?: string;
}

const BedMonitoring: React.FC = () => {
  const [beds, setBeds] = useState<Bed[]>([]);
  const [newBed, setNewBed] = useState({ roomNumber: '', bedNumber: '' });
  const [editingBed, setEditingBed] = useState<Bed | null>(null);

  useEffect(() => {
    fetchBeds();
    const interval = setInterval(fetchBeds, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchBeds = async () => {
    try {
      const response = await axios.get('https://api.example.com/beds');
      setBeds(response.data);
    } catch (error) {
      console.error('Error fetching beds:', error);
    }
  };

  const handleCreateBed = async () => {
    try {
      await axios.post('https://api.example.com/beds', newBed);
      setNewBed({ roomNumber: '', bedNumber: '' });
      fetchBeds();
    } catch (error) {
      console.error('Error creating bed:', error);
    }
  };

  const handleUpdateBed = async () => {
    if (!editingBed) return;
    try {
      await axios.put(`https://api.example.com/beds/${editingBed.id}`, editingBed);
      setEditingBed(null);
      fetchBeds();
    } catch (error) {
      console.error('Error updating bed:', error);
    }
  };

  const handleDeleteBed = async (id: number) => {
    try {
      await axios.delete(`https://api.example.com/beds/${id}`);
      fetchBeds();
    } catch (error) {
      console.error('Error deleting bed:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Bed Monitoring</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Add Bed</h3>
        <input
          type="text"
          placeholder="Room Number"
          value={newBed.roomNumber}
          onChange={(e) => setNewBed({ ...newBed, roomNumber: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Bed Number"
          value={newBed.bedNumber}
          onChange={(e) => setNewBed({ ...newBed, bedNumber: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleCreateBed} className="bg-green-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Room Number</th>
            <th className="text-left">Bed Number</th>
            <th className="text-left">Status</th>
            <th className="text-left">Patient Name</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {beds.map((bed) => (
            <tr key={bed.id}>
              <td>{bed.roomNumber}</td>
              <td>{bed.bedNumber}</td>
              <td>{bed.isOccupied ? 'Occupied' : 'Available'}</td>
              <td>{bed.patientName || '-'}</td>
              <td>
                <button
                  onClick={() => setEditingBed(bed)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBed(bed.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingBed && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Edit Bed</h3>
          <input
            type="text"
            value={editingBed.roomNumber}
            onChange={(e) => setEditingBed({ ...editingBed, roomNumber: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            value={editingBed.bedNumber}
            onChange={(e) => setEditingBed({ ...editingBed, bedNumber: e.target.value })}
            className="border p-2 mr-2"
          />
          <select
            value={editingBed.isOccupied ? 'occupied' : 'available'}
            onChange={(e) => setEditingBed({ ...editingBed, isOccupied: e.target.value === 'occupied' })}
            className="border p-2 mr-2"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
          <input
            type="text"
            value={editingBed.patientName || ''}
            onChange={(e) => setEditingBed({ ...editingBed, patientName: e.target.value })}
            placeholder="Patient Name"
            className="border p-2 mr-2"
          />
          <button onClick={handleUpdateBed} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default BedMonitoring;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Bed {
//   id: number;
//   roomNumber: string;
//   bedNumber: string;
//   isOccupied: boolean;
//   patientName?: string;
// }

// const BedMonitoring: React.FC = () => {
//   const [beds, setBeds] = useState<Bed[]>([]);
//   const [newBed, setNewBed] = useState({ roomNumber: '', bedNumber: '' });
//   const [editingBed, setEditingBed] = useState<Bed | null>(null);

//   useEffect(() => {
//     fetchBeds();
//     const interval = setInterval(fetchBeds, 30000); // Refresh every 30 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const fetchBeds = async () => {
//     try {
//       const response = await axios.get('https://api.example.com/beds');
//       setBeds(response.data);
//     } catch (error) {
//       console.error('Error fetching beds:', error);
//     }
//   };

//   const handleCreateBed = async () => {
//     try {
//       await axios.post('https://api.example.com/beds', newBed);
//       setNewBed({ roomNumber: '', bedNumber: '' });
//       fetchBeds();
//     } catch (error) {
//       console.error('Error creating bed:', error);
//     }
//   };

//   const handleUpdateBed = async () => {
//     if (!editingBed) return;
//     try {
//       await axios.put(`https://api.example.com/beds/${editingBed.id}`, editingBed);
//       setEditingBed(null);
//       fetchBeds();
//     } catch (error) {
//       console.error('Error updating bed:', error);
//     }
//   };

//   const handleDeleteBed = async (id: number) => {
//     try {
//       await axios.delete(`https://api.example.com/beds/${id}`);
//       fetchBeds();
//     } catch (error) {
//       console.error('Error deleting bed:', error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Bed Monitoring</h2>
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold mb-2">Add Bed</h3>
//         <input
//           type="text"
//           placeholder="Room Number"
//           value={newBed.roomNumber}
//           onChange={(e) => setNewBed({ ...newBed, roomNumber: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <input
//           type="text"
//           placeholder="Bed Number"
//           value={newBed.bedNumber}
//           onChange={(e) => setNewBed({ ...newBed, bedNumber: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <button onClick={handleCreateBed} className="bg-green-500 text-white px-4 py-2 rounded">
//           Add
//         </button>
//       </div>
//       <table className="w-full">
//         <thead>
//           <tr>
//             <th className="text-left">Room Number</th>
//             <th className="text-left">Bed Number</th>
//             <th className="text-left">Status</th>
//             <th className="text-left">Patient Name</th>
//             <th className="text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {beds.map((bed) => (
//             <tr key={bed.id}>
//               <td>{bed.roomNumber}</td>
//               <td>{bed.bedNumber}</td>
//               <td>{bed.isOccupied ? 'Occupied' : 'Available'}</td>
//               <td>{bed.patientName || '-'}</td>
//               <td>
//                 <button
//                   onClick={() => setEditingBed(bed)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteBed(bed.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {editingBed && (
//         <div className="mt-4">
//           <h3 className="text-xl font-semibold mb-2">Edit Bed</h3>
//           <input
//             type="text"
//             value={editingBed.roomNumber}
//             onChange={(e) => setEditingBed({ ...editingBed, roomNumber: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="text"
//             value={editingBed.bedNumber}
//             onChange={(e) => setEditingBed({ ...editingBed, bedNumber: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <select
//             value={editingBed.isOccupied ? 'occupied' : 'available'}
//             onChange={(e) => setEditingBed({ ...editingBed, isOccupied: e.target.value === 'occupied' })}
//             className="border p-2 mr-2"
//           >
//             <option value="available">Available</option>
//             <option value="occupied">Occupied</option>
//           </select>
//           <input
//             type="text"
//             value={editingBed.patientName || ''}
//             onChange={(e) => setEditingBed({ ...editingBed, patientName: e.target.value })}
//             placeholder="Patient Name"
//             className="border p-2 mr-2"
//           />
//           <button onClick={handleUpdateBed} className="bg-yellow-500 text-white px-4 py-2 rounded">
//             Update
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BedMonitoring;

import React, { useState } from 'react';

const BedMonitoring = () => {
  // Mock data - in real app this would come from API
  const [beds, setBeds] = useState([
    { id: 1, roomNumber: '101', bedNumber: 'A', isOccupied: false, patientName: '' },
    { id: 2, roomNumber: '101', bedNumber: 'B', isOccupied: true, patientName: 'John Doe' },
  ]);
  const [newBed, setNewBed] = useState({ roomNumber: '', bedNumber: '' });
  const [editingBed, setEditingBed] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Create new bed
  const handleCreateBed = () => {
    if (!newBed.roomNumber || !newBed.bedNumber) return;
    
    const newBedEntry = {
      id: Date.now(),
      ...newBed,
      isOccupied: false,
      patientName: ''
    };
    
    setBeds([...beds, newBedEntry]);
    setNewBed({ roomNumber: '', bedNumber: '' });
  };

  // Update existing bed
  const handleUpdateBed = () => {
    if (!editingBed) return;
    
    setBeds(beds.map(bed => 
      bed.id === editingBed.id ? editingBed : bed
    ));
    setEditingBed(null);
    setIsEditing(false);
  };

  // Delete bed
  const handleDeleteBed = (id) => {
    setBeds(beds.filter(bed => bed.id !== id));
  };

  // Start editing
  const startEditing = (bed) => {
    setEditingBed(bed);
    setIsEditing(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Bed Monitoring System</h2>
        
        {/* Add New Bed Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Bed</h3>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Room Number"
              value={newBed.roomNumber}
              onChange={(e) => setNewBed({ ...newBed, roomNumber: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Bed Number"
              value={newBed.bedNumber}
              onChange={(e) => setNewBed({ ...newBed, bedNumber: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateBed}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Bed
            </button>
          </div>
        </div>

        {/* Beds Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Room</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Bed</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Patient</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {beds.map((bed) => (
                <tr key={bed.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{bed.roomNumber}</td>
                  <td className="px-6 py-4">{bed.bedNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      bed.isOccupied 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {bed.isOccupied ? 'Occupied' : 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{bed.patientName || '-'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => startEditing(bed)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBed(bed.id)}
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
        {isEditing && editingBed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Edit Bed Details</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingBed.roomNumber}
                  onChange={(e) => setEditingBed({ ...editingBed, roomNumber: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Room Number"
                />
                <input
                  type="text"
                  value={editingBed.bedNumber}
                  onChange={(e) => setEditingBed({ ...editingBed, bedNumber: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Bed Number"
                />
                <select
                  value={editingBed.isOccupied ? 'occupied' : 'available'}
                  onChange={(e) => setEditingBed({ 
                    ...editingBed, 
                    isOccupied: e.target.value === 'occupied',
                    patientName: e.target.value === 'available' ? '' : editingBed.patientName
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                </select>
                {editingBed.isOccupied && (
                  <input
                    type="text"
                    value={editingBed.patientName || ''}
                    onChange={(e) => setEditingBed({ ...editingBed, patientName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Patient Name"
                  />
                )}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setEditingBed(null);
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateBed}
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

export default BedMonitoring;
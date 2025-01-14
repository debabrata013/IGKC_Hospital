import React, { useState } from 'react';

interface TimeSlot {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const ScheduleManagementPage: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: 1, day: 'Monday', startTime: '09:00', endTime: '12:00', isAvailable: true },
    { id: 2, day: 'Monday', startTime: '13:00', endTime: '17:00', isAvailable: true },
    { id: 3, day: 'Tuesday', startTime: '09:00', endTime: '12:00', isAvailable: true },
    { id: 4, day: 'Tuesday', startTime: '13:00', endTime: '17:00', isAvailable: false },
    { id: 5, day: 'Wednesday', startTime: '09:00', endTime: '12:00', isAvailable: true },
    { id: 6, day: 'Wednesday', startTime: '13:00', endTime: '17:00', isAvailable: true },
  ]);

  const [newTimeSlot, setNewTimeSlot] = useState({
    day: '',
    startTime: '',
    endTime: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTimeSlot({ ...newTimeSlot, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: TimeSlot = {
      id: timeSlots.length + 1,
      ...newTimeSlot,
      isAvailable: true,
    };
    setTimeSlots([...timeSlots, newSlot]);
    setNewTimeSlot({ day: '', startTime: '', endTime: '' });
  };

  const toggleAvailability = (id: number) => {
    setTimeSlots(timeSlots.map(slot =>
      slot.id === id ? { ...slot, isAvailable: !slot.isAvailable } : slot
    ));
  };

  const deleteTimeSlot = (id: number) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Schedule Management</h1>

      {/* Add New Time Slot */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Time Slot</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label htmlFor="day" className="block text-sm font-medium text-gray-700">Day</label>
            <select
              id="day"
              name="day"
              value={newTimeSlot.day}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={newTimeSlot.startTime}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={newTimeSlot.endTime}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Time Slot
            </button>
          </div>
        </form>
      </div>

      {/* Time Slots Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.map((slot) => (
              <tr key={slot.id}>
                <td className="px-6 py-4 whitespace-nowrap">{slot.day}</td>
                <td className="px-6 py-4 whitespace-nowrap">{slot.startTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{slot.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    slot.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {slot.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => toggleAvailability(slot.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Toggle Availability
                  </button>
                  <button
                    onClick={() => deleteTimeSlot(slot.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
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

export default ScheduleManagementPage;


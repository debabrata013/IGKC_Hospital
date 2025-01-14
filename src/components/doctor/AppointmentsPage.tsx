import React, { useState } from 'react';

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'canceled';
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: 'John Doe', date: '2025-01-15', time: '10:00 AM', status: 'scheduled' },
    { id: 2, patientName: 'Jane Smith', date: '2025-01-15', time: '11:30 AM', status: 'scheduled' },
    { id: 3, patientName: 'Alice Johnson', date: '2025-01-16', time: '2:00 PM', status: 'scheduled' },
  ]);

  const handleStatusChange = (id: number, newStatus: 'scheduled' | 'completed' | 'canceled') => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Appointments</h1>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Patient Name</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Time</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {appointments.map(appointment => (
              <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{appointment.patientName}</td>
                <td className="py-3 px-6 text-left">{appointment.date}</td>
                <td className="py-3 px-6 text-left">{appointment.time}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs ${
                    appointment.status === 'scheduled' ? 'bg-yellow-200 text-yellow-600' :
                    appointment.status === 'completed' ? 'bg-green-200 text-green-600' :
                    'bg-red-200 text-red-600'
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <select 
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.id, e.target.value as 'scheduled' | 'completed' | 'canceled')}
                    className="border rounded px-2 py-1"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;


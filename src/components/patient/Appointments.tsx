import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Clock, User } from 'lucide-react';
import { getAppointments } from '../../store/slices/patientSlice';
import { AppDispatch, RootState } from '../../store';
import { createAppointment } from '../../services/api';
import { useForm } from 'react-hook-form';

interface AppointmentFormData {
  doctor: string;
  date: string;
  time: string;
  reason: string;
}

const Appointments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { appointments, loading, error } = useSelector((state: RootState) => state.patient);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AppointmentFormData>();

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      await createAppointment(data);
      dispatch(getAppointments());
      reset();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          {appointments.map(appointment => (
            <div key={appointment.id} className="mb-4 p-4 border rounded">
              <p className="font-semibold">{appointment.doctor}</p>
              <p className="flex items-center"><Calendar className="mr-2" size={16} /> {appointment.date}</p>
              <p className="flex items-center"><Clock className="mr-2" size={16} /> {appointment.time}</p>
              <p className="flex items-center"><User className="mr-2" size={16} /> {appointment.reason}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Schedule New Appointment</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2">Doctor</label>
              <input
                {...register("doctor", { required: "Doctor is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.doctor && <span className="text-red-500">{errors.doctor.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Date</label>
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.date && <span className="text-red-500">{errors.date.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Time</label>
              <input
                type="time"
                {...register("time", { required: "Time is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.time && <span className="text-red-500">{errors.time.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Reason</label>
              <input
                {...register("reason", { required: "Reason is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.reason && <span className="text-red-500">{errors.reason.message}</span>}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Schedule Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointments;


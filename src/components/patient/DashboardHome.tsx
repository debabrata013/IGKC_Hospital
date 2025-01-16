import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Pill, Activity, Weight, Droplet } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useNotifications } from '../../contexts/NotificationContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardHome: React.FC = () => {
  const [healthData, setHealthData] = useState<{
    bloodPressure: number[];
    weight: number[];
    bloodSugar: number[];
  }>({
    bloodPressure: [],
    weight: [],
    bloodSugar: [],
  });
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setHealthData({
        bloodPressure: [120, 118, 122, 119, 123, 121, 120],
        weight: [70, 70.5, 71, 70.8, 70.2, 70.5, 70.3],
        bloodSugar: [95, 100, 92, 98, 103, 97, 99],
      });
      addNotification('Your health data has been updated', 'info');
    }, 1000);
  }, [addNotification]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const bloodPressureData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Blood Pressure (Systolic)',
        data: healthData.bloodPressure,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const weightData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: healthData.weight,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const bloodSugarData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Blood Sugar (mg/dL)',
        data: healthData.bloodSugar,
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Welcome, John Doe</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2" /> Upcoming Appointments
          </h2>
          <ul className="space-y-2">
            <li>Dr. Smith - General Checkup (Tomorrow, 10:00 AM)</li>
            <li>Dr. Johnson - Dental Cleaning (Next Week, 2:00 PM)</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Pill className="mr-2" /> Current Prescriptions
          </h2>
          <ul className="space-y-2">
            <li>Lisinopril - 10mg daily</li>
            <li>Metformin - 500mg twice daily</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2" /> Recent Test Results
          </h2>
          <ul className="space-y-2">
            <li>Blood Work (2 days ago) - Normal</li>
            <li>X-Ray Results (1 week ago) - Pending</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2" /> Blood Pressure Trends
          </h2>
          <div className="h-64">
            <Line data={bloodPressureData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Weight className="mr-2" /> Weight Tracking
          </h2>
          <div className="h-64">
            <Line data={weightData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Droplet className="mr-2" /> Blood Sugar Levels
          </h2>
          <div className="h-64">
            <Line data={bloodSugarData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;


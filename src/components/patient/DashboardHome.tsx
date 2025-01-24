// import React, { useState, useEffect } from 'react';
// import { Calendar, FileText, Pill, Activity, Weight, Droplet } from 'lucide-react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// // import { useNotifications } from '../../contexts/NotificationContext';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const DashboardHome: React.FC = () => {
//   const [healthData, setHealthData] = useState<{
//     bloodPressure: number[];
//     weight: number[];
//     bloodSugar: number[];
//   }>({
//     bloodPressure: [],
//     weight: [],
//     bloodSugar: [],
//   });
//   // const { addNotification } = useNotifications();

//   // useEffect(() => {
//   //   // Simulated API call
//   //   setTimeout(() => {
//   //     setHealthData({
//   //       bloodPressure: [120, 118, 122, 119, 123, 121, 120],
//   //       weight: [70, 70.5, 71, 70.8, 70.2, 70.5, 70.3],
//   //       bloodSugar: [95, 100, 92, 98, 103, 97, 99],
//   //     });
//   //     // addNotification('Your health data has been updated', 'info');
//   //   }, 1000);
//   // }, [addNotification]);

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   const bloodPressureData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Blood Pressure (Systolic)',
//         data: healthData.bloodPressure,
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }
//     ]
//   };

//   const weightData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Weight (kg)',
//         data: healthData.weight,
//         fill: false,
//         borderColor: 'rgb(255, 99, 132)',
//         tension: 0.1
//       }
//     ]
//   };

//   const bloodSugarData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Blood Sugar (mg/dL)',
//         data: healthData.bloodSugar,
//         fill: false,
//         borderColor: 'rgb(54, 162, 235)',
//         tension: 0.1
//       }
//     ]
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Welcome, John Doe</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             <Calendar className="mr-2" /> Upcoming Appointments
//           </h2>
//           <ul className="space-y-2">
//             <li>Dr. Smith - General Checkup (Tomorrow, 10:00 AM)</li>
//             <li>Dr. Johnson - Dental Cleaning (Next Week, 2:00 PM)</li>
//           </ul>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             <Pill className="mr-2" /> Current Prescriptions
//           </h2>
//           <ul className="space-y-2">
//             <li>Lisinopril - 10mg daily</li>
//             <li>Metformin - 500mg twice daily</li>
//           </ul>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             <FileText className="mr-2" /> Recent Test Results
//           </h2>
//           <ul className="space-y-2">
//             <li>Blood Work (2 days ago) - Normal</li>
//             <li>X-Ray Results (1 week ago) - Pending</li>
//           </ul>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             <Activity className="mr-2" /> Blood Pressure Trends
//           </h2>
//           <div className="h-64">
//             <Line data={bloodPressureData} options={chartOptions} />
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             <Weight className="mr-2" /> Weight Tracking
//           </h2>
//           <div className="h-64">
//             <Line data={weightData} options={chartOptions} />
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             <Droplet className="mr-2" /> Blood Sugar Levels
//           </h2>
//           <div className="h-64">
//             <Line data={bloodSugarData} options={chartOptions} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;


import React, { useState,useEffect } from 'react';
import { Calendar, FileText, Pill, Activity, Weight, Droplet, Lightbulb } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DashboardHome: React.FC = () => {
  // Color scheme
  const colors = {
    blue: '#4F46E5',
    pink: '#EC4899',
    green: '#10B981',
    yellow: '#F59E0B',
    darkGray: '#f0f0f0'
  };

  const healthData = {
    bloodPressure: [
      { day: 'Mon', value: 120 },
      { day: 'Tue', value: 118 },
      { day: 'Wed', value: 122 },
      { day: 'Thu', value: 119 },
      { day: 'Fri', value: 123 },
      { day: 'Sat', value: 121 },
      { day: 'Sun', value: 120 }
    ],
    weight: [
      { day: 'Mon', value: 70 },
      { day: 'Tue', value: 70.5 },
      { day: 'Wed', value: 71 },
      { day: 'Thu', value: 70.8 },
      { day: 'Fri', value: 70.2 },
      { day: 'Sat', value: 70.5 },
      { day: 'Sun', value: 70.3 }
    ],
    bloodSugar: [
      { day: 'Mon', value: 95 },
      { day: 'Tue', value: 100 },
      { day: 'Wed', value: 92 },
      { day: 'Thu', value: 98 },
      { day: 'Fri', value: 103 },
      { day: 'Sat', value: 97 },
      { day: 'Sun', value: 99 }
    ]
  };

  const chartProps = {
    style: { backgroundColor: colors.darkGray },
    className: "rounded-lg"
  };
  const allHealthTips = [
    {
      category: "Diet",
      tips: [
        "Incorporate a variety of colorful fruits and vegetables into every meal to ensure a wide range of nutrients.",
        "Opt for lean protein sources such as fish, skinless poultry, tofu, and legumes to support muscle health.",
        "Drink at least 8-10 glasses of water daily to stay hydrated, and consider infusing your water with lemon or cucumber for flavor.",
        "Choose whole grains like quinoa, brown rice, and oats instead of refined grains for sustained energy and better digestion."
      ]
    },
    {
      category: "Exercise",
      tips: [
        "Engage in at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, as recommended by health guidelines.",
        "Incorporate a mix of cardio exercises (like jogging or cycling) and strength training (using weights or resistance bands) for balanced fitness.",
        "Take 5-10 minute walking breaks every hour if you have a sedentary job to improve circulation and posture.",
        "Practice yoga or pilates weekly to enhance flexibility, core strength, and stress reduction."
      ]
    },
    {
      category: "Sleep",
      tips: [
        "Stick to a consistent sleep schedule by going to bed and waking up at the same time every day, even on weekends.",
        "Create a calming bedtime routine that may include reading, taking a warm bath, or listening to soothing music.",
        "Aim for 7-9 hours of uninterrupted sleep each night to allow your body and mind to fully recover.",
        "Limit screen time and exposure to blue light at least one hour before bed to improve sleep quality."
      ]
    },
    {
      category: "Mental Health",
      tips: [
        "Practice mindfulness or meditation for 10-15 minutes daily to reduce stress and improve focus.",
        "Incorporate regular breaks into your workday to recharge and maintain productivity.",
        "Build and nurture strong connections with friends and family by scheduling regular catch-ups or shared activities.",
        "Set achievable goals for yourself and celebrate small victories to maintain motivation and a positive outlook."
      ]
    },
    {
      category: "Lifestyle",
      tips: [
        "Schedule routine health check-ups, including dental and vision care, to catch potential issues early.",
        "Maintain good posture throughout the day, especially when working at a desk, by sitting with your back straight and feet flat on the floor.",
        "Dedicate time to hobbies and activities that bring you joy to promote overall well-being.",
        "Strive for a balanced work-life schedule by setting boundaries, taking breaks, and prioritizing self-care."
      ]
    }
  ];

  // Function to get random tips
  const getRandomTips = () => {
    const tips = [];
    const categories = [...allHealthTips];
    
    while (tips.length < 6 && categories.length > 0) {
      const randomCategoryIndex = Math.floor(Math.random() * categories.length);
      const category = categories[randomCategoryIndex];
      
      const randomTipIndex = Math.floor(Math.random() * category.tips.length);
      tips.push({
        category: category.category,
        tip: category.tips[randomTipIndex]
      });
      
      // Remove used tip
      category.tips.splice(randomTipIndex, 1);
      if (category.tips.length === 0) {
        categories.splice(randomCategoryIndex, 1);
      }
    }
    
    return tips;
  };

  const [healthTips, setHealthTips] = useState([]);

  useEffect(() => {
    return setHealthTips(getRandomTips());
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome, Debabrata</h1>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Upcoming Appointments</h2>
              <Calendar className="w-6 h-6 text-blue-100" />
            </div>
            <ul className="space-y-3">
              <li className="bg-blue-500/30 p-3 rounded-lg">
                <p className="font-semibold">Dr. Smith - General Checkup</p>
                <p className="text-sm text-blue-100">Tomorrow, 10:00 AM</p>
              </li>
              <li className="bg-blue-500/30 p-3 rounded-lg">
                <p className="font-semibold">Dr. Johnson - Dental Cleaning</p>
                <p className="text-sm text-blue-100">Next Week, 2:00 PM</p>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Current Prescriptions</h2>
              <Pill className="w-6 h-6 text-pink-100" />
            </div>
            <ul className="space-y-3">
              <li className="bg-pink-500/30 p-3 rounded-lg">
                <p className="font-semibold">Lisinopril</p>
                <p className="text-sm text-pink-100">10mg daily</p>
              </li>
              <li className="bg-pink-500/30 p-3 rounded-lg">
                <p className="font-semibold">Metformin</p>
                <p className="text-sm text-pink-100">500mg twice daily</p>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Recent Test Results</h2>
              <FileText className="w-6 h-6 text-green-100" />
            </div>
            <ul className="space-y-3">
              <li className="bg-green-500/30 p-3 rounded-lg">
                <p className="font-semibold">Blood Work</p>
                <p className="text-sm text-green-100">2 days ago - Normal</p>
              </li>
              <li className="bg-green-500/30 p-3 rounded-lg">
                <p className="font-semibold">X-Ray Results</p>
                <p className="text-sm text-green-100">1 week ago - Pending</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Blood Pressure</h2>
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData.bloodPressure} {...chartProps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: colors.darkGray, borderColor: '#4B5563' }} />
                  <Line type="monotone" dataKey="value" stroke={colors.blue} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Weight Tracking</h2>
              <Weight className="w-6 h-6 text-pink-600" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData.weight} {...chartProps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: colors.darkGray, borderColor: '#4B5563' }} />
                  <Line type="monotone" dataKey="value" stroke={colors.pink} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Blood Sugar</h2>
              <Droplet className="w-6 h-6 text-green-600" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData.bloodSugar} {...chartProps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: colors.darkGray, borderColor: '#4B5563' }} />
                  <Line type="monotone" dataKey="value" stroke={colors.green} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
            Daily Health Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthTips.map((tip, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {tip.category}
                </h3>
                <p className="text-gray-600">
                  {tip.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { DollarSign, CreditCard } from 'lucide-react';
// import { getBills } from '../../store/slices/patientSlice';
// import { AppDispatch, RootState } from '../../store';
// import { payBill } from '../../services/api';

// const Billing: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { bills, loading, error } = useSelector((state: RootState) => state.patient);

//   useEffect(() => {
//     dispatch(getBills());
//   }, [dispatch]);

//   const handlePayment = async (id: number) => {
//     try {
//       await payBill(id);
//       // dispatch(getBills());
//     } catch (error) {
//       console.error('Error processing payment:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const totalDue = bills.reduce((sum, bill) => bill.status === 'pending' ? sum + bill.amount : sum, 0);

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Billing & Payments</h1>
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">Total Due</h2>
//         <p className="text-3xl font-bold text-red-600">
//           ${totalDue.toFixed(2)}
//           </p>
//       </div>
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {bills.map(bill => (
//               <tr key={bill.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{bill.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{bill.description}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">${bill.amount.toFixed(2)}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     bill.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {bill.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {bill.status === 'pending' && (
//                     <button
//                       onClick={() => handlePayment(bill.id)}
//                       className="text-blue-600 hover:text-blue-900 flex items-center"
//                     >
//                       <CreditCard size={20} className="mr-1" />
//                       Pay Now
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Billing;


// {'\u20B9'}
import React, { useState } from 'react';
import { DollarSign, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

const DEMO_BILLS = [
  {
    id: 1,
    date: '2024-01-15',
    description: 'Annual Physical Examination',
    amount: 250.00,
    status: 'pending'
  },
  {
    id: 2,
    date: '2024-02-01',
    description: 'Laboratory Tests',
    amount: 150.75,
    status: 'pending'
  },
  {
    id: 3,
    date: '2024-01-10',
    description: 'X-Ray Imaging',
    amount: 350.50,
    status: 'paid'
  },
  {
    id: 4,
    date: '2024-02-20',
    description: 'Prescription Medication',
    amount: 85.25,
    status: 'pending'
  }
];

const Billing: React.FC = () => {
  const [bills, setBills] = useState(DEMO_BILLS);
  const [selectedBill, setSelectedBill] = useState<number | null>(null);

  const handlePayment = (id: number) => {
    setBills(bills.map(bill => 
      bill.id === id ? { ...bill, status: 'paid' } : bill
    ));
    setSelectedBill(null);
  };

  const totalDue = bills
    .filter(bill => bill.status === 'pending')
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
          {/* <DollarSign size={32} className="mr-4 text-blue-600" /> */}
          {'\u20B9'}
          Billing & Payments
        </h1>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-blue-800">Total Due</h2>
            <p className="text-3xl font-bold text-red-600 flex items-center">
              {/* <DollarSign size={24} className="mr-2" /> */}
              {'\u20B9'}
              {totalDue.toFixed(2)}
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-green-800">Paid Bills</h2>
            <p className="text-2xl font-bold text-green-600">
              {bills.filter(bill => bill.status === 'paid').length}
            </p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-yellow-800">Pending Bills</h2>
            <p className="text-2xl font-bold text-yellow-600">
              {bills.filter(bill => bill.status === 'pending').length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bills.map(bill => (
                <tr 
                  key={bill.id} 
                  className={`${selectedBill === bill.id ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{bill.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{bill.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{'\u20B9'}{bill.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      bill.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bill.status === 'pending' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedBill(bill.id)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <CreditCard size={16} className="mr-1" />
                          Pay
                        </button>
                        {selectedBill === bill.id && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handlePayment(bill.id)}
                              className="bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center"
                            >
                              <CheckCircle2 size={14} className="mr-1" />
                              Confirm
                            </button>
                            <button
                              onClick={() => setSelectedBill(null)}
                              className="bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center"
                            >
                              <AlertCircle size={14} className="mr-1" />
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
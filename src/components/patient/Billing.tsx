import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DollarSign, CreditCard } from 'lucide-react';
import { getBills } from '../../store/slices/patientSlice';
import { AppDispatch, RootState } from '../../store';
import { payBill } from '../../services/api';

const Billing: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bills, loading, error } = useSelector((state: RootState) => state.patient);

  useEffect(() => {
    dispatch(getBills());
  }, [dispatch]);

  const handlePayment = async (id: number) => {
    try {
      await payBill(id);
      dispatch(getBills());
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalDue = bills.reduce((sum, bill) => bill.status === 'pending' ? sum + bill.amount : sum, 0);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Billing & Payments</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Total Due</h2>
        <p className="text-3xl font-bold text-red-600">${totalDue.toFixed(2)}</p>
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
          <tbody className="bg-white divide-y divide-gray-200">
            {bills.map(bill => (
              <tr key={bill.id}>
                <td className="px-6 py-4 whitespace-nowrap">{bill.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bill.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">${bill.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bill.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bill.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {bill.status === 'pending' && (
                    <button
                      onClick={() => handlePayment(bill.id)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <CreditCard size={20} className="mr-1" />
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pill, RefreshCw } from 'lucide-react';
import { getPrescriptions } from '../../store/slices/patientSlice';
import { AppDispatch, RootState } from '../../store';
import { requestPrescriptionRefill } from '../../services/api';

const Prescriptions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { prescriptions, loading, error } = useSelector((state: RootState) => state.patient);

  useEffect(() => {
    dispatch(getPrescriptions());
  }, [dispatch]);

  const handleRefillRequest = async (id: number) => {
    try {
      await requestPrescriptionRefill(id);
      dispatch(getPrescriptions());
    } catch (error) {
      console.error('Error requesting prescription refill:', error);
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
      <h1 className="text-3xl font-semibold mb-6">Prescriptions</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refills Left</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prescriptions.map(prescription => (
              <tr key={prescription.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Pill className="mr-2 text-blue-500" size={20} />
                    {prescription.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.dosage}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.frequency}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prescription.refillsLeft}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleRefillRequest(prescription.id)}
                    className="text-green-600 hover:text-green-900 flex items-center"
                    disabled={prescription.refillsLeft === 0}
                  >
                    <RefreshCw size={20} className="mr-1" />
                    Request Refill
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

export default Prescriptions;


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FileText, Download, Search, Upload } from 'lucide-react';
// import { getMedicalRecords, uploadDocument } from '../../store/slices/patientSlice';
// import { AppDispatch, RootState } from '../../store';
// import { useForm } from 'react-hook-form';

// interface DocumentUploadForm {
//   file: FileList;
//   description: string;
// }

// //
// const MedicalRecords: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { medicalRecords, loading, error } = useSelector((state: RootState) => state.patient);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const { register, handleSubmit, reset, formState: { errors } } = useForm<DocumentUploadForm>();

//   useEffect(() => {
//     dispatch(getMedicalRecords(currentPage));
//   }, [dispatch, currentPage]);

//   const filteredRecords = medicalRecords.items.filter(record =>
//     record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const onSubmit = async (data: DocumentUploadForm) => {
//     const formData = new FormData();
//     formData.append('file', data.file[0]);
//     formData.append('description', data.description);
//     try {
//       await dispatch(uploadDocument(formData));
//       reset();
//       dispatch(getMedicalRecords(currentPage));
//     } catch (error) {
//       console.error('Error uploading document:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Medical Records</h1>
//       <div className="mb-4 flex justify-between items-center">
//         <div className="relative w-64">
//           <input
//             type="text"
//             placeholder="Search records..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 pl-10 border rounded"
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
//           <input
//             type="file"
//             {...register('file', { required: 'File is required' })}
//             className="mr-2"
//           />
//           <input
//             type="text"
//             {...register('description', { required: 'Description is required' })}
//             placeholder="Document description"
//             className="mr-2 p-2 border rounded"
//           />
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//             <Upload size={20} className="mr-2 inline" />
//             Upload
//           </button>
//         </form>
//       </div>
//       {errors.file && <p className="text-red-500 mb-2">{errors.file.message}</p>}
//       {errors.description && <p className="text-red-500 mb-2">{errors.description.message}</p>}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredRecords.map(record => (
//               <tr key={record.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.type}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.doctor}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{record.description}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <button className="text-blue-600 hover:text-blue-900 mr-2" aria-label="View document">
//                     <FileText size={20} />
//                   </button>
//                   <button className="text-green-600 hover:text-green-900" aria-label="Download document">
//                     <Download size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4 flex justify-between">
//         <button
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
//         >
//           Previous
//         </button>
//         <span>Page {currentPage} of {medicalRecords.totalPages}</span>
//         <button
//           onClick={() => setCurrentPage(prev => Math.min(prev + 1, medicalRecords.totalPages))}
//           disabled={currentPage === medicalRecords.totalPages}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MedicalRecords;

import React, { useState } from 'react';
import { FileText, Download, Search, Upload, FileCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';

const MEDICAL_RECORDS = [
  {
    id: '1',
    date: '2023-05-15',
    type: 'Laboratory Test',
    doctor: 'Dr. Emily Chen',
    description: 'Annual Blood Work',
    fileUrl: '#'
  },
  {
    id: '2',
    date: '2023-02-20',
    type: 'X-Ray',
    doctor: 'Dr. Michael Rodriguez',
    description: 'Chest X-Ray',
    fileUrl: '#'
  },
  {
    id: '3',
    date: '2022-11-10',
    type: 'Consultation',
    doctor: 'Dr. Sarah Johnson',
    description: 'Wellness Check-up',
    fileUrl: '#'
  },
  {
    id: '4',
    date: '2023-08-05',
    type: 'Prescription',
    doctor: 'Dr. David Kim',
    description: 'Medication Review',
    fileUrl: '#'
  }
];

interface DocumentUploadForm {
  file: FileList;
  description: string;
}

const MedicalRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState(MEDICAL_RECORDS);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DocumentUploadForm>();

  const filteredRecords = records.filter(record =>
    record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: DocumentUploadForm) => {
    const newRecord = {
      id: (records.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
      type: 'User Upload',
      doctor: 'Custom Upload',
      description: data.description,
      fileUrl: URL.createObjectURL(data.file[0])
    };
    setRecords([...records, newRecord]);
    reset();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
          <FileText size={32} className="mr-4 text-blue-600" />
          Medical Records
        </h1>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-4">
            <input
              type="file"
              {...register('file', { required: 'File is required' })}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <input
              type="text"
              {...register('description', { required: 'Description is required' })}
              placeholder="Document description"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <button 
              type="submit" 
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <Upload size={20} className="mr-2" />
              Upload
            </button>
          </form>
        </div>

        {errors.file && <p className="text-red-500 mb-2 text-sm">{errors.file.message}</p>}
        {errors.description && <p className="text-red-500 mb-2 text-sm">{errors.description.message}</p>}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map(record => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 transition-colors" 
                        aria-label="View document"
                      >
                        <FileText size={20} />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-900 transition-colors" 
                        aria-label="Download document"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <FileCheck size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No records found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
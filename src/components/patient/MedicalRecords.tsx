import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileText, Download, Search, Upload } from 'lucide-react';
import { getMedicalRecords, uploadDocument } from '../../store/slices/patientSlice';
import { AppDispatch, RootState } from '../../store';
import { useForm } from 'react-hook-form';

interface DocumentUploadForm {
  file: FileList;
  description: string;
}

//
const MedicalRecords: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { medicalRecords, loading, error } = useSelector((state: RootState) => state.patient);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DocumentUploadForm>();

  useEffect(() => {
    dispatch(getMedicalRecords(currentPage));
  }, [dispatch, currentPage]);

  const filteredRecords = medicalRecords.items.filter(record =>
    record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data: DocumentUploadForm) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('description', data.description);
    try {
      await dispatch(uploadDocument(formData));
      reset();
      dispatch(getMedicalRecords(currentPage));
    } catch (error) {
      console.error('Error uploading document:', error);
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
      <h1 className="text-3xl font-semibold mb-6">Medical Records</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
          <input
            type="file"
            {...register('file', { required: 'File is required' })}
            className="mr-2"
          />
          <input
            type="text"
            {...register('description', { required: 'Description is required' })}
            placeholder="Document description"
            className="mr-2 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Upload size={20} className="mr-2 inline" />
            Upload
          </button>
        </form>
      </div>
      {errors.file && <p className="text-red-500 mb-2">{errors.file.message}</p>}
      {errors.description && <p className="text-red-500 mb-2">{errors.description.message}</p>}
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
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2" aria-label="View document">
                    <FileText size={20} />
                  </button>
                  <button className="text-green-600 hover:text-green-900" aria-label="Download document">
                    <Download size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {medicalRecords.totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, medicalRecords.totalPages))}
          disabled={currentPage === medicalRecords.totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MedicalRecords;


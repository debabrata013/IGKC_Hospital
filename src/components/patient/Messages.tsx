import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Send } from 'lucide-react';
import { getMessages } from '../../store/slices/patientSlice';
import { AppDispatch, RootState } from '../../store';
import { sendMessage } from '../../services/api';
import { useForm } from 'react-hook-form';

interface MessageFormData {
  content: string;
}

const Messages: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, error } = useSelector((state: RootState) => state.patient);
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<MessageFormData>();

  useEffect(() => {
    dispatch(getMessages(currentPage));
  }, [dispatch, currentPage]);

  const onSubmit = async (data: MessageFormData) => {
    try {
      await sendMessage(data);
      dispatch(getMessages(1));
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
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
      <h1 className="text-3xl font-semibold mb-6">Messages</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-96 overflow-y-auto mb-4">
          {messages.items.map(message => (
            <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <p className="font-semibold">{message.sender}</p>
                <p>{message.content}</p>
                <p className="text-xs text-gray-500">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex">
          <input
            {...register("content", { required: "Message is required" })}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
            <Send size={20} />
          </button>
        </form>
        {errors.content && <span className="text-red-500">{errors.content.message}</span>}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {messages.totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, messages.totalPages))}
          disabled={currentPage === messages.totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Messages;


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { MessageSquare, Send } from 'lucide-react';
// import { getMessages } from '../../store/slices/patientSlice';
// import { AppDispatch, RootState } from '../../store';
// import { sendMessage } from '../../services/api';
// import { useForm } from 'react-hook-form';

// interface MessageFormData {
//   content: string;
// }

// const Messages: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { messages, loading, error } = useSelector((state: RootState) => state.patient);
//   const [currentPage, setCurrentPage] = useState(1);
//   const { register, handleSubmit, reset, formState: { errors } } = useForm<MessageFormData>();

//   useEffect(() => {
//     dispatch(getMessages(currentPage));
//   }, [dispatch, currentPage]);

//   const onSubmit = async (data: MessageFormData) => {
//     try {
//       await sendMessage(data);
//       dispatch(getMessages(1));
//       reset();
//     } catch (error) {
//       console.error('Error sending message:', error);
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
//       <h1 className="text-3xl font-semibold mb-6">Messages</h1>
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="h-96 overflow-y-auto mb-4">
//           {messages.items.map(message => (
//             <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
//               <div className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-100' : 'bg-gray-100'}`}>
//                 <p className="font-semibold">{message.sender}</p>
//                 <p>{message.content}</p>
//                 <p className="text-xs text-gray-500">{message.timestamp}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)} className="flex">
//           <input
//             {...register("content", { required: "Message is required" })}
//             placeholder="Type your message..."
//             className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
//             <Send size={20} />
//           </button>
//         </form>
//         {errors.content && <span className="text-red-500">{errors.content.message}</span>}
//       </div>
//       <div className="mt-4 flex justify-between">
//         <button
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
//         >
//           Previous
//         </button>
//         <span>Page {currentPage} of {messages.totalPages}</span>
//         <button
//           onClick={() => setCurrentPage(prev => Math.min(prev + 1, messages.totalPages))}
//           disabled={currentPage === messages.totalPages}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Messages;

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X, Minimize2, MessageSquare } from 'lucide-react';

const DEMO_MESSAGES = [
  {
    id: 1,
    sender: 'Dr. Emily Chen',
    content: 'Your recent lab results look good. We\'ll discuss them in detail during your next appointment.',
    timestamp: '2024-02-15 10:30 AM',
    type: 'received'
  },
  {
    id: 2,
    sender: 'You',
    content: 'Thank you for the update. I have a few questions about my medication.',
    timestamp: '2024-02-15 10:35 AM',
    type: 'sent'
  },
  {
    id: 3,
    sender: 'Support Team',
    content: 'We\'ve processed your recent insurance claim. You should receive confirmation soon.',
    timestamp: '2024-02-14 03:45 PM',
    type: 'received'
  },
  {
    id: 4,
    sender: 'You',
    content: 'Can I schedule a follow-up appointment next week?',
    timestamp: '2024-02-14 04:00 PM',
    type: 'sent'
  }
];

const Messages: React.FC = () => {
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        type: 'sent'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare size={24} className="mr-3 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Dr. Emily Chen</h2>
        </div>
        <div className="flex space-x-3">
          <button className="text-gray-600 hover:text-gray-900">
            <Minimize2 size={24} />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[70%] p-4 rounded-lg 
              ${message.type === 'sent' 
                ? 'bg-blue-100 text-blue-900' 
                : 'bg-gray-200 text-gray-900'}
            `}>
              <div className="flex items-center mb-2">
                {message.type === 'sent' ? (
                  <User size={16} className="mr-2 text-blue-600" />
                ) : (
                  <Bot size={16} className="mr-2 text-gray-600" />
                )}
                <span className="font-semibold text-sm">{message.sender}</span>
              </div>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs text-gray-500 mt-1 text-right">{message.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <Send size={20} className="mr-2" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
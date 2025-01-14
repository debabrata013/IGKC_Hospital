import React, { useState } from 'react';

interface Message {
  id: number;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

const MessagingPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'John Doe', recipient: 'Dr. Smith', subject: 'Appointment Request', content: 'Hello Dr. Smith, I would like to schedule an appointment for next week.', date: '2025-01-15', read: false },
    { id: 2, sender: 'Nurse Johnson', recipient: 'Dr. Smith', subject: 'Patient Update', content: 'The lab results for patient Jane Doe are ready for your review.', date: '2025-01-14', read: true },
    { id: 3, sender: 'Admin', recipient: 'Dr. Smith', subject: 'Schedule Change', content: 'Your shift for next Monday has been changed. Please check the updated schedule.', date: '2025-01-13', read: false },
  ]);

  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: '',
  });

  const [filter, setFilter] = useState('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMessage({ ...newMessage, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessageEntry: Message = {
      id: messages.length + 1,
      sender: 'Dr. Smith',
      recipient: newMessage.recipient,
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString().split('T')[0],
      read: true,
    };
    setMessages([newMessageEntry, ...messages]);
    setNewMessage({ recipient: '', subject: '', content: '' });
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !message.read;
    return message.read;
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Messaging</h1>

      {/* Message Composer */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Compose New Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient</label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={newMessage.recipient}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={newMessage.subject}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="content"
              name="content"
              value={newMessage.content}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Send Message
          </button>
        </form>
      </div>

      {/* Message List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredMessages.map((message) => (
            <li key={message.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <p className="font-semibold">{message.sender}</p>
                <p className="text-sm text-gray-500">{message.date}</p>
              </div>
              <p className="text-sm font-medium">{message.subject}</p>
              <p className="text-sm text-gray-500 truncate">{message.content}</p>
              <div className="mt-2">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  message.read ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {message.read ? 'Read' : 'Unread'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessagingPage;


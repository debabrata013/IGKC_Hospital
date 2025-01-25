import React, { useState, useEffect, useRef, FormEvent } from 'react';
import axios from 'axios';
import { Send, HelpCircle, Bot, User, X, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp?: Date;
}

const FullScreenChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: 'Welcome to Hospital Support. How can I assist you with appointments or medical inquiries?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  const sendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: trimmedMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<{ message: string }>('/api/chat', { 
        message: trimmedMessage 
      });

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response.data.message,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: 'Service unavailable. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle between full screen and minimized
  const toggleScreenMode = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col bg-white transition-all duration-300 ${
        isFullScreen 
          ? 'w-full h-full' 
          : 'w-96 h-[600px] bottom-4 right-4 rounded-2xl shadow-2xl'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <HelpCircle className="w-7 h-7" />
          <h2 className="text-xl font-bold">Hospital Assistant</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleScreenMode} 
            className="hover:bg-blue-700 p-1.5 rounded-full transition-colors"
          >
            {isFullScreen ? <Minimize2 /> : <X />}
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className="flex-shrink-0">
              {msg.sender === 'user' ? (
                <User className="w-8 h-8 text-blue-600 bg-blue-100 p-1.5 rounded-full" />
              ) : (
                <Bot className="w-8 h-8 text-green-600 bg-green-100 p-1.5 rounded-full" />
              )}
            </div>
            <div 
              className={`p-3 rounded-2xl max-w-[80%] ${
                msg.sender === 'user' 
                  ? 'bg-blue-100 text-blue-800 rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none shadow-sm border'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="p-2 text-center text-gray-500 animate-pulse">
          Assistant is typing...
        </div>
      )}

      {/* Message Input */}
      <form 
        onSubmit={sendMessage} 
        className="p-4 border-t border-gray-200 bg-white flex items-center space-x-2"
      >
        <input 
          ref={inputRef}
          type="text" 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your medical query..."
          className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button 
          type="submit" 
          disabled={isLoading || !inputMessage.trim()}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default FullScreenChatbot;
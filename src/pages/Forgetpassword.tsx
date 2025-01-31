import React, { useState } from 'react';
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-md mx-4 bg-white p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
        <a 
          href="/login" 
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Login
        </a>

        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reset Your Password
          </h1>
        </div>

        {success ? (
          <div className="text-center p-6">
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Password Reset Email Sent</h2>
            <p className="text-gray-600">
              Check your inbox at <span className="font-medium text-blue-600">{email}</span> 
              for instructions to reset your password.
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 p-3 bg-red-50 rounded-lg flex items-center gap-2">
                <FaExclamationCircle className="text-red-500" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
                    placeholder="Enter your registered email"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Reset Link...
                  </span>
                ) : 'Send Reset Instructions'}
              </button>
            </form>
          </>
        )}

        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a 
            href="/signup" 
            className="text-purple-600 hover:text-purple-800 font-medium underline transition-colors duration-300"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
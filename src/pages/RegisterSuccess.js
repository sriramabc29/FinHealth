import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RegisterSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1b1f27] flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#2B2F3A] p-8 rounded-2xl max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-20 h-20 bg-[#2191FB] rounded-full mx-auto mb-6 flex items-center justify-center"
        >
          <svg 
            className="w-10 h-10 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Registration Successful!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 mb-8"
        >
          Your account has been created successfully. You can now log in to access your account.
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate('/login')}
          className="bg-[#2191FB] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#2191FB]/90 transition-all w-full"
        >
          Go to Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RegisterSuccess;
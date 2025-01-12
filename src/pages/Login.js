// src/pages/Login.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPinScreen, setShowPinScreen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };
  
  const pinBulletVariants = {
    inactive: { scale: 1, backgroundColor: '#2B2F3A' },
    active: { 
      scale: 1.2, 
      backgroundColor: '#2191FB',
      transition: { type: "spring", stiffness: 500 }
    }
  };
  
  const containerVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      scale: 0.95, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate initial credentials
      if (email && password) {
        setShowPinScreen(true);
        setIsLoading(false);
      }
    } catch (err) {
      setError('Invalid credentials');
      setIsLoading(false);
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password, pin);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError('Invalid PIN');
        setPin('');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinChange = (value) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1f27] flex items-center justify-center">
      <Link to="/" className="absolute top-10 left-10">
        <span className="text-2xl font-bold text-white">Finhealth</span>
      </Link>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-md px-8 py-6"
      >
      <AnimatePresence mode="wait">
        {!showPinScreen ? (
          <motion.div 
            key="credentials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md px-8 py-6"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-12 h-12 bg-[#2191FB] rounded-full mx-auto mb-4"
              />
              <h1 className="text-3xl font-bold text-white mb-2">Sign in</h1>
              <p className="text-gray-400">
                Welcome back to Finhealth
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleInitialSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#2B2F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2191FB]"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#2B2F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2191FB]"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#2191FB] text-white rounded-lg font-medium hover:bg-[#2191FB]/90 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Continue'}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="pin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md px-8 py-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Enter PIN</h1>
              <p className="text-gray-400">
                Please enter your 4-digit security PIN
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="flex justify-center space-x-4">
  {[...Array(4)].map((_, index) => (
    <motion.div
      key={index}
      variants={pinBulletVariants}
      animate={pin.length > index ? 'active' : 'inactive'}
      className="w-4 h-4 rounded-full"
      style={{ boxShadow: pin.length > index ? '0 0 10px #2191FB' : 'none' }}
    />
  ))}
</div>

              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="4"
                value={pin}
                onChange={(e) => handlePinChange(e.target.value)}
                className="w-full px-4 py-3 bg-[#2B2F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2191FB] text-center tracking-[1em] text-2xl"
                autoFocus
                required
              />

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPinScreen(false);
                    setPin('');
                  }}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={pin.length !== 4 || isLoading}
                  className="flex-1 py-3 bg-[#2191FB] text-white rounded-lg font-medium hover:bg-[#2191FB]/90 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Confirm'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
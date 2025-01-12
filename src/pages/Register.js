import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    pin: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pin') {
      // Only allow numbers and max 4 digits
      if (value === '' || (/^\d+$/.test(value) && value.length <= 4)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.pin) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.pin.length !== 4) {
      setError('PIN must be exactly 4 digits');
      return;
    }

    setIsLoading(true);
  try {
    const result = await register(formData.email, formData.password, formData.pin, formData.fullName);
    if (result.success) {
      navigate('/register-success'); // Navigate to success page instead of dashboard
    } else {
      setError(result.error || 'Registration failed');
    }
  } catch (err) {
    setError('Failed to create account');
  } finally {
    setIsLoading(false);
  }
};


  
  return (
    <div className="min-h-screen bg-[#1b1f27] flex items-center justify-center">
      <Link to="/" className="absolute top-10 left-10">
        <span className="text-2xl font-bold text-white">Finhealth</span>
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-8 py-6"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-12 h-12 bg-[#2191FB] rounded-full mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">
            Already have an account? <Link to="/login" className="text-[#2191FB] hover:underline">Sign in</Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-[#2B2F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2191FB]"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 bg-[#2B2F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2191FB]"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#2B2F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2191FB]"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 bg-[#2B2F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2191FB]"
            />
          </div>

          <div>
            <input
              type="password"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="Enter 4-digit Security PIN"
              maxLength="4"
              className="w-full px-4 py-3 bg-[#2B2F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2191FB]"
            />
            <p className="text-xs text-gray-400 mt-1">This PIN will be required during login</p>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-white text-[#1b1f27] rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-sm text-gray-400 text-center">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-[#2191FB] hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-[#2191FB] hover:underline">Privacy Policy</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
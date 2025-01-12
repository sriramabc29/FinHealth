import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';
import heroVideo from './assets/videos/your-hero.mp4';
import Grow from './pages/Grow';
import Learn from './pages/Learn';


// Feature cards data
const featureCards = [
  {
    title: "Your Financial Health, Simplified",
    content: "Get a personalized financial score based on your habits, income, and spending. Take control and track your growth over time!",
    icon: (
      <svg className="w-10 h-10 text-[#2191FB]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 17 L7 12 L12 17 M17 8 L22 3"/>
      </svg>
    )
  },
  {
    title: "Master Money Management",
    content: "Learn budgeting, saving, and investment hacks with interactive challenges and games. Make managing money fun and easy!",
    icon: (
      <svg className="w-10 h-10 text-[#2191FB]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    )
  },
  {
    title: "Set Goals, Achieve Big",
    content: "Plan your financial future by setting custom goals—be it a vacation, a car, or financial freedom—and watch your progress with visual tools.",
    icon: (
      <svg className="w-10 h-10 text-[#2191FB]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    )
  },
  {
    title: "Plan Every Penny",
    content: "Track your expenses effortlessly and create personalized budgets to stay on top of your finances. Let every rupee work for you!",
    icon: (
      <svg className="w-10 h-10 text-[#2191FB]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M12 5v14m-7-7h14"/>
        <circle cx="12" cy="12" r="9" strokeWidth={2}/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0-4V7"/>
      </svg>
    )
  },
  {
    title: "Step-By-Step Investments",
    content: "Get tailored investment advice and allocate your money across equity, mutual funds, and more. Your guide to building wealth, risk-free.",
    icon: (
      <svg className="w-10 h-10 text-[#2191FB]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth={2}/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a9 9 0 0 1 9 9"/>
      </svg>
    )
  },
  {
    title: "Prepare for the Unexpected",
    content: "Learn how to build an emergency fund and secure your future with ease. Start small and achieve peace of mind.",
    icon: (
      <svg className="w-10 h-10 text-[#2191FB]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01"/>
      </svg>
    )
  }
];

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

function App() {
  const [showSecondPage, setShowSecondPage] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1); // Add this line here

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight * 0.3) {
        setShowSecondPage(true);
      } else {
        setShowSecondPage(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add after your existing useState declarations
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = prev === featureCards.length - 1 ? 0 : prev + 1;
        return nextIndex;
      });
    }, 5000); // Changed to 5 seconds
  
    return () => clearInterval(interval);
  }, []);

  return (
    
    <Router>
    <div className="relative">
    <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/register-success" element={<RegisterSuccess />} />
  <Route path="/learn" element={
    <ProtectedRoute>
      <Learn />
    </ProtectedRoute>
  } 
/>
  <Route path="/grow" element={
    <ProtectedRoute>
      <Grow />
    </ProtectedRoute>
  } />
 
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
  <Route path="/" element={
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1b1f27]">
        <Navbar />
      </div>

      {/* Main Content Container */}
      <div className="pt-20">
        {/* First Page */}
        <div className="relative min-h-[150vh] bg-[#1b1f27]">
          {/* Hero Section */}
          <section className="min-h-screen">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-80px)]">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-left z-10 pl-20"
                >
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-7xl font-bold text-[#ECE5F0] mb-4"
                  >
                    Take Control of Your{' '}
                    <span className="text-[#2191FB] block mt-2">Money?</span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl text-[#ECE5F0]/70 mb-12"
                  >
                    Track, Invest, Grow your Money on Finhealth
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex space-x-4"
                  >
                    <button className="bg-[#2191FB] text-[#ECE5F0] px-8 py-3 rounded-lg font-medium hover:bg-[#2191FB]/90 transition-all">
                      Open FREE Demat Account
                    </button>
                    <button className="border border-[#ECE5F0]/20 text-[#ECE5F0] px-8 py-3 rounded-lg font-medium hover:border-[#2191FB] transition-all">
                      Learn More
                    </button>
                  </motion.div>
                </motion.div>

                {/* Right Video */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative flex items-center justify-center"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto max-w-xl xl:max-w-2xl mx-auto"
                  >
                    <source src={heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Spacer for scroll trigger */}
          <div className="h-[50vh]"></div>
        </div>
        {/* Second Page Content */}
        <AnimatePresence>
          {showSecondPage && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5
              }}
              className="fixed inset-0 bg-[#ECE5F0] z-40 overflow-y-auto"
            >
              {/* Main Content Container */}
              <div className="container mx-auto px-6 py-20">
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center max-w-5xl mx-auto pt-16"
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-[#1b1f27] mb-4">
                    All-in-one Place for Your Money
                  </h2>
                  <p className="text-lg text-[#1b1f27]/70 mb-16 max-w-3xl mx-auto">
                    Get real-time insights into your financial scenario, improve your financial score, 
                    and unlock interactive tools to make smarter money decisions.
                  </p>
                  {/* Interactive Card Carousel */}
                  <div className="relative mt-16">
                    <motion.div 
                      className="overflow-x-hidden px-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div
                        className="flex gap-8"
                        animate={{ x: `-${activeIndex * (320 + 32)}px` }}
                        transition={{ 
                          duration: 1, // Increased duration for smoother movement
                          ease: [0.32, 0.72, 0, 1] // Custom easing for more natural movement
                        }}
                      >
                        {featureCards.map((card, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className={`
                              min-w-[320px] p-8 rounded-2xl shadow-sm transition-colors duration-300
                              ${index === activeIndex ? 'bg-[#1b1f27] text-white' : 'bg-white'}
                            `}
                          >
                            <div className={`
                              w-16 h-16 mb-6 flex items-center justify-center rounded-xl
                              ${index === activeIndex ? 'bg-white/10' : 'bg-[#2191FB]/10'}
                            `}>
                              {/* Inline SVG instead of image */}
                              <div className={index === activeIndex ? 'text-white' : 'text-[#2191FB]'}>
                                {card.icon}
                              </div>
                            </div>
                            <h3 className={`text-2xl font-bold mb-3 ${
                              index === activeIndex ? 'text-white' : 'text-[#1b1f27]'
                            }`}>
                              {card.title}
                            </h3>
                            <p className={`${index === activeIndex ? 'text-white/70' : 'text-[#1b1f27]/70'}`}>
                              {card.content}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Carousel Indicators - Now clickable */}
                    <div className="flex justify-center mt-8 gap-2">
                      {featureCards.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={`h-2 rounded-full transition-all 
                            ${index === activeIndex ? 'w-8 bg-[#2191FB]' : 'w-2 bg-[#2191FB]/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-40 bg-[#1b1f27] p-12 rounded-2xl text-white relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#2191FB]/5 opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2191FB]/10 to-transparent" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-8">Why Choose Us?</h3>
            <p className="text-xl mb-12 text-white/90">Built for real people, by people who understand finances.</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Insights",
                  desc: "Get personalized financial recommendations"
                },
                {
                  title: "Interactive Learning",
                  desc: "Make financial education fun and engaging"
                },
                {
                  title: "Secure Planning",
                  desc: "Your financial future, protected and organized"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-[#2191FB]/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#2191FB]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-white/70">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>      
        {/* Interactive Calculator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-40 bg-white p-12 rounded-2xl shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#2191FB]/5 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#2191FB]/5 to-transparent rounded-full transform -translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold text-[#1b1f27] mb-6">
                Calculate Your Savings Potential
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[#1b1f27]/70 mb-2">Monthly Income</label>
                  <input
                    type="number"
                    placeholder="Enter your monthly income"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2191FB]"
                  />
                </div>
                <div>
                  <label className="block text-[#1b1f27]/70 mb-2">Monthly Expenses</label>
                  <input
                    type="number"
                    placeholder="Enter your monthly expenses"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2191FB]"
                  />
                </div>
                <button className="bg-[#2191FB] text-white px-8 py-4 rounded-xl hover:bg-[#2191FB]/90 transition-all">
                  Calculate Savings
                </button>
              </div>
            </div>
            
            <div className="hidden lg:block w-80 h-80">
              <svg className="w-full h-full text-[#2191FB]/20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </motion.div>
        {/* Trust Metrics Section */}
        <div className="mt-40 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-3xl font-bold text-[#1b1f27] mb-16"
          >
            Trusted by Thousands
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-5xl font-bold text-[#2191FB] mb-4">10,000+</div>
              <p className="text-[#1b1f27]/70 text-lg">Users improved their financial scores</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-5xl font-bold text-[#2191FB] mb-4">95%</div>
              <p className="text-[#1b1f27]/70 text-lg">Users feel more confident managing money</p>
            </motion.div>
          </div>
        </div>
        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-40 mb-20 text-center bg-[#1b1f27] p-16 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#2191FB]/5 opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2191FB]/10 to-transparent" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-6">
              Take the first step toward financial freedom today!
            </h3>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Join thousands of users who have already transformed their financial future.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[#2191FB] text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-[#2191FB]/90 transition-all"
            >
              Get Your Financial Score Now!
            </motion.button>
          </div>
        </motion.div>



                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  }
/>
     </Routes>
    </div>
    </Router>
  );
}

export default App;
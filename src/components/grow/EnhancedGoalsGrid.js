// src/components/grow/EnhancedGoalsGrid.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const calculateMonths = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    return Math.max(1, Math.ceil((target - today) / (1000 * 60 * 60 * 24 * 30)));
  };

  const GoalAdditionModal = ({ icons, onClose, onAdd }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      name: '',
      icon: '',
      targetAmount: '',
      targetDate: '',
      currentAmount: 0,
      investmentType: 'sip',
      sipAmount: '',
      lumpsumAmount: '',
      startDate: new Date().toISOString().split('T')[0],
      selectedInstruments: []
    });

    const renderInvestmentOptions = () => {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-[#ECE5F0] mb-2">Investment Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, investmentType: 'sip'})}
                  className={`p-4 rounded-lg text-center ${
                    formData.investmentType === 'sip' 
                      ? 'bg-[#2191FB] text-white' 
                      : 'bg-[#1b1f27] text-[#ECE5F0] hover:bg-[#2191FB]/10'
                  }`}
                >
                  <div className="font-medium">SIP</div>
                  <div className="text-sm opacity-70">Monthly Investment</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, investmentType: 'lumpsum'})}
                  className={`p-4 rounded-lg text-center ${
                    formData.investmentType === 'lumpsum' 
                      ? 'bg-[#2191FB] text-white' 
                      : 'bg-[#1b1f27] text-[#ECE5F0] hover:bg-[#2191FB]/10'
                  }`}
                >
                  <div className="font-medium">Lumpsum</div>
                  <div className="text-sm opacity-70">One-time Investment</div>
                </button>
              </div>
            </div>
    
            {formData.investmentType === 'sip' ? (
              <div>
                <label className="block text-[#ECE5F0] mb-2">Monthly SIP Amount</label>
                <input
                  type="number"
                  value={formData.sipAmount}
                  onChange={(e) => setFormData({...formData, sipAmount: e.target.value})}
                  className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                  placeholder="Enter monthly investment amount"
                />
                <p className="text-sm text-[#ECE5F0]/70 mt-1">
                  Recommended: £{Math.ceil(formData.targetAmount / calculateMonths(formData.targetDate))} /month
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-[#ECE5F0] mb-2">Lumpsum Amount</label>
                <input
                  type="number"
                  value={formData.lumpsumAmount}
                  onChange={(e) => setFormData({...formData, lumpsumAmount: e.target.value})}
                  className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                  placeholder="Enter one-time investment amount"
                />
              </div>
            )}
    
            <div>
              <label className="block text-[#ECE5F0] mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
              />
            </div>
          </div>
        );
      };

      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#242832] p-6 rounded-xl w-[500px] border border-[#2191FB]/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#ECE5F0]">
                {step === 1 ? 'Add New Goal' : 'Investment Plan'}
              </h3>
              <button onClick={onClose} className="text-[#ECE5F0]/70 hover:text-[#ECE5F0]">×</button>
            </div>
    
            {/* Progress indicator */}
            <div className="flex space-x-2 mb-6">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full ${
                    s <= step ? 'bg-[#2191FB]' : 'bg-[#1b1f27]'
                  }`}
                />
              ))}
            </div>
    
            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[#ECE5F0] mb-2">Goal Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                    placeholder="Enter goal name"
                  />
                </div>
    
                <div>
                  <label className="block text-[#ECE5F0] mb-2">Goal Icon</label>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(icons).map(([icon, name]) => (
                      <button
                        key={icon}
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`p-2 rounded-lg text-2xl ${
                          formData.icon === icon ? 'bg-[#2191FB]/20 border-[#2191FB]' : 'hover:bg-[#2191FB]/10'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
    
                <div>
                  <label className="block text-[#ECE5F0] mb-2">Target Amount</label>
                  <input
                    type="number"
                    value={formData.targetAmount}
                    onChange={(e) => setFormData({ ...formData, targetAmount: parseFloat(e.target.value) })}
                    className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                    placeholder="Enter amount"
                  />
                </div>
    
                <div>
                  <label className="block text-[#ECE5F0] mb-2">Target Date</label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                  />
                </div>
              </div>
            ) : (
              renderInvestmentOptions()
            )}
    
            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(1)}
                  className="text-[#2191FB] hover:text-[#2191FB]/80"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (step === 1) {
                    setStep(2);
                  } else {
                    onAdd(formData);
                  }
                }}
                className="ml-auto px-6 py-3 rounded-lg bg-[#2191FB] text-white"
                disabled={
                  step === 1 
                    ? !formData.name || !formData.icon || !formData.targetAmount || !formData.targetDate
                    : !formData[formData.investmentType === 'sip' ? 'sipAmount' : 'lumpsumAmount']
                }
              >
                {step === 1 ? 'Next' : 'Create Goal'}
              </button>
            </div>
          </motion.div>
        </div>
      );
    };



    const EnhancedGoalsGrid = () => {
        const [goals, setGoals] = useState(() => {
          const savedGoals = localStorage.getItem('finhealth_goals_data');
          return savedGoals ? JSON.parse(savedGoals) : [];
        });
      
        const [showAddGoal, setShowAddGoal] = useState(false);
      
        const goalIcons = {
          '🏠': 'Home', 
          '🚗': 'Car', 
          '💰': 'Savings', 
          '✈️': 'Travel',
          '🎓': 'Education', 
          '🚀': 'Startup', 
          '💼': 'Business', 
          '🏖️': 'Retirement',
          '💍': 'Wedding', 
          '🏥': 'Healthcare'
        };

        const handleAddGoal = (goalData) => {
            const newGoals = [...goals, { 
              id: Date.now(), 
              ...goalData,
              progress: 0,
              createdAt: new Date().toISOString()
            }];
            setGoals(newGoals);
            localStorage.setItem('finhealth_goals_data', JSON.stringify(newGoals));
            setShowAddGoal(false);
          };
        
          const calculateProgress = (current, target) => {
            return Math.min(100, Math.round((current / target) * 100));
          };

          return (
            <>
              <div className="grid grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <motion.div
                    key={goal.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#242832] p-6 rounded-xl text-center cursor-pointer 
                              border border-[#2191FB]/10 hover:border-[#2191FB]/30"
                  >
                    <div className="text-3xl mb-3">{goal.icon}</div>
                    <div className="text-[#ECE5F0] mb-2">{goal.name}</div>
                    <div className="text-sm text-[#ECE5F0]/70 mb-3">
                      Goal: £{parseInt(goal.targetAmount).toLocaleString()}
                    </div>
                    <div className="w-full bg-[#1b1f27] h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` 
                        }}
                        className="bg-[#2191FB] h-full"
                      />
                    </div>
                    <div className="mt-3 flex justify-between items-center text-sm">
                      <span className="text-[#2191FB] font-medium">
                        {calculateProgress(goal.currentAmount, goal.targetAmount)}%
                      </span>
                      <span className="text-[#ECE5F0]/70">
                        by {new Date(goal.targetDate).toLocaleDateString()}
                      </span>
                    </div>
                    {/* Add investment info */}
                    {goal.investmentType && (
                      <div className="mt-3 pt-3 border-t border-[#2191FB]/10">
                        <div className="text-sm text-[#ECE5F0]/70">
                          {goal.investmentType === 'sip' 
                            ? `SIP: £${goal.sipAmount}/month`
                            : `Lumpsum: £${goal.lumpsumAmount}`
                          }
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
        
                {/* Add Goal Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowAddGoal(true)}
                  className="bg-[#242832] p-6 rounded-xl text-center cursor-pointer border border-dashed
                            border-[#2191FB]/30 hover:border-[#2191FB]/50"
                >
                  <PlusCircleIcon className="w-12 h-12 text-[#2191FB] mx-auto mb-3" />
                  <div className="text-[#ECE5F0]">Add New Goal</div>
                </motion.div>
              </div>
        
              {/* Add Goal Modal */}
              {showAddGoal && (
                <GoalAdditionModal 
                  icons={goalIcons}
                  onClose={() => setShowAddGoal(false)}
                  onAdd={handleAddGoal}
                />
              )}
            </>
          );
        };
        
        export default EnhancedGoalsGrid;
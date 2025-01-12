// src/components/grow/DematAccountModal.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentCheckIcon } from '@heroicons/react/24/outline';

const DematAccountModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    panCard: '',
    aadhar: '',
    bankDetails: {
      accountNumber: '',
      ifsc: '',
      bankName: ''
    },
    proofOfIdentity: null,
    proofOfAddress: null
  });

  const handleSubmit = () => {
    const dematId = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const accountData = {
      ...formData,
      dematId,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    localStorage.setItem('finhealth_demat_account', JSON.stringify(accountData));
    onClose(accountData);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-[#ECE5F0]">Identity Verification</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#ECE5F0] mb-2">PAN Card Number</label>
                <input
                  type="text"
                  maxLength="10"
                  placeholder="ABCDE1234F"
                  value={formData.panCard}
                  onChange={(e) => setFormData({ ...formData, panCard: e.target.value.toUpperCase() })}
                  className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                />
              </div>
              <div>
                <label className="block text-[#ECE5F0] mb-2">Aadhar Number</label>
                <input
                  type="text"
                  maxLength="12"
                  placeholder="1234 5678 9012"
                  value={formData.aadhar}
                  onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
                  className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-[#ECE5F0]">Bank Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#ECE5F0] mb-2">Bank Account Number</label>
                <input
                  type="text"
                  placeholder="Enter your account number"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) => setFormData({
                    ...formData,
                    bankDetails: { ...formData.bankDetails, accountNumber: e.target.value }
                  })}
                  className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                />
              </div>
              <div>
                <label className="block text-[#ECE5F0] mb-2">IFSC Code</label>
                <input
                  type="text"
                  placeholder="BANK0123456"
                  value={formData.bankDetails.ifsc}
                  onChange={(e) => setFormData({
                    ...formData,
                    bankDetails: { ...formData.bankDetails, ifsc: e.target.value.toUpperCase() }
                  })}
                  className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                />
              </div>
              <div>
                <label className="block text-[#ECE5F0] mb-2">Bank Name</label>
                <select
                  value={formData.bankDetails.bankName}
                  onChange={(e) => setFormData({
                    ...formData,
                    bankDetails: { ...formData.bankDetails, bankName: e.target.value }
                  })}
                  className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                >
                  <option value="">Select Bank</option>
                  <option value="HSBC">HSBC</option>
                  <option value="Barclays">Barclays</option>
                  <option value="Lloyds">Lloyds</option>
                  <option value="NatWest">NatWest</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-[#ECE5F0]">Document Upload</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-[#2191FB]/20 rounded-lg p-6 text-center">
                <DocumentCheckIcon className="w-12 h-12 text-[#2191FB] mx-auto mb-4" />
                <p className="text-[#ECE5F0] mb-2">Upload Proof of Identity</p>
                <p className="text-sm text-[#ECE5F0]/70">Passport, Driver's License, or National ID</p>
              </div>
              <div className="border-2 border-dashed border-[#2191FB]/20 rounded-lg p-6 text-center">
                <DocumentCheckIcon className="w-12 h-12 text-[#2191FB] mx-auto mb-4" />
                <p className="text-[#ECE5F0] mb-2">Upload Proof of Address</p>
                <p className="text-sm text-[#ECE5F0]/70">Utility Bill or Bank Statement</p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#242832] p-8 rounded-xl border border-[#2191FB]/10 shadow-lg max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#ECE5F0]">Open Demat Account</h2>
          <button onClick={() => onClose()} className="text-[#ECE5F0]/70 hover:text-[#ECE5F0]">×</button>
        </div>

        {renderStep()}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-[#2191FB] hover:text-[#2191FB]/80"
            >
              Back
            </button>
          )}
          <button
            onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
            className="bg-[#2191FB] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2191FB]/90 ml-auto"
          >
            {step === 3 ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DematAccountModal;
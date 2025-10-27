import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { X, RefreshCw, Calendar, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from '@/lib/utils'
import loyaltyBackgroundTransparent from '@/assets/loyalty-background-transparent.svg'

interface PolicyRenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyData: {
    policyNumber: string;
    customerName: string;
    vehicleRegistrationNumber: string;
    policyEndDate: string;
    coverType: string;
  };
  onRenew: (renewalDate: Date) => void;
}

const PolicyRenewalModal: React.FC<PolicyRenewalModalProps> = ({
  isOpen,
  onClose,
  policyData = {
    policyNumber: '',
    customerName: '',
    vehicleRegistrationNumber: '',
    policyEndDate: '',
    coverType: ''
  },
  onRenew,
}) => {
  const [renewalDate, setRenewalDate] = useState<Date | undefined>(undefined);

  const handleRenewal = () => {
    if (renewalDate) {
      onRenew(renewalDate);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
          >
            <div className={cn(
              'relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl',
              'bg-linear-to-br from-blue-100 via-purple-100 to-indigo-200',
              'border border-blue-200/50 shadow-2xl backdrop-blur-sm'
            )}>
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-4 left-4 w-32 h-32 bg-blue-300/30 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 bg-purple-300/30 rounded-full blur-xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
                </div>
              </div>

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              {/* Background Icon */}
              <img 
                src={loyaltyBackgroundTransparent} 
                alt="" 
                className="absolute z-10 bottom-0 right-0 w-[300px] h-[300px] pointer-events-none opacity-30"
              />

              {/* Header */}
              <div className="relative z-20 p-6 pb-4 border-b border-blue-200/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <RefreshCw className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Renew Policy</h2>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-slate-600">Policy #{policyData.policyNumber}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-slate-600 hover:text-slate-800 hover:bg-white/50"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-20 p-6">
                <div className="space-y-6">
                  {/* Policy Summary */}
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">Policy Summary</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Customer Name</h4>
                        <p className="text-sm text-slate-900">{policyData.customerName}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Vehicle Registration</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleRegistrationNumber}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Cover Type</h4>
                        <p className="text-sm text-slate-900 capitalize">{policyData.coverType}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Current Expiry Date</h4>
                        <p className="text-sm text-slate-900">{policyData.policyEndDate}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Renewal Date Selection */}
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-linear-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">Select Renewal Date</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                          Choose your preferred renewal start date
                        </label>
                        <DatePicker
                    value={renewalDate}
                    onChange={setRenewalDate}
                    placeholder="Select renewal date"
                    className="w-full"
                  />
                      </div>
                      <div className="bg-blue-50/80 border border-blue-200/50 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> Your new policy will start from the selected date. 
                          Make sure there's no gap between your current policy expiry and the new policy start date.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-20 p-6 pt-4 border-t border-blue-200/30">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    <p>Renew your policy to continue coverage</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleRenewal}
                      disabled={!renewalDate}
                      className="bg-linear-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Renew Policy
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-green-500 via-blue-500 to-purple-500"></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolicyRenewalModal;
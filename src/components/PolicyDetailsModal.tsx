import React from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, User, Car, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils'
import loyaltyBackgroundTransparent from '@/assets/loyalty-background-transparent.svg'

interface PolicyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyData: {
    // Basic Policy Info
    policyNumber: string;
    policyStartDate: string;
    policyEndDate: string;
    policyStatus: string;
    
    // Customer Information
    customerName: string;
    contactNumber: string;
    email: string;
    
    // Vehicle Information
    vehicleRegistrationNumber: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYearManufacture: string;
    vehicleCC: string;
    vehicleUsageType: string;
    vehicleColor: string;
    vehicleSeatingCapacity: string;
    vehicleExtraSeats?: string;
    vehicleChassisNumber: string;
    vehicleNumberOfCylinders: string;
    vehicleBodyType: string;
    vehicleDriveType: string;
    vehicleFuelType: string;
    
    // Insurance Details
    coverType: string;
    buyExcess: string;
    sumInsured?: string;
    userType?: string;
    duration: string;
  };
}

const PolicyDetailsModal: React.FC<PolicyDetailsModalProps> = ({
  isOpen,
  onClose,
  policyData,
}) => {
  const getStatusBadge = (status: string) => {
    return (
      <span
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
          status === "expired"
            ? "bg-red-100 text-red-800 border border-red-200"
            : "bg-green-100 text-green-800 border border-green-200"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
              'relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl',
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
                className="absolute z-10 bottom-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-30"
              />

              {/* Header */}
              <div className="relative z-20 p-6 pb-4 border-b border-blue-200/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Policy Details</h2>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-slate-600">Policy #{policyData.policyNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(policyData.policyStatus)}
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
              </div>

              {/* Content */}
              <div className="relative z-20 p-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-6">
                  {/* Policy Information */}
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
                      <h3 className="text-lg font-semibold text-slate-800">Policy Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Policy Number</h4>
                        <p className="text-sm text-slate-900">{policyData.policyNumber}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Cover Type</h4>
                        <p className="text-sm text-slate-900 capitalize">{policyData.coverType}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Duration</h4>
                        <p className="text-sm text-slate-900">{policyData.duration}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Start Date</h4>
                        <p className="text-sm text-slate-900">{policyData.policyStartDate}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">End Date</h4>
                        <p className="text-sm text-slate-900">{policyData.policyEndDate}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Buy Excess</h4>
                        <p className="text-sm text-slate-900">{policyData.buyExcess}</p>
                      </div>
                      {policyData.sumInsured && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-1">Sum Insured</h4>
                          <p className="text-sm text-slate-900">{policyData.sumInsured}</p>
                        </div>
                      )}
                      {policyData.userType && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-1">User Type</h4>
                          <p className="text-sm text-slate-900">{policyData.userType}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Customer Information */}
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-linear-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">Customer Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Customer Name</h4>
                        <p className="text-sm text-slate-900">{policyData.customerName}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Contact Number</h4>
                        <p className="text-sm text-slate-900">{policyData.contactNumber}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Email</h4>
                        <p className="text-sm text-slate-900">{policyData.email}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Vehicle Information */}
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <Car className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">Vehicle Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Registration Number</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleRegistrationNumber}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Make</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleMake}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Model</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleModel}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Year of Manufacture</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleYearManufacture}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Cubic Capacity (CC)</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleCC}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Vehicle Usage</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleUsageType}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Color</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleColor}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Seating Capacity</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleSeatingCapacity}</p>
                      </div>
                      {policyData.vehicleExtraSeats && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-1">Extra Seats</h4>
                          <p className="text-sm text-slate-900">{policyData.vehicleExtraSeats}</p>
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Chassis Number</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleChassisNumber}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Number of Cylinders</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleNumberOfCylinders}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Body Type</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleBodyType}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Drive Type</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleDriveType}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Fuel Type</h4>
                        <p className="text-sm text-slate-900">{policyData.vehicleFuelType}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-20 p-6 pt-4 border-t border-blue-200/30">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    <p>Complete policy information and details</p>
                  </div>
                  <Button
                    onClick={onClose}
                    className="bg-linear-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  >
                    Close
                  </Button>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolicyDetailsModal;
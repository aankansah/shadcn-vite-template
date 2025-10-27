import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, FileText, User, Calendar, DollarSign, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import loyaltyBackgroundTransparent from "@/assets/loyalty-background-transparent.svg";

interface PolicySearchResult {
  id: number;
  policy_no: string;
  insured_name: string;
  fullname: string;
  policy_start: string;
  policy_end: string;
  gross_premium: string;
  net_premium: string;
  status_perc: number;
  mode_of_payment: string;
  territorial_limit: string;
  organisation_name: string;
  acquired_by_name: string;
  commission_rate: string;
  sum_insured: string;
  policy_duration_num: number;
  duration_type: string;
  createdon: string;
  approved_on: string;
  receipted_date: string;
  outstanding_due: string;
  [key: string]: unknown;
}

interface ViewSearchResultDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyData: PolicySearchResult;
}

const ViewSearchResultDetailsModal: React.FC<ViewSearchResultDetailsModalProps> = ({
  isOpen,
  onClose,
  policyData,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: string) => {
    if (!amount) return "N/A";
    return `GHS ${parseFloat(amount).toLocaleString()}`;
  };

  const getStatusText = (statusPerc: number) => {
    if (statusPerc >= 100) return "Completed";
    if (statusPerc >= 50) return "In Progress";
    if (statusPerc > 0) return "Pending";
    return "Not Started";
  };

  const getStatusColor = (statusPerc: number) => {
    if (statusPerc >= 100) return "text-green-600 bg-green-100";
    if (statusPerc >= 50) return "text-blue-600 bg-blue-100";
    if (statusPerc > 0) return "text-yellow-600 bg-yellow-100";
    return "text-gray-600 bg-gray-100";
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
              'relative w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl',
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
              <div className="relative z-20 flex-shrink-0 p-6 pb-4 border-b border-blue-200/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Policy Details</h2>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">{policyData.policy_no}</span>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={onClose}
                    className="w-8 h-8 p-0 bg-white/80 hover:bg-white border border-slate-200 rounded-lg shadow-sm"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </Button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="relative z-20 flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Policy Status */}
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800">Policy Status</h3>
                        </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(policyData.status_perc)}`}>
                        {getStatusText(policyData.status_perc)} ({policyData.status_perc}%)
                      </span>
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
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">Customer Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Insured Name</h4>
                        <p className="text-sm text-slate-900">{policyData.insured_name || policyData.fullname}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Organisation</h4>
                        <p className="text-sm text-slate-900">{policyData.organisation_name}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Acquired By</h4>
                        <p className="text-sm text-slate-900">{policyData.acquired_by_name}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Territorial Limit</h4>
                        <p className="text-sm text-slate-900">{policyData.territorial_limit}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Policy Information */}
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">Policy Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Policy Number</h4>
                        <p className="text-sm text-slate-900">{policyData.policy_no}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Duration</h4>
                        <p className="text-sm text-slate-900">{policyData.policy_duration_num} {policyData.duration_type}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Start Date</h4>
                        <p className="text-sm text-slate-900">{formatDate(policyData.policy_start)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">End Date</h4>
                        <p className="text-sm text-slate-900">{formatDate(policyData.policy_end)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Created On</h4>
                        <p className="text-sm text-slate-900">{formatDate(policyData.createdon)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Approved On</h4>
                        <p className="text-sm text-slate-900">{formatDate(policyData.approved_on)}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Financial Information */}
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">Financial Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Gross Premium</h4>
                        <p className="text-sm text-slate-900">{formatCurrency(policyData.gross_premium)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Net Premium</h4>
                        <p className="text-sm text-slate-900">{formatCurrency(policyData.net_premium)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Sum Insured</h4>
                        <p className="text-sm text-slate-900">{formatCurrency(policyData.sum_insured)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Outstanding Due</h4>
                        <p className="text-sm text-slate-900">{formatCurrency(policyData.outstanding_due)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Commission Rate</h4>
                        <p className="text-sm text-slate-900">{policyData.commission_rate}%</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Payment Mode</h4>
                        <p className="text-sm text-slate-900">{policyData.mode_of_payment}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Payment Information */}
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">Payment Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Receipt Date</h4>
                        <p className="text-sm text-slate-900">{formatDate(policyData.receipted_date)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-1">Payment Status</h4>
                        <p className="text-sm text-slate-900">
                          {policyData.paid_yn === 1 ? "Paid" : "Unpaid"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-20 flex-shrink-0 p-6 border-t border-white/20">
                <div className="flex justify-end">
                  <Button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-200 font-medium"
                  >
                    Close
                  </Button>
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-2xl" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ViewSearchResultDetailsModal;
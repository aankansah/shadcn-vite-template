import React from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils'

interface PolicyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyData: {
    policyNumber: string;
    customerName: string;
    documentUrl: string;
  };
}

const PolicyDetailsModal: React.FC<PolicyDetailsModalProps> = ({
  isOpen,
  onClose,
  policyData,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cn(
              'relative w-full h-full overflow-hidden',
              'bg-white shadow-2xl'
            )}>
              
              {/* Header */}
              <div className="relative z-20 p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Policy Document</h2>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/80">Policy #{policyData.policyNumber} - {policyData.customerName}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-white hover:text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Document Content */}
              <div className="relative z-20 h-[calc(100vh-80px)] w-screen">
                <iframe
                  src={policyData.documentUrl}
                  className="w-screen h-full border-0"
                  title={`Policy Document - ${policyData.policyNumber}`}
                  // loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolicyDetailsModal;
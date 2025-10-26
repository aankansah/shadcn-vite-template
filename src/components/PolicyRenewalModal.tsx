import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PolicyRenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (startDate: string) => void;
  policyNumber: string;
}

const PolicyRenewalModal: React.FC<PolicyRenewalModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  policyNumber
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Get today's date for min date
  const today = new Date();

  const handleProceed = async () => {
    if (!startDate) return;
    
    setIsLoading(true);
    
    // Simulate a brief loading state
    setTimeout(() => {
      onProceed(startDate.toISOString().split('T')[0]);
      setIsLoading(false);
      onClose();
      setStartDate(undefined); // Reset form
    }, 500);
  };

  const handleClose = () => {
    setStartDate(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Renew Policy
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">
            Renew your motor insurance policy: {policyNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <DatePicker
            label="Policy Start Date *"
            placeholder="Select renewal start date"
            value={startDate}
            onChange={setStartDate}
            minDate={today}
            id="start-date"
          />
          <p className="text-xs text-gray-500">
            Select when you want your renewed policy to start
          </p>
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleProceed}
            disabled={!startDate || isLoading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              'Proceed to Quote'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyRenewalModal;
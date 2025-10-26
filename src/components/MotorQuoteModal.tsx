import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Shield, Calendar, Car } from "lucide-react";
import { PaystackButton } from 'react-paystack'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteData: {
    net_premium: string;
  };
  coverType: string;
  startDate: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function MotorQuoteModal({
  isOpen,
  onClose,
  quoteData,
  coverType,
  startDate,
  customerInfo,
}: QuoteModalProps) {
  const navigate = useNavigate();
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden"
        showCloseButton={false}
      >
        {/* Header Section */}
        <div className="bg-linear-to-br from-blue-600 to-purple-700 px-6 py-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white mb-2 text-center">
                Quote Generated!
              </DialogTitle>
              <p className="text-blue-100 text-sm text-center">
                Your {coverType} motor insurance quote is ready
              </p>
            </DialogHeader>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-6">
          {/* Premium Display */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm mb-2">Annual Premium</p>
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {formatCurrency(quoteData.net_premium)}
            </div>
            <p className="text-gray-500 text-xs">Per year</p>
          </div>

          <Separator className="my-6" />

          {/* Features */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {coverType === "comprehensive" ? "Comprehensive Coverage" : "Third Party Coverage"}
                </p>
                <p className="text-gray-500 text-xs">
                  {coverType === "comprehensive" 
                    ? "Full protection for your vehicle" 
                    : "Essential legal protection"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">12 Months Coverage</p>
                <p className="text-gray-500 text-xs">Annual policy period</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Car className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Policy Start Date</p>
                <p className="text-gray-500 text-xs">Starts {formatDate(startDate)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <PaystackButton
              publicKey={import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || ""}
              email={customerInfo.email}
              amount={parseFloat(quoteData.net_premium) * 100}
              metadata={{
                name: customerInfo.name,
                phone: customerInfo.phone,
                custom_fields: []
              }}
              currency="GHS"
              text="Buy Policy Now"
              onSuccess={() => {
                toast.success("Payment successful! Preparing your policy...");
                onClose();
                const flow = coverType === "renewal" ? "motor-policy-renewal" : "motor-policy-creation";
                navigate(`/policy-preparation?flow=${flow}`);
              }}
              onClose={() => toast("Wait! Don't leave😞")}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            />
            
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl"
              size="lg"
            >
              Close
            </Button>
          </div>

          {/* Footer Note */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600 text-center">
              Premium includes all statutory levies and taxes.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Calendar, FileText, User, Shield, Clock } from "lucide-react";
import PolicyRenewalModal from "@/components/PolicyRenewalModal";
import MotorQuoteModal from "@/components/MotorQuoteModal";
import PolicyDetailsModal from "@/components/PolicyDetailsModal";

interface Policy {
  policyNumber: string;
  vehicleRegistrationNumber: string;
  policyStartDate: string;
  policyEndDate: string;
  renewalDate: string;
  policyStatus: "expired" | "active";
  documentUrl: string;
  
  // Customer Information
  customerName: string;
  contactNumber: string;
  email: string;
  
  // Vehicle Information
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
}

const MyPolicies: React.FC = () => {
  const navigate = useNavigate();
  
  // State for renewal modal
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
  const [selectedPolicyForRenewal, setSelectedPolicyForRenewal] = useState<Policy | null>(null);
  
  // State for quote modal
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [renewalStartDate, setRenewalStartDate] = useState("");
  
  // State for policy details modal
  const [isPolicyDetailsModalOpen, setIsPolicyDetailsModalOpen] = useState(false);
  const [selectedPolicyForDetails, setSelectedPolicyForDetails] = useState<Policy | null>(null);
  
  // Sample customer info for renewal (in real app, this would come from user context)
  const customerInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+233123456789"
  };
  
  // Sample quote data for renewal
  const renewalQuoteData = {
    net_premium: "850.00"
  };

  // Handler functions
  const handleRenewPolicy = (policy: Policy) => {
    setSelectedPolicyForRenewal(policy);
    setIsRenewalModalOpen(true);
  };

  const handleRenewalProceed = (renewalDate: Date) => {
    setRenewalStartDate(renewalDate.toISOString().split('T')[0]);
    setIsRenewalModalOpen(false);
    setIsQuoteModalOpen(true);
  };

  const handleQuoteModalClose = () => {
    setIsQuoteModalOpen(false);
    setSelectedPolicyForRenewal(null);
    setRenewalStartDate("");
  };

  const handleViewPolicyDetails = (policy: Policy) => {
    setSelectedPolicyForDetails(policy);
    setIsPolicyDetailsModalOpen(true);
  };

  const handlePolicyDetailsModalClose = () => {
    setIsPolicyDetailsModalOpen(false);
    setSelectedPolicyForDetails(null);
  };

  // Sample policy data with complete information
  const policies: Policy[] = [
    {
      policyNumber: "LIC/HQ/MOT/TP/24/10007",
      vehicleRegistrationNumber: "GR-1234-20",
      policyStartDate: "31st August, 2024",
      policyEndDate: "31st August, 2025",
      renewalDate: "31st August 2025, 11:59pm",
      policyStatus: "expired",
      documentUrl: "https://loyalty.genovainsure.com/external/policy?pno=TElDL0hRL01PVC9NQy8yNC80NzY=",
      
      // Customer Information
      customerName: "John Doe",
      contactNumber: "0241234567",
      email: "john.doe@example.com",
      
      // Vehicle Information
      vehicleMake: "Toyota",
      vehicleModel: "Camry",
      vehicleYearManufacture: "2020",
      vehicleCC: "2500",
      vehicleUsageType: "Private",
      vehicleColor: "Silver",
      vehicleSeatingCapacity: "5",
      vehicleExtraSeats: "",
      vehicleChassisNumber: "JTDKN3DU5L5123456",
      vehicleNumberOfCylinders: "4",
      vehicleBodyType: "Sedan",
      vehicleDriveType: "Front Wheel Drive",
      vehicleFuelType: "Petrol",
      
      // Insurance Details
      coverType: "third_party",
      buyExcess: "No",
      duration: "1 Year",
    },
    {
      policyNumber: "LIC/HQ/MOT/TP/24/10006",
      vehicleRegistrationNumber: "GR-5678-21",
      policyStartDate: "22nd October, 2024",
      policyEndDate: "22nd October, 2025",
      renewalDate: "22nd October 2025, 11:59pm",
      policyStatus: "expired",
      documentUrl: "https://loyalty.genovainsure.com/external/policy?pno=TElDL0hRL01PVC9NQy8yNC80NzY=",
      
      // Customer Information
      customerName: "Jane Smith",
      contactNumber: "0249876543",
      email: "jane.smith@example.com",
      
      // Vehicle Information
      vehicleMake: "Honda",
      vehicleModel: "Civic",
      vehicleYearManufacture: "2019",
      vehicleCC: "1800",
      vehicleUsageType: "Private",
      vehicleColor: "Blue",
      vehicleSeatingCapacity: "5",
      vehicleExtraSeats: "",
      vehicleChassisNumber: "2HGFC2F59KH123456",
      vehicleNumberOfCylinders: "4",
      vehicleBodyType: "Sedan",
      vehicleDriveType: "Front Wheel Drive",
      vehicleFuelType: "Petrol",
      
      // Insurance Details
      coverType: "comprehensive",
      buyExcess: "Yes",
      sumInsured: "50000",
      userType: "Individual",
      duration: "1 Year",
    },
  ];

  const getStatusBadge = (status: string) => {
    return (
      <span
        className={`inline-block px-2 py-1 text-xs font-medium rounded ${
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
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <div className="bg-white shadow-sm py-2 px-4 flex gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Policies</h1>
          <p className="text-gray-600">
            Manage and view all your insurance policies
          </p>
        </div>
      </div>
      
      <div className="w-full py-8 px-6 h-full overflow-y-auto">
        <div className="max-w-[1000px] w-full mx-auto h-full">
          <div className="space-y-4">
            {policies.map((policy, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 shadow-lg border border-blue-200/50 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 bg-purple-300 rounded-full blur-2xl"></div>
                </div>

                <CardHeader className="pb-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          Motor Insurance Policy
                        </CardTitle>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {policy.customerName}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(policy.policyStatus)}
                  </div>
                </CardHeader>

                <CardContent className="pt-0 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/50">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <h3 className="text-sm font-semibold text-gray-800">
                            Policy Number
                          </h3>
                        </div>
                        <p className="text-sm text-gray-900 font-mono">
                          {policy.policyNumber}
                        </p>
                      </div>

                      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <h3 className="text-sm font-semibold text-gray-800">
                            Policy Start Date
                          </h3>
                        </div>
                        <p className="text-sm text-gray-900">
                          {policy.policyStartDate}
                        </p>
                      </div>

                      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <h3 className="text-sm font-semibold text-gray-800">
                            Renewal Date
                          </h3>
                        </div>
                        <p className="text-sm text-gray-900">
                          {policy.renewalDate}
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Car className="w-4 h-4 text-purple-600" />
                          <h3 className="text-sm font-semibold text-gray-800">
                            Vehicle Registration
                          </h3>
                        </div>
                        <p className="text-sm text-gray-900 font-mono">
                          {policy.vehicleRegistrationNumber}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {policy.vehicleMake} {policy.vehicleModel} ({policy.vehicleYearManufacture})
                        </p>
                      </div>

                      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-red-600" />
                          <h3 className="text-sm font-semibold text-gray-800">
                            Policy End Date
                          </h3>
                        </div>
                        <p className="text-sm text-gray-900">
                          {policy.policyEndDate}
                        </p>
                      </div>

                      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          <h3 className="text-sm font-semibold text-gray-800">
                            Coverage Type
                          </h3>
                        </div>
                        <p className="text-sm text-gray-900 capitalize">
                          {policy.coverType.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-white/30">
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        variant="outline" 
                        className="bg-white/80 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 font-medium"
                        onClick={() => handleViewPolicyDetails(policy)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        VIEW POLICY DOCUMENT
                      </Button>
                      {policy.policyStatus === 'expired' && (
                        <Button 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg"
                          onClick={() => handleRenewPolicy(policy)}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          RENEW POLICY
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {policies.length === 0 && (
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No policies found
                </h3>
                <p className="text-gray-600 mb-4">
                  You don't have any insurance policies yet.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Get Your First Policy
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Renewal Modal */}
      <PolicyRenewalModal
        isOpen={isRenewalModalOpen}
        onClose={() => setIsRenewalModalOpen(false)}
        onRenew={handleRenewalProceed}
        policyData={{
          policyNumber: selectedPolicyForRenewal?.policyNumber || "",
          customerName: selectedPolicyForRenewal?.customerName || "",
          vehicleRegistrationNumber: selectedPolicyForRenewal?.vehicleRegistrationNumber || "",
          policyEndDate: selectedPolicyForRenewal?.policyEndDate || "",
          coverType: selectedPolicyForRenewal?.coverType || ""
        }}
      />

      {/* Quote Modal */}
      <MotorQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleQuoteModalClose}
        quoteData={renewalQuoteData}
        coverType="renewal"
        startDate={renewalStartDate}
        customerInfo={customerInfo}
      />

      {/* Policy Details Modal */}
      {selectedPolicyForDetails && (
        <PolicyDetailsModal
          isOpen={isPolicyDetailsModalOpen}
          onClose={handlePolicyDetailsModalClose}
          policyData={{
            policyNumber: selectedPolicyForDetails.policyNumber,
            customerName: selectedPolicyForDetails.customerName,
            documentUrl: selectedPolicyForDetails.documentUrl
          }}
        />
      )}
    </div>
  );
};

export default MyPolicies;

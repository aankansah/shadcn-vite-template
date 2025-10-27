import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, FileText, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import ClaimFormModal from "@/components/ClaimFormModal";

interface ClaimData {
  id: string;
  claimNumber: string;
  policyType: string;
  dateOfAccident: string;
  vehicleInsuranceNumber: string;
  insuredName: string;
  insuredPhoneNumber: string;
  placeOfAccident: string;
  descriptionOfAccident: string;
  status: "pending" | "approved" | "rejected" | "processing";
  submittedDate: string;
  photos: string[];
}

const MyClaims: React.FC = () => {
  const navigate = useNavigate();
  const [isClaimFormModalOpen, setIsClaimFormModalOpen] = useState(false);

  // Mock claims data - replace with actual API call
  const claims: ClaimData[] = [
    {
      id: "1",
      claimNumber: "CLM-2024-001",
      policyType: "Third Party",
      dateOfAccident: "2024-01-15",
      vehicleInsuranceNumber: "VIN-123456789",
      insuredName: "De-Graft",
      insuredPhoneNumber: "0554543809",
      placeOfAccident: "Amasaman",
      descriptionOfAccident: "Rear-end collision at traffic light. The other vehicle failed to stop in time and hit my car from behind. Minor damage to the rear bumper and tail lights. No injuries reported.",
      status: "processing",
      submittedDate: "2024-01-16",
      photos: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop"
      ]
    },
    {
      id: "2",
      claimNumber: "CLM-2024-002",
      policyType: "Comprehensive",
      dateOfAccident: "2024-01-10",
      vehicleInsuranceNumber: "VIN-987654321",
      insuredName: "Kwame Asante",
      insuredPhoneNumber: "0244567890",
      placeOfAccident: "Accra Mall",
      descriptionOfAccident: "Vehicle was damaged while parked in the mall parking lot. Unknown person scratched the side of the car and left without leaving contact information. Security cameras captured the incident.",
      status: "approved",
      submittedDate: "2024-01-11",
      photos: [
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop"
      ]
    },
    {
      id: "3",
      claimNumber: "CLM-2024-003",
      policyType: "Third Party",
      dateOfAccident: "2024-01-05",
      vehicleInsuranceNumber: "VIN-456789123",
      insuredName: "Ama Serwaa",
      insuredPhoneNumber: "0201234567",
      placeOfAccident: "Tema Motorway",
      descriptionOfAccident: "Single vehicle accident due to tire blowout on the highway. Vehicle veered off the road and hit the guardrail. Driver was wearing seatbelt and sustained minor injuries. Tow truck was called to remove the vehicle.",
      status: "pending",
      submittedDate: "2024-01-06",
      photos: [
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "processing":
        return "Processing";
      case "pending":
        return "Pending Review";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-white/20 sticky top-0 z-10">
        <div className=" px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  My Claims
                </h1>
                <p className="text-gray-600 text-sm">
                  Track and manage your insurance claims
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsClaimFormModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Make a Motor Insurance Claim
            </Button>
          </div>
        </div>
      </div>

      {/* Claims List */}
      <div className="w-full h-full overflow-y-auto overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {claims.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Claims Found</h3>
              <p className="text-gray-600">You haven't submitted any claims yet.</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {claims.map((claim, index) => (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-white via-white to-gray-50/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                >
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Claim #{claim.claimNumber}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Submitted on {new Date(claim.submittedDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <div className={cn(
                        "px-4 py-2 rounded-full text-sm font-semibold border-2 shadow-sm",
                        getStatusColor(claim.status)
                      )}>
                        {getStatusText(claim.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Policy Type</p>
                            <p className="font-semibold text-gray-900">{claim.policyType}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Contact</p>
                            <p className="font-semibold text-gray-900">{claim.insuredPhoneNumber}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Claim Form Modal */}
      <ClaimFormModal 
        isOpen={isClaimFormModalOpen}
        onClose={() => setIsClaimFormModalOpen(false)}
        claimFormUrl="https://form.jotform.com/LOYALTY_INSURANCE/motor-claim-form"
      />
    </div>
  );
};

export default MyClaims;
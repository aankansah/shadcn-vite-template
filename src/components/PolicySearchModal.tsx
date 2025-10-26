import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Loader2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { genovaService } from "@/services/genovaService";
import PolicyDetailsModal from "./PolicyDetailsModal";
import loyaltyBackgroundTransparent from "@/assets/loyalty-background-transparent.svg";

interface PolicySearchResult {
  id: string;
  policy_no: string;
  vehicle_number?: string;
  customer_name?: string;
  policy_start?: string;
  policy_end?: string;
  status?: string;
  [key: string]: unknown;
}

interface PolicyData {
  policyNumber: string;
  policyStartDate: string;
  policyEndDate: string;
  policyStatus: string;
  customerName: string;
  contactNumber: string;
  email: string;
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
  coverType: string;
  buyExcess: string;
  sumInsured?: string;
  userType?: string;
  duration: string;
}

interface PolicySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PolicySearchModal: React.FC<PolicySearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"policy_no" | "vehicle_number">("policy_no");
  const [searchResults, setSearchResults] = useState<PolicySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyData | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
    setHasSearched(false);
    onClose();
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const searchData = {
        [searchType]: searchQuery.trim()
      };

      const response = await genovaService.searchPolicy(searchData);

      if (response.success) {
        // Handle both single policy and array of policies
        const data = response.data;
        const results = Array.isArray(data) ? data : [data];
        setSearchResults(results.map((item: Record<string, unknown>, index: number) => ({
          id: (item.id as string) || `policy-${index}`,
          policy_no: (item.policy_no as string) || (item.policyNumber as string),
          vehicle_number: (item.vehicle_number as string) || (item.vehicleNumber as string),
          customer_name: (item.customer_name as string) || (item.customerName as string),
          policy_start: (item.policy_start as string) || (item.startDate as string),
          policy_end: (item.policy_end as string) || (item.endDate as string),
          status: (item.status as string) || "Active",
          ...item
        })));
      } else {
        setError(response.message || "Search failed");
        setSearchResults([]);
      }
    } catch (err: unknown) {
      console.error("Policy search error:", err);
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || "Failed to search policies"
        : "Failed to search policies";
      setError(errorMessage);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleViewDetails = (policy: PolicySearchResult) => {
    // Transform PolicySearchResult to PolicyData format expected by PolicyDetailsModal
    const policyData: PolicyData = {
      policyNumber: policy.policy_no || "",
      policyStartDate: policy.policy_start || "",
      policyEndDate: policy.policy_end || "",
      policyStatus: policy.status || "Active",
      customerName: policy.customer_name || "",
      contactNumber: "", // Will need to be fetched from API
      email: "", // Will need to be fetched from API
      vehicleRegistrationNumber: policy.vehicle_number || "",
      vehicleMake: "", // Will need to be fetched from API
      vehicleModel: "", // Will need to be fetched from API
      vehicleYearManufacture: "",
      vehicleCC: "",
      vehicleUsageType: "",
      vehicleColor: "",
      vehicleSeatingCapacity: "",
      vehicleChassisNumber: "",
      vehicleNumberOfCylinders: "",
      vehicleBodyType: "",
      vehicleDriveType: "",
      vehicleFuelType: "",
      coverType: "",
      buyExcess: "",
      sumInsured: "",
      userType: "",
      duration: ""
    };

    setSelectedPolicy(policyData);
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-4xl max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-600 via-blue-600 to-purple-800" />
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: "60px 60px",
                    }}
                  />
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>

                {/* Background Icon */}
                <div className="absolute top-8 right-8 opacity-5">
                  <img
                    src={loyaltyBackgroundTransparent}
                    alt=""
                    className="w-32 h-32"
                  />
                </div>

                {/* Header */}
                <div className="relative p-8 pb-6">
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <div className="p-3 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg">
                        <Search className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          Search Policy
                        </h2>
                        <p className="text-gray-600 text-sm">
                          Find policies by number or vehicle registration
                        </p>
                      </div>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      onClick={handleClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="relative px-8 pb-8 flex flex-col gap-6 max-h-[calc(90vh-120px)] overflow-hidden">
                  {/* Search Input Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
                  >
                    <div className="space-y-4">
                      {/* Search Type Toggle */}
                      <div className="flex gap-2">
                        <Button
                          variant={searchType === "policy_no" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSearchType("policy_no")}
                          className="flex-1"
                        >
                          Policy Number
                        </Button>
                        <Button
                          variant={searchType === "vehicle_number" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSearchType("vehicle_number")}
                          className="flex-1"
                        >
                          Vehicle Number
                        </Button>
                      </div>

                      {/* Search Input */}
                      <div className="flex gap-3">
                        <Input
                          placeholder={
                            searchType === "policy_no" 
                              ? "Enter policy number (e.g., LIC/HO/MOT/TP/25/3821)" 
                              : "Enter vehicle registration number"
                          }
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 bg-white/80 border-white/50"
                          disabled={isLoading}
                        />
                        <Button 
                          onClick={handleSearch} 
                          disabled={isLoading || !searchQuery.trim()}
                          className="px-6 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Search className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Results Section */}
                  <div className="flex-1 overflow-y-auto">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-4 shadow-lg"
                      >
                        <div className="flex items-center gap-3 text-red-700">
                          <AlertCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">{error}</span>
                        </div>
                      </motion.div>
                    )}

                    {hasSearched && !isLoading && !error && searchResults.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg text-center"
                      >
                        <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium">No policies found</p>
                        <p className="text-gray-500 text-sm mt-1">
                          Try searching with a different {searchType === "policy_no" ? "policy number" : "vehicle registration number"}
                        </p>
                      </motion.div>
                    )}

                    {searchResults.length > 0 && (
                      <div className="space-y-4">
                        {searchResults.map((policy, index) => (
                          <motion.div
                            key={policy.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-linear-to-br from-purple-500 to-blue-600 rounded-lg">
                                    <Search className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900">
                                      {policy.policy_no}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      {policy.customer_name || "N/A"}
                                    </p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">Vehicle:</span>
                                    <span className="ml-2 font-medium">
                                      {policy.vehicle_number || "N/A"}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Status:</span>
                                    <span className={cn(
                                      "ml-2 px-2 py-1 rounded-full text-xs font-medium",
                                      policy.status === "Active" 
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                    )}>
                                      {policy.status || "Active"}
                                    </span>
                                  </div>
                                  {policy.policy_start && (
                                    <div>
                                      <span className="text-gray-500">Start:</span>
                                      <span className="ml-2 font-medium">
                                        {new Date(policy.policy_start).toLocaleDateString()}
                                      </span>
                                    </div>
                                  )}
                                  {policy.policy_end && (
                                    <div>
                                      <span className="text-gray-500">End:</span>
                                      <span className="ml-2 font-medium">
                                        {new Date(policy.policy_end).toLocaleDateString()}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Button
                                onClick={() => handleViewDetails(policy)}
                                size="sm"
                                className="flex items-center gap-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-end gap-3 pt-4 border-t border-white/20"
                  >
                    <Button 
                      variant="outline" 
                      onClick={handleClose}
                      className="bg-white/80 border-white/50 hover:bg-white/90"
                    >
                      Close
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Policy Details Modal */}
      {selectedPolicy && (
        <PolicyDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          policyData={selectedPolicy}
        />
      )}
    </>
  );
};

export default PolicySearchModal;
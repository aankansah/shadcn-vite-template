import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[1200px] w-full h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 pb-0 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Policy Details
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Complete information for policy <br />{policyData.policyNumber}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(policyData.policyStatus)}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Policy Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Policy Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Policy Number
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.policyNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Cover Type
                    </h4>
                    <p className="text-sm text-gray-900 capitalize">{policyData.coverType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.policyStartDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.policyEndDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Buy Excess
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.buyExcess}</p>
                  </div>
                  {policyData.sumInsured && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        Sum Insured
                      </h4>
                      <p className="text-sm text-gray-900">{policyData.sumInsured}</p>
                    </div>
                  )}
                  {policyData.userType && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        User Type
                      </h4>
                      <p className="text-sm text-gray-900">{policyData.userType}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.customerName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.contactNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Email
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Registration Number
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleRegistrationNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Make
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleMake}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Model
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleModel}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Year of Manufacture
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleYearManufacture}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Cubic Capacity (CC)
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleCC}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Vehicle Usage
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleUsageType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Color
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleColor}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Seating Capacity
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleSeatingCapacity}</p>
                  </div>
                  {policyData.vehicleExtraSeats && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        Extra Seats
                      </h4>
                      <p className="text-sm text-gray-900">{policyData.vehicleExtraSeats}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Chassis Number
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleChassisNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Number of Cylinders
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleNumberOfCylinders}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Body Type
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleBodyType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Drive Type
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleDriveType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Fuel Type
                    </h4>
                    <p className="text-sm text-gray-900">{policyData.vehicleFuelType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-4">
          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyDetailsModal;
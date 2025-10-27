import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, FileText, Calendar, User, Phone, MapPin, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import loyaltyBackgroundTransparent from "@/assets/loyalty-background-transparent.svg";

interface ClaimsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClaimsModal: React.FC<ClaimsModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    photos: [] as File[],
    policyType: "",
    dateOfAccident: "",
    vehicleInsuranceNumber: "",
    insuredName: "",
    insuredPhoneNumber: "",
    placeOfAccident: "",
    descriptionOfAccident: "",
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/') && (file.type === 'image/png' || file.type === 'image/jpeg')
      );
      setFormData(prev => ({ 
        ...prev, 
        photos: [...prev.photos, ...newFiles].slice(0, 5) // Limit to 5 photos
      }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Claims form submitted:", formData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      photos: [],
      policyType: "",
      dateOfAccident: "",
      vehicleInsuranceNumber: "",
      insuredName: "",
      insuredPhoneNumber: "",
      placeOfAccident: "",
      descriptionOfAccident: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
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
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Make a Claim
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Submit your insurance claim details
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
              <div className="relative px-8 pb-8 max-h-[calc(90vh-120px)] overflow-y-auto">
                <div className="space-y-6">
                  {/* Photo Upload Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Camera className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-gray-900">Add photos of vehicle or accident scene</h3>
                    </div>
                    
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
                        dragActive ? "border-purple-400 bg-purple-50" : "border-gray-300",
                        "hover:border-purple-400 hover:bg-purple-50/50"
                      )}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click here to select photos</p>
                      <p className="text-sm text-gray-500">Only PNG and JPG is allowed</p>
                      <input
                        type="file"
                        multiple
                        accept="image/png,image/jpeg"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        aria-label="Upload photos of vehicle or accident scene"
                        title="Upload photos of vehicle or accident scene"
                      />
                    </div>

                    {/* Photo Preview */}
                    {formData.photos.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removePhoto(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove photo"
                              aria-label="Remove photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Form Fields */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Policy Type */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-600" />
                          Policy
                        </label>
                        <Select value={formData.policyType} onValueChange={(value) => handleInputChange('policyType', value)}>
                          <SelectTrigger className="bg-white/80 border-white/50">
                            <SelectValue placeholder="Third Party" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="third-party">Third Party</SelectItem>
                            <SelectItem value="comprehensive">Comprehensive</SelectItem>
                            <SelectItem value="marine">Marine</SelectItem>
                            <SelectItem value="fire">Fire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Date of Accident */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          Date of Accident
                        </label>
                        <Input
                          type="date"
                          value={formData.dateOfAccident}
                          onChange={(e) => handleInputChange('dateOfAccident', e.target.value)}
                          className="bg-white/80 border-white/50"
                        />
                      </div>

                      {/* Vehicle Insurance Number */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">Vehicle Insurance Number</label>
                        <Input
                          placeholder="N/A"
                          value={formData.vehicleInsuranceNumber}
                          onChange={(e) => handleInputChange('vehicleInsuranceNumber', e.target.value)}
                          className="bg-white/80 border-white/50"
                        />
                      </div>

                      {/* Insured Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-600" />
                          Insured Name
                        </label>
                        <Input
                          placeholder="De-Graft"
                          value={formData.insuredName}
                          onChange={(e) => handleInputChange('insuredName', e.target.value)}
                          className="bg-white/80 border-white/50"
                        />
                      </div>

                      {/* Insured Phone Number */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-purple-600" />
                          Insured Phone Number
                        </label>
                        <Input
                          placeholder="0554543809"
                          value={formData.insuredPhoneNumber}
                          onChange={(e) => handleInputChange('insuredPhoneNumber', e.target.value)}
                          className="bg-white/80 border-white/50"
                        />
                      </div>

                      {/* Place of Accident */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          Place of Accident
                        </label>
                        <Input
                          placeholder="Amasaman"
                          value={formData.placeOfAccident}
                          onChange={(e) => handleInputChange('placeOfAccident', e.target.value)}
                          className="bg-white/80 border-white/50"
                        />
                      </div>

                      {/* Description of Accident */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">Description of Accident</label>
                        <textarea
                          placeholder="Please describe what happened..."
                          value={formData.descriptionOfAccident}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('descriptionOfAccident', e.target.value)}
                          className="bg-white/80 border-white/50 min-h-[100px] w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-colors focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500/20 outline-none resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center"
                  >
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="w-full md:w-auto px-12 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg"
                    >
                      Submit
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ClaimsModal;
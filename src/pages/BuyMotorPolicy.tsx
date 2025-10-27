import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  coverTypeOptions,
  vehicleUsageOptions,
  vehicleBodyTypeOptions,
  vehicleDriveTypeOptions,
  vehicleFuelTypeOptions,
  usageTypeToSeatingMapping,
} from "@/lib/motorFormOptions";
import { SearchableSelect } from "@/components/ui/searchable-select";
import MotorQuoteModal from "@/components/MotorQuoteModal";
import { genovaService, type PolicyQuoteRequest } from "@/services/genovaService";


// Form validation schema
const buyMotorPolicySchema = z.object({
  cover_type: z.string().min(1, "Cover type is required"),
  customer_name: z.string().min(2, "Customer name is required"),
  vehicle_registration_no: z
    .string()
    .min(1, "Vehicle registration number is required"),
  prefcontact: z
    .string()
    .regex(/^0[0-9]{9}$/, "Contact number must be in format 0XXXXXXXXX"),
  prefemail: z.string().email("Valid email is required"),
  vehicle_make: z.string().min(1, "Vehicle make is required"),
  vehicle_model: z.string().min(1, "Vehicle model is required"),
  vehicle_yr_manufacture: z.string().min(4, "Year of manufacture is required"),
  vehicle_cc: z.string().min(1, "Cubic capacity is required"),
  vehicle_usage_type: z.string().min(1, "Please select a vehicle usage type"),
  vehicle_colour: z.string().min(1, "Vehicle color is required"),
  vehicle_seating: z.string().min(1, "Seating capacity is required"),
  vehicle_extra_seats: z.string().optional(),
  vehicle_chassis_no: z.string().min(1, "Chassis number is required"),
  vehicle_no_cylinders: z.string().min(1, "Number of cylinders is required"),
  vehicle_body_type: z.string().min(1, "Please select a body type"),
  vehicle_drive_type: z.string().min(1, "Drive type is required"),
  vehicle_fuel_type: z.string().min(1, "Fuel type is required"),
  buy_excess: z.string().min(1, "Buy excess selection is required"),
  start_date: z.string().min(1, "Start date is required"),
  // Comprehensive insurance specific fields
  sum_insured: z.string().optional(),
  user_type: z.string().optional(),
}).refine((data) => {
  // If comprehensive, sum_insured and user_type are required
  if (data.cover_type === "comprehensive") {
    return data.sum_insured && data.sum_insured.length > 0 && 
           data.user_type && data.user_type.length > 0;
  }
  return true;
}, {
  message: "Sum insured and user type are required for comprehensive coverage",
  path: ["sum_insured"],
});

type BuyMotorPolicyFormData = z.infer<typeof buyMotorPolicySchema>;

export default function BuyMotorPolicy() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayBodyTypeAsSelect, setDisplayBodyTypeAsSelect] = useState(true);
  const [showQuoteModal, setShowQuoteModal] = useState(true);
  const [quoteData, setQuoteData] = useState<{ net_premium: string } | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [customerInfo, setCustomerInfo] = useState<{
    name: string;
    email: string;
    phone: string;
  }>(
    {
      name: "",
      email: "",
      phone: ""
    }
  );

  // Mutation for generating policy quote
  const generateQuoteMutation = useMutation({
    mutationFn: (quoteData: PolicyQuoteRequest) => genovaService.generatePolicyQuote(quoteData),
    onSuccess: (response) => {
      console.log("Quote generated successfully:", response);
      
      // Extract premium from response data
      const responseData = response.data as { net_premium?: string };
      const premium = responseData?.net_premium || "0";
      
      setQuoteData({ net_premium: premium });
      setShowQuoteModal(true);
      
      toast.success("Quote generated successfully!");
    },
    onError: (error) => {
      console.error("Quote generation failed:", error);
      toast.error("Failed to generate quote. Please try again.");
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BuyMotorPolicyFormData>({
    resolver: zodResolver(buyMotorPolicySchema),
    defaultValues: {
      cover_type: "third-party",
      start_date: new Date().toISOString().split("T")[0],
      vehicle_yr_manufacture: new Date().getFullYear().toString(),
      vehicle_extra_seats: "0",
      vehicle_drive_type: "4-Wheel Drive",
      vehicle_fuel_type: "PETROL",
      buy_excess: "0",
      user_type: "private",
    },
  });

  // Handle URL parameters for cover type
  useEffect(() => {
    const policyType = searchParams.get("type");
    if (policyType && (policyType === "third-party" || policyType === "comprehensive")) {
      setValue("cover_type", policyType);
    }
  }, [searchParams, setValue]);

  const watchedUsageType = watch("vehicle_usage_type");
  const watchedCoverType = watch("cover_type");

  // Handle vehicle usage type change to auto-set seating capacity
  const handleUsageTypeChange = (value: string) => {
    setValue("vehicle_usage_type", value);
    // Trigger revalidation to clear any existing errors
    trigger("vehicle_usage_type");

    // Auto-set seating capacity based on usage type
    if (usageTypeToSeatingMapping[value]) {
      setValue("vehicle_seating", usageTypeToSeatingMapping[value]);
    }
  };

  // Helper function to transform form data to API format
  const transformFormDataToApiFormat = (data: BuyMotorPolicyFormData): PolicyQuoteRequest => {
    // Business class should always be 2 for motor insurance
    const classValue = 2;
    // Product ID varies based on coverage type: 31 = Comprehensive, 32 = Third Party
    const isComprehensive = data.cover_type === "comprehensive";
    const productId = isComprehensive ? "31" : "32";
    
    return {
      class: classValue,
      product_id: productId,
      start_date: data.start_date,
      Vehicle_registration_no: data.vehicle_registration_no,
      vehicle_usage_type: data.vehicle_usage_type,
      vehicle_make: data.vehicle_make,
      vehicle_model: data.vehicle_model,
      vehicle_yr_manufacture: data.vehicle_yr_manufacture,
      vehicle_fuel_type: data.vehicle_fuel_type || "PETROL",
      vehicle_no_cylinders: parseInt(data.vehicle_no_cylinders, 10) || 4,
      vehicle_cc: data.vehicle_cc,
      vehicle_body_type: data.vehicle_body_type || "No Body Type Entered",
      vehicle_drive_type: data.vehicle_drive_type,
      vehicle_seating: parseInt(data.vehicle_seating, 10) || 5,
      vehicle_extra_seats: parseInt(data.vehicle_extra_seats || "0", 10),
      vehicle_colour: data.vehicle_colour,
      vehicle_trim: "Automatic (A1) PETROL 2cyl 1ltrs", // Default value as per backend schema
      vehicle_engine_no: "T558956565GH4184646", // Default value as per backend schema
      vehicle_claim_free: 0, // Default value as per backend schema
      vehicle_additional_remarks: data.vehicle_chassis_no || "No additional remarks", // Use chassis number or default
      user_category_id: "1", // Default category
      customer_name: data.customer_name,
      prefcontact: data.prefcontact,
      prefemail: data.prefemail,
      user_type: data.user_type || "private",
    };
  };

  const onSubmit = async (data: BuyMotorPolicyFormData) => {
    try {
      console.log("Form data:", data);
      
      // Transform form data to API format
      const apiData = transformFormDataToApiFormat(data);
      
      console.log("Transformed API data:", apiData);
      console.log("Data types check:");
      console.log("- class:", typeof apiData.class, apiData.class);
      console.log("- vehicle_no_cylinders:", typeof apiData.vehicle_no_cylinders, apiData.vehicle_no_cylinders);
      console.log("- vehicle_seating:", typeof apiData.vehicle_seating, apiData.vehicle_seating);
      console.log("- vehicle_extra_seats:", typeof apiData.vehicle_extra_seats, apiData.vehicle_extra_seats);
      console.log("- vehicle_claim_free:", typeof apiData.vehicle_claim_free, apiData.vehicle_claim_free);
      
      // Log all field names and values for debugging
      console.log("All API fields:");
      Object.entries(apiData).forEach(([key, value]) => {
        console.log(`  ${key}: ${typeof value} = ${value}`);
      });
      
      // Set customer info and start date for the modal
      setStartDate(data.start_date);
      setCustomerInfo({
        name: data.customer_name,
        email: data.prefemail,
        phone: data.prefcontact,
      });

      // Call the mutation to generate quote
      generateQuoteMutation.mutate(apiData);

    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit quote request. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowQuoteModal(false);
    setQuoteData(null);
    setStartDate("");
    setCustomerInfo({ name: "", email: "", phone: "" });
  };


  return (
    <div className="relative z-10 w-full h-full overflow-x-clip overflow-y-hidden grid grid-rows-[auto_1fr_auto]">
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {watchedCoverType === "comprehensive" ? "Comprehensive" : "Third Party"} Motor Insurance
              </h1>
              <p className="text-sm text-gray-600">
                Complete the form below to get your policy quote
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 overflow-y-auto h-full">
        <form
          id="third-party-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Cover Type */}
          <div className="space-y-2">
            <Label htmlFor="cover_type">Cover Type</Label>
            <Select
              value={watchedCoverType || ""}
              onValueChange={(value: string) => {
                setValue("cover_type", value);
                // Update URL query parameter
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set("type", value);
                setSearchParams(newSearchParams);
              }}
            >
              <SelectTrigger className={errors.cover_type ? "border-red-500" : ""}>
                <SelectValue placeholder="Select cover type" />
              </SelectTrigger>
              <SelectContent>
                {coverTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.cover_type && (
              <p className="text-sm text-red-600">
                {errors.cover_type.message}
              </p>
            )}
          </div>

          {/* Duration and Start Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duration</Label>
              <div className="px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-md">
                <span className="text-gray-700">Annual</span>
              </div>
            </div>
            <div className="space-y-2">
              <DatePicker
                label="Start Date"
                placeholder="Select policy start date"
                value={watch("start_date") ? new Date(watch("start_date")) : undefined}
                onChange={(date) => {
                  setValue("start_date", date ? date.toISOString().split('T')[0] : "");
                  trigger("start_date");
                }}
                minDate={new Date()}
                className={errors.start_date ? "border-red-500" : ""}
              />
              {errors.start_date && (
                <p className="text-sm text-red-600">
                  {errors.start_date.message}
                </p>
              )}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Customer Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Customer Information
            </h3>

            {/* Customer Name and Vehicle Registration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer_name">Customer Name</Label>
                <Input
                  {...register("customer_name")}
                  placeholder="Enter your full name"
                  className={errors.customer_name ? "border-red-500" : ""}
                />
                {errors.customer_name && (
                  <p className="text-sm text-red-600">
                    {errors.customer_name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle_registration_number">
                  Vehicle Registration Number
                </Label>
                <Input
                  {...register("vehicle_registration_no")}
                  placeholder="e.g. GR-1234-20"
                  className={
                    errors.vehicle_registration_no ? "border-red-500" : ""
                  }
                />
                {errors.vehicle_registration_no && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_registration_no.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Number and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prefcontact">Contact Number</Label>
                <Input
                  {...register("prefcontact")}
                  placeholder="0XXXXXXXXX"
                  className={errors.prefcontact ? "border-red-500" : ""}
                />
                {errors.prefcontact && (
                  <p className="text-sm text-red-600">
                    {errors.prefcontact.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  {...register("prefemail")}
                  placeholder="your.email@example.com"
                  className={errors.prefemail ? "border-red-500" : ""}
                />
                {errors.prefemail && (
                  <p className="text-sm text-red-600">
                    {errors.prefemail.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Vehicle Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Vehicle Information
            </h3>

            {/* Vehicle Make and Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_make">Make</Label>
                <Input
                  {...register("vehicle_make")}
                  placeholder="e.g. Toyota"
                  className={errors.vehicle_make ? "border-red-500" : ""}
                />
                {errors.vehicle_make && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_make.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle_model">Model</Label>
                <Input
                  {...register("vehicle_model")}
                  placeholder="e.g. Camry"
                  className={errors.vehicle_model ? "border-red-500" : ""}
                />
                {errors.vehicle_model && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_model.message}
                  </p>
                )}
              </div>
            </div>

            {/* Year of Manufacture and Cubic Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_yr_manufacture">
                  Year of Manufacture
                </Label>
                <Input
                  type="number"
                  {...register("vehicle_yr_manufacture")}
                  placeholder="e.g. 2024"
                  className={
                    errors.vehicle_yr_manufacture ? "border-red-500" : ""
                  }
                />
                {errors.vehicle_yr_manufacture && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_yr_manufacture.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle_cc">Cubic Capacity (CC)</Label>
                <Input
                  type="number"
                  {...register("vehicle_cc")}
                  placeholder="e.g. 1800"
                  className={errors.vehicle_cc ? "border-red-500" : ""}
                />
                {errors.vehicle_cc && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_cc.message}
                  </p>
                )}
              </div>
            </div>

            {/* Vehicle Usage and Color */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_usage_type">Vehicle Usage</Label>
                <SearchableSelect
                  options={vehicleUsageOptions}
                  selectedValue={watchedUsageType || ""}
                  onValueChange={handleUsageTypeChange}
                  placeholder="Select usage type"
                  searchPlaceholder="Search usage types..."
                  emptyMessage="No usage types found."
                  error={!!errors.vehicle_usage_type}
                />
                {errors.vehicle_usage_type && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_usage_type.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle_colour">Vehicle Color</Label>
                <Input
                  {...register("vehicle_colour")}
                  placeholder="e.g. White"
                  className={errors.vehicle_colour ? "border-red-500" : ""}
                />
                {errors.vehicle_colour && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_colour.message}
                  </p>
                )}
              </div>
            </div>

            {/* Seating Capacity and Extra Seats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_seating">Seating Capacity</Label>
                <Input
                  type="number"
                  {...register("vehicle_seating")}
                  disabled
                  className="bg-gray-50"
                />
                {errors.vehicle_seating && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_seating.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle_extra_seats">Extra Seats</Label>
                <Input
                  type="number"
                  {...register("vehicle_extra_seats")}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Chassis Number and Number of Cylinders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_chassis_no">Chassis Number</Label>
                <Input
                  {...register("vehicle_chassis_no")}
                  placeholder="Enter chassis number"
                  className={errors.vehicle_chassis_no ? "border-red-500" : ""}
                />
                {errors.vehicle_chassis_no && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_chassis_no.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle_no_cylinders">
                  Number of Cylinders
                </Label>
                <Input
                  type="number"
                  {...register("vehicle_no_cylinders")}
                  placeholder="e.g. 4"
                  min="1"
                  className={
                    errors.vehicle_no_cylinders ? "border-red-500" : ""
                  }
                />
                {errors.vehicle_no_cylinders && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_no_cylinders.message}
                  </p>
                )}
              </div>
            </div>

            {/* Body Type and Drive Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_body_type">Body Type</Label>
                <div className="space-y-2">
                  {displayBodyTypeAsSelect ? (
                    <SearchableSelect
                      options={vehicleBodyTypeOptions}
                      selectedValue={watch("vehicle_body_type") || ""}
                      onValueChange={(value) => {
                        setValue("vehicle_body_type", value);
                        trigger("vehicle_body_type");
                      }}
                      placeholder="Select body type"
                      searchPlaceholder="Search body types..."
                      emptyMessage="No body types found."
                      error={!!errors.vehicle_body_type}
                    />
                  ) : (
                    <Input
                      {...register("vehicle_body_type")}
                      placeholder="Enter custom body type"
                      className={
                        errors.vehicle_body_type ? "border-red-500" : ""
                      }
                    />
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setDisplayBodyTypeAsSelect(!displayBodyTypeAsSelect)
                    }
                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    {displayBodyTypeAsSelect
                      ? "Enter custom value"
                      : "Choose from list"}
                  </button>
                </div>
                {errors.vehicle_body_type && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_body_type.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle_drive_type">Drive Type</Label>
                <Select
                  value={watch("vehicle_drive_type") || ""}
                  onValueChange={(value) => setValue("vehicle_drive_type", value)}
                >
                  <SelectTrigger className={errors.vehicle_drive_type ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select drive type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleDriveTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.vehicle_drive_type && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle_drive_type.message}
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Buy Excess and Fuel Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Buy Excess */}
            <div className="space-y-2">
              <Label htmlFor="buy_excess">Buy Excess</Label>
              <Select
                value={watch("buy_excess") || ""}
                onValueChange={(value) => setValue("buy_excess", value)}
              >
                <SelectTrigger className={errors.buy_excess ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select buy excess" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No/Not Applicable</SelectItem>
                  <SelectItem value="1">Yes/Bought</SelectItem>
                </SelectContent>
              </Select>
              {errors.buy_excess && (
                <p className="text-sm text-red-600">
                  {errors.buy_excess.message}
                </p>
              )}
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <Label htmlFor="vehicle_fuel_type">Fuel Type</Label>
              <Select
                value={watch("vehicle_fuel_type") || ""}
                onValueChange={(value) => setValue("vehicle_fuel_type", value)}
              >
                <SelectTrigger className={errors.vehicle_fuel_type ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleFuelTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicle_fuel_type && (
                <p className="text-sm text-red-600">
                  {errors.vehicle_fuel_type.message}
                </p>
              )}
            </div>
          </div>

          {/* Comprehensive Insurance Specific Fields */}
          {watchedCoverType === "comprehensive" && (
            <>
              <Separator className="my-6" />
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Comprehensive Insurance Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sum Insured */}
                  <div className="space-y-2">
                    <Label htmlFor="sum_insured">Sum Insured</Label>
                    <Input
                      id="sum_insured"
                      type="text"
                      placeholder="Enter the value of your vehicle"
                      {...register("sum_insured")}
                      className={errors.sum_insured ? "border-red-500" : ""}
                    />
                    {errors.sum_insured && (
                      <p className="text-sm text-red-600">
                        {errors.sum_insured.message}
                      </p>
                    )}
                  </div>

                  {/* User Type */}
                  <div className="space-y-2">
                    <Label htmlFor="user_type">User Type</Label>
                    <Select
                      value={watch("user_type") || ""}
                      onValueChange={(value) => setValue("user_type", value)}
                    >
                      <SelectTrigger className={errors.user_type ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.user_type && (
                      <p className="text-sm text-red-600">
                        {errors.user_type.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Add bottom padding to prevent content from being hidden behind fixed button */}
          <div className="pb-24"></div>
        </form>
      </div>

      {/* Fixed Submit Button */}
      <div className="bg-linear-to-b from-white to-transparent border-t border-gray-200 p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <Button
            type="submit"
            size="lg"
            disabled={generateQuoteMutation.isPending}
            className="w-full"
            form="third-party-form"
          >
            {generateQuoteMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Quote...
              </>
            ) : (
              "Get Quote Now"
            )}
          </Button>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && quoteData && (
        <MotorQuoteModal
          isOpen={showQuoteModal}
          onClose={handleCloseModal}
          quoteData={quoteData}
          coverType={watchedCoverType}
          startDate={startDate}
          customerInfo={customerInfo}
        />
      )}
    </div>
  );
}

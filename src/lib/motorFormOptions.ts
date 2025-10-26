// Motor form options for vehicle insurance forms
// This file contains all the select options used in motor insurance forms

export interface SelectOption {
  value: string;
  label: string;
}

// Cover Type Options
export const coverTypeOptions: SelectOption[] = [
  { value: "third-party", label: "Third Party" },
  { value: "comprehensive", label: "Comprehensive" },
];

// Vehicle usage types with their corresponding labels
export const vehicleUsageOptions: SelectOption[] = [
  { value: "1", label: "X.1(Private Cars (Individual))" },
  { value: "2", label: "X.4(Private Cars (Corporate))" },
  { value: "3", label: "Own Goods Carrying Z.300" },
  { value: "22", label: "Own Goods Carrying Z.300 (3000+)" },
  { value: "23", label: "General Cartage Z.301 (3000+)" },
  { value: "4", label: "General Cartage Z.301" },
  { value: "5", label: "Taxis (Z.405)" },
  { value: "6", label: "Hire Cars" },
  { value: "7", label: "Mini Buses" },
  { value: "8", label: "Maxi Buses" },
  { value: "9", label: "Ambulance/Hearse" },
  { value: "10", label: "Z.802 Special Types (Road)" },
  { value: "11", label: "Z.802 Special Types (Site)" },
  { value: "12", label: "Motor Trade Plate Class 1" },
  { value: "13", label: "Motor Trade Plate Class 2" },
  { value: "14", label: "Motor Trade Plate Class 3" },
  { value: "15", label: "Motor Cycle (Individual)" },
  { value: "16", label: "Motor Cycle (Corporate)" },
  { value: "17", label: "Corporate Buses" },
  { value: "18", label: "Tankers" },
  { value: "19", label: "Articulator/Oil Tanker" },
  { value: "20", label: "TroTro Mini buses" },
];

// Vehicle body types
export const vehicleBodyTypeOptions: SelectOption[] = [
  { value: "Saloon", label: "Saloon" },
  { value: "Lift Back", label: "Lift Back" },
  { value: "Hatchback", label: "Hatchback" },
  { value: "Station Wagon", label: "Station Wagon" },
  { value: "Estate", label: "Estate" },
  { value: "Truck", label: "Truck" },
  { value: "Pick-Up Double Cabin", label: "Pick-Up Double Cabin" },
  { value: "Pick-Up Single Cabin", label: "Pick-Up Single Cabin" },
  { value: "Articulator Head", label: "Articulator Head" },
  { value: "Tanker", label: "Tanker" },
  { value: "Excavator", label: "Excavator" },
  { value: "Back Hoe", label: "Back Hoe" },
  { value: "Motor Bike", label: "Motor Bike" },
  { value: "Tricycle", label: "Tricycle" },
  { value: "Mini Van", label: "Mini Van" },
  { value: "Maxi Van", label: "Maxi Van" },
  { value: "Mini Bus", label: "Mini Bus" },
  { value: "Maxi Bus", label: "Maxi Bus" },
];

// Vehicle drive types
export const vehicleDriveTypeOptions: SelectOption[] = [
  { value: "2 Wheel Drive", label: "2 Wheel Drive" },
  { value: "4 Wheel Drive", label: "4 Wheel Drive" },
];

// Vehicle fuel types
export const vehicleFuelTypeOptions: SelectOption[] = [
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Electric", label: "Electric" },
  { value: "LPG", label: "LPG" },
  { value: "CNG", label: "CNG" },
];

// Mapping of vehicle usage types to default seating capacity
export const usageTypeToSeatingMapping: Record<string, string> = {
  "1": "5", // Private Cars (Individual)
  "2": "5", // Private Cars (Corporate)
  "3": "3", // Own Goods Carrying
  "22": "3", // Own Goods Carrying (3000+)
  "23": "3", // General Cartage (3000+)
  "4": "3", // General Cartage
  "5": "5", // Taxis
  "6": "5", // Hire Cars
  "7": "12", // Mini Buses
  "8": "23", // Maxi Buses
  "9": "5", // Ambulance/Hearse
  "10": "1", // Special Types (Road)
  "11": "1", // Special Types (Site)
  "12": "2", // Motor Trade Plate Class 1
  "13": "2", // Motor Trade Plate Class 2
  "14": "2", // Motor Trade Plate Class 3
  "15": "2", // Motor Cycle (Individual)
  "16": "2", // Motor Cycle (Corporate)
  "17": "15", // Corporate Buses
  "18": "3", // Tankers
  "19": "3", // Articulator/Oil Tanker
  "20": "12", // TroTro Mini buses
};
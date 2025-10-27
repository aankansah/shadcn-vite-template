/**
 * Helper functions for the loyalty e-insurance platform
 */

/**
 * Validates if a phone number is a valid Ghanaian phone number
 * Accepts formats like: 0241244468, +233241244468, 233241244468
 * @param phoneNumber - The phone number to validate
 * @returns boolean indicating if the phone number is valid
 */
export function isValidGhanaianPhoneNumber(phoneNumber: string): boolean {
  // Remove all spaces and special characters except + and digits
  const cleaned = phoneNumber.replace(/[\s\-()]/g, '');
  
  // Check for various Ghanaian phone number formats
  const patterns = [
    /^0[2-5][0-9]{8}$/, // Local format: 0241244468 (10 digits starting with 0)
    /^\+233[2-5][0-9]{8}$/, // International format: +233241244468
    /^233[2-5][0-9]{8}$/, // International without +: 233241244468
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
}

/**
 * Formats a Ghanaian phone number to international format (+233...)
 * @param phoneNumber - The phone number to format
 * @returns Formatted phone number with +233 prefix
 */
export function formatGhanaianPhoneNumber(phoneNumber: string): string {
  // Remove all spaces and special characters except + and digits
  const cleaned = phoneNumber.replace(/[\s\-()]/g, '');
  
  // If it starts with 0, replace with +233
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return `+233${cleaned.substring(1)}`;
  }
  
  // If it starts with 233, add +
  if (cleaned.startsWith('233') && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  
  // If it already starts with +233, return as is
  if (cleaned.startsWith('+233') && cleaned.length === 13) {
    return cleaned;
  }
  
  // If none of the above, assume it's a local number without 0 prefix
  if (cleaned.length === 9) {
    return `+233${cleaned}`;
  }
  
  // Return original if we can't format it
  return phoneNumber;
}

/**
 * Creates a validation function for Ghanaian phone numbers
 * @returns Function that validates Ghanaian phone numbers
 */
export function createGhanaianPhoneValidator() {
  return (value: string) => {
    if (!value) return false;
    return isValidGhanaianPhoneNumber(value);
  };
}
import axios from 'axios';

const GENOVA_BASE_URL = import.meta.env.VITE_GENOVA_BASE_API_URL || '/api/mobile';

// Constants for business class numbers
export const BusinessClassNumber = {
  Comprehensive: 1,
  ThirdParty: 2
} as const;

export const ProductIds = {
  Motor: 32
} as const;

export type BusinessClassNumberType = typeof BusinessClassNumber[keyof typeof BusinessClassNumber];
export type ProductIdsType = typeof ProductIds[keyof typeof ProductIds];

// Base response interface
interface BaseResponse {
  message: string;
  data: unknown;
  success: boolean;
}

// Policy Quote interfaces
export interface PolicyQuoteRequest {
  class: BusinessClassNumberType;
  product_id: string;
  start_date: string;
  Vehicle_registration_no: string;
  vehicle_usage_type: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_yr_manufacture: string;
  vehicle_fuel_type?: string;
  vehicle_no_cylinders?: number;
  vehicle_cc: string;
  vehicle_body_type?: string;
  vehicle_drive_type: string;
  vehicle_seating: number;
  vehicle_extra_seats: number;
  vehicle_colour: string;
  vehicle_trim?: string;
  vehicle_engine_no?: string;
  vehicle_claim_free?: number;
  vehicle_additional_remarks: string;
  user_category_id: string;
  customer_name: string;
  prefcontact: string;
  prefemail: string;
  user_type: string;
}

export type PolicyQuoteResponse = BaseResponse;

// Policy Creation interfaces
export interface PolicyCreateRequest {
  class: BusinessClassNumberType;
  product_id?: ProductIdsType;
  start_date: string;
  policy_start: string;
  vehicle_registration_no: string;
  vehicle_usage_type: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_yr_manufacture: string;
  vehicle_fuel_type: string;
  vehicle_no_cylinders: string;
  vehicle_cc: string;
  vehicle_body_type: string;
  vehicle_drive_type: string;
  vehicle_seating: string;
  vehicle_extra_seats: string;
  vehicle_colour: string;
  vehicle_trim: string;
  vehicle_engine_no: string;
  vehicle_claim_free: string;
  vehicle_additional_remarks: string;
  user_category_id: string;
  customer_name: string;
  prefcontact: string;
  prefemail: string;
  buy_excess: string;
  vehicle_chassis_no: string;
  vehicle_type: string;
  user_type: string;
}

export type PolicyCreateResponse = BaseResponse;

// Policy Search interfaces
export interface PolicySearchRequest {
  policy_no?: string;
  vehicle_number?: string;
}

export type PolicySearchResponse = BaseResponse;

// Debit Note interfaces
export interface DebitNoteRequest {
  policy_id: string;
}

export type DebitNoteResponse = BaseResponse;

// Pay Policy interfaces
export interface PayPolicyRequest {
  policy_id: string;
}

export type PayPolicyResponse = BaseResponse;

// Policy Renewal interfaces
export interface PolicyRenewalRequest {
  policy_no: string;
  effective_date: string;
}

export type PolicyRenewalResponse = BaseResponse;

// Customer Creation interfaces
export interface CustomerCreateRequest {
  customer_name: string;
  prefcontact: string;
  prefemail: string;
  user_type: string;
}

export type CustomerCreateResponse = BaseResponse;

// Customer Search interfaces
export interface CustomerSearchRequest {
  phone_number: string;
}

export type CustomerSearchResponse = BaseResponse;

// Push to MID interfaces
export interface PushToMidRequest {
  policy_no: string;
}

export type PushToMidResponse = BaseResponse;

export const genovaService = {
  /**
   * Generate a quote for a motor insurance policy
   */
  generatePolicyQuote: async (quoteData: PolicyQuoteRequest): Promise<PolicyQuoteResponse> => {
    try {
      const response = await axios.post(`${GENOVA_BASE_URL}/policyQuote`, quoteData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Policy quote generation error:', error);
      throw error;
    }
  },

  /**
   * Create a new motor insurance policy
   */
  createPolicy: async (policyData: PolicyCreateRequest): Promise<PolicyCreateResponse> => {
    try {
      const response = await axios.post(`${GENOVA_BASE_URL}/policy`, policyData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Policy creation error:', error);
      throw error;
    }
  },

  /**
   * Search for policies by policy number or vehicle registration number
   */
  searchPolicy: async (searchData: PolicySearchRequest): Promise<PolicySearchResponse> => {
    try {
      const response = await axios.post(`${GENOVA_BASE_URL}/policy-search`, searchData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Policy search error:', error);
      throw error;
    }
  },

  /**
   * Generate a debit note for a specific policy
   */
  generateDebitNote: async (debitData: DebitNoteRequest): Promise<DebitNoteResponse> => {
    try {
      const response = await axios.post(`${GENOVA_BASE_URL}/generate-debit-note`, debitData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Debit note generation error:', error);
      throw error;
    }
  },

  /**
   * Process payment for a policy
   */
  payPolicy: async (paymentData: PayPolicyRequest): Promise<PayPolicyResponse> => {
    try {
      const response = await axios.post(`${GENOVA_BASE_URL}/pay-policy`, paymentData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Policy payment error:', error);
      throw error;
    }
  },

  /**
   * Renew an existing policy
   */
  renewPolicy: async (renewalData: PolicyRenewalRequest): Promise<PolicyRenewalResponse> => {
    try {
      const response = await axios.post(`${GENOVA_BASE_URL}/policy-renew`, renewalData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Policy renewal error:', error);
      throw error;
    }
  },

  /**
   * Create a new customer record
   */
  createCustomer: async (customerData: CustomerCreateRequest): Promise<CustomerCreateResponse> => {
    try {
      const response = await axios.post(`${GENOVA_BASE_URL}/customer-create`, customerData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Customer creation error:', error);
      throw error;
    }
  },

  /**
   * Search for existing customers by phone number
   */
  searchCustomer: async (searchData: CustomerSearchRequest): Promise<CustomerSearchResponse> => {
    try {
      const response = await axios.post(`${GENOVA_BASE_URL}/customer-search`, searchData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Customer search error:', error);
      throw error;
    }
  },

  /**
   * Push policy data to the MID (Motor Insurance Database)
   */
  pushToMid: async (midData: PushToMidRequest): Promise<PushToMidResponse> => {
    try {
      const response = await axios.post(`${GENOVA_BASE_URL}/push-to-mid`, midData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Push to MID error:', error);
      throw error;
    }
  },
};

export default genovaService;
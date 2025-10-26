# Genova API Documentation

## Overview

The Genova API is a comprehensive insurance management system that provides endpoints for managing motor insurance policies, customers, and related operations. It acts as a proxy service to the Genova insurance platform, handling policy quotes, creation, payments, renewals, and customer management.

## Base Configuration

- **Base URL**: Configured via `GENOVA_BASE_API_URL` environment variable
- **Authentication**: Basic Authentication using `GENOVA_USERNAME` and `GENOVA_PASSWORD`
- **Content-Type**: `application/x-www-form-urlencoded`

## API Endpoints

### 1. Policy Quote Generation

**Endpoint**: `POST /policyQuote`

Generates a quote for a motor insurance policy based on vehicle and customer details.

#### Request Body Schema

```typescript
{
  class: BusinessClassNumber, // 1 = Comprehensive, 2 = ThirdParty
  product_id: string, // Numeric string (e.g., "32" for Motor)
  start_date: string, // Format: YYYY-MM-DD
  Vehicle_registration_no: string,
  vehicle_usage_type: string, // Numeric string
  vehicle_make: string,
  vehicle_model: string,
  vehicle_yr_manufacture: string, // 4-digit year
  vehicle_fuel_type?: string, // Default: "PETROL"
  vehicle_no_cylinders?: number, // Default: 4
  vehicle_cc: string,
  vehicle_body_type?: string, // Default: "No Body Type Entered"
  vehicle_drive_type: string,
  vehicle_seating: number,
  vehicle_extra_seats: number,
  vehicle_colour: string,
  vehicle_trim?: string, // Default: "Automatic (A1) PETROL 2cyl 1ltrs"
  vehicle_engine_no?: string, // Default: "T558956565GH4184646"
  vehicle_claim_free?: number, // Default: 0
  vehicle_additional_remarks: string,
  user_category_id: string, // Numeric string
  customer_name: string,
  prefcontact: string, // Phone number (10+ digits)
  prefemail: string, // Valid email address
  user_type: string
}
```

#### Example Request

```json
{
  "class": 1,
  "product_id": "32",
  "start_date": "2024-01-15",
  "Vehicle_registration_no": "ABC123",
  "vehicle_usage_type": "1",
  "vehicle_make": "Toyota",
  "vehicle_model": "Camry",
  "vehicle_yr_manufacture": "2020",
  "vehicle_fuel_type": "PETROL",
  "vehicle_no_cylinders": 4,
  "vehicle_cc": "2000",
  "vehicle_body_type": "Sedan",
  "vehicle_drive_type": "FWD",
  "vehicle_seating": 5,
  "vehicle_extra_seats": 0,
  "vehicle_colour": "White",
  "vehicle_trim": "Automatic (A1) PETROL 4cyl 2ltrs",
  "vehicle_engine_no": "T558956565GH4184646",
  "vehicle_claim_free": 0,
  "vehicle_additional_remarks": "No additional remarks",
  "user_category_id": "1",
  "customer_name": "John Doe",
  "prefcontact": "1234567890",
  "prefemail": "john.doe@example.com",
  "user_type": "individual"
}
```

#### Response

```json
{
  "message": "Quote generated successfully.",
  "data": {
    // Quote details from Genova API
  },
  "success": true
}
```

---

### 2. Policy Creation

**Endpoint**: `POST /policy`

Creates a new motor insurance policy.

#### Request Body Schema

```typescript
{
  class: BusinessClassNumber, // 1 = Comprehensive, 2 = ThirdParty
  product_id?: ProductIds, // Default: 32 (Motor)
  start_date: string, // Format: YYYY-MM-DD
  policy_start: string, // Format: YYYY-MM-DD
  vehicle_registration_no: string,
  vehicle_usage_type: string,
  vehicle_make: string,
  vehicle_model: string,
  vehicle_yr_manufacture: string, // 4-digit year
  vehicle_fuel_type: string,
  vehicle_no_cylinders: string,
  vehicle_cc: string,
  vehicle_body_type: string,
  vehicle_drive_type: string,
  vehicle_seating: string,
  vehicle_extra_seats: string,
  vehicle_colour: string,
  vehicle_trim: string,
  vehicle_engine_no: string,
  vehicle_claim_free: string,
  vehicle_additional_remarks: string,
  user_category_id: string,
  customer_name: string,
  prefcontact: string, // Phone number (10+ digits)
  prefemail: string, // Valid email address
  buy_excess: string,
  vehicle_chassis_no: string,
  vehicle_type: string,
  user_type: string
}
```

#### Example Request

```json
{
  "class": 1,
  "product_id": 32,
  "start_date": "2024-01-15",
  "policy_start": "2024-01-15",
  "vehicle_registration_no": "ABC123",
  "vehicle_usage_type": "1",
  "vehicle_make": "Toyota",
  "vehicle_model": "Camry",
  "vehicle_yr_manufacture": "2020",
  "vehicle_fuel_type": "PETROL",
  "vehicle_no_cylinders": "4",
  "vehicle_cc": "2000",
  "vehicle_body_type": "Sedan",
  "vehicle_drive_type": "FWD",
  "vehicle_seating": "5",
  "vehicle_extra_seats": "0",
  "vehicle_colour": "White",
  "vehicle_trim": "Automatic",
  "vehicle_engine_no": "ENG123456",
  "vehicle_claim_free": "0",
  "vehicle_additional_remarks": "No remarks",
  "user_category_id": "1",
  "customer_name": "John Doe",
  "prefcontact": "1234567890",
  "prefemail": "john.doe@example.com",
  "buy_excess": "0",
  "vehicle_chassis_no": "CHASSIS123",
  "vehicle_type": "Private",
  "user_type": "individual"
}
```

#### Response

```json
{
  "message": "Policy created successfully.",
  "data": {
    // Policy details from Genova API
  },
  "success": true
}
```

---

### 3. Policy Search

**Endpoint**: `POST /policy-search`

Searches for existing policies by policy number or vehicle registration number.

#### Request Body Schema

```typescript
{
  policy_no?: string, // Optional policy number
  vehicle_number?: string // Optional vehicle registration number
}
```

**Note**: At least one of `policy_no` or `vehicle_number` must be provided.

#### Example Request

```json
{
  "policy_no": "POL123456"
}
```

#### Response

```json
{
  "message": "Policy retrieved successfully.",
  "data": {
    // Policy details from Genova API
  },
  "success": true
}
```

---

### 4. Generate Debit Note

**Endpoint**: `POST /generate-debit-note`

Generates a debit note for a specific policy.

#### Request Body Schema

```typescript
{
  policy_id: string
}
```

#### Example Request

```json
{
  "policy_id": "POL123456"
}
```

#### Response

```json
{
  "message": "Debit note generated successfully.",
  "data": {
    // Debit note details from Genova API
  },
  "success": true
}
```

---

### 5. Pay Policy

**Endpoint**: `POST /pay-policy`

Processes payment for a policy.

#### Request Body Schema

```typescript
{
  policy_id: string
}
```

#### Example Request

```json
{
  "policy_id": "POL123456"
}
```

#### Response

```json
{
  "message": "Policy paid successfully.",
  "data": {
    // Payment confirmation details from Genova API
  },
  "success": true
}
```

---

### 6. Policy Renewal

**Endpoint**: `POST /policy-renew`

Renews an existing policy.

#### Request Body Schema

```typescript
{
  policy_no: string,
  effective_date: string // Valid date format
}
```

#### Example Request

```json
{
  "policy_no": "POL123456",
  "effective_date": "2024-12-31"
}
```

#### Response

```json
{
  "message": "Policy renewed successfully.",
  "data": {
    // Renewal details from Genova API
  },
  "success": true
}
```

---

### 7. Customer Creation

**Endpoint**: `POST /customer-create`

Creates a new customer record.

#### Request Body Schema

```typescript
{
  customer_name: string,
  prefcontact: string, // Phone number
  prefemail: string, // Email address
  user_type: string
}
```

#### Example Request

```json
{
  "customer_name": "Jane Smith",
  "prefcontact": "9876543210",
  "prefemail": "jane.smith@example.com",
  "user_type": "individual"
}
```

#### Response

```json
{
  "message": "Customer created successfully.",
  "data": {
    // Customer details from Genova API
  },
  "success": true
}
```

---

### 8. Customer Search

**Endpoint**: `POST /customer-search`

Searches for existing customers by phone number.

#### Request Body Schema

```typescript
{
  phone_number: string
}
```

#### Example Request

```json
{
  "phone_number": "9876543210"
}
```

#### Response

```json
{
  "message": "Customer retrieved successfully.",
  "data": {
    // Customer details from Genova API
  },
  "success": true
}
```

---

### 9. Push to MID

**Endpoint**: `POST /push-to-mid`

Pushes policy data to the MID (Motor Insurance Database).

#### Request Body Schema

```typescript
{
  policy_no: string
}
```

#### Example Request

```json
{
  "policy_no": "POL123456"
}
```

#### Response

```json
{
  "message": "Policy pushed to MID.",
  "data": {
    // MID push confirmation from Genova API
  },
  "success": true
}
```

---

## Data Types and Enums

### BusinessClassNumber

```typescript
enum BusinessClassNumber {
  Comprehensive = 1,
  ThirdParty = 2
}
```

### ProductIds

```typescript
enum ProductIds {
  Motor = 32
}
```

## Error Handling

All endpoints use standardized error handling through the application's middleware. Validation errors will return detailed messages about which fields are invalid and why.

### Common Validation Rules

- **Dates**: Must be in YYYY-MM-DD format and represent valid dates
- **Phone Numbers**: Must be at least 10 digits
- **Email Addresses**: Must be valid email format
- **Numeric Strings**: Fields like `product_id`, `user_category_id`, etc. must contain only digits
- **Year Fields**: Must be 4-digit years

## Authentication

The API uses Basic Authentication to communicate with the Genova platform. Credentials are configured through environment variables:

- `GENOVA_USERNAME`
- `GENOVA_PASSWORD`
- `GENOVA_BASE_API_URL`

## Architecture

The Genova API follows a layered architecture:

1. **Router** (`genova.router.ts`): Defines routes and applies validation middleware
2. **Controller** (`genova.controller.ts`): Handles HTTP requests and responses
3. **Service** (`genova.service.ts`): Contains business logic and external API calls
4. **Client** (`genova.client.ts`): Configured Axios instance for Genova API communication
5. **DTOs** (`genova.dto.ts`): Zod schemas for request validation
6. **Types** (`genova.types.ts`): TypeScript type definitions

## Usage Notes

- All requests are validated using Zod schemas before processing
- The API acts as a proxy to the Genova insurance platform
- Response data structure depends on the Genova API responses
- Some fields have default values to simplify common use cases
- The repository layer is currently empty but available for future database operations
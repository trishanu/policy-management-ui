export interface Customer {
  id?: number;
  customerNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;   // Format: YYYY-MM-DD
  createdAt?: string;    // Returned by the backend
}
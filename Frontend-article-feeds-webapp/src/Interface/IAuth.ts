// src/types/authTypes.ts
export interface SignupRequest {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: Date;
    password: string;
    preferences: string[];
  }
  
  export interface SignupResponse {
    message: string;
    data: string; // This is the token
  }
  
  export interface LoginRequest {
    identifier: string; // Can be email or phone
    password: string;
  }
  
  export interface LoginResponse {
    data: string; // This is the token
  }
  
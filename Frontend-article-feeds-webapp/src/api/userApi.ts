// src/api/userApi.ts

import api from './clientApi';

// Define types for API responses (adjust based on actual response structure)
interface UserProfileResponse {
  data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: string; // Assuming the API returns date as a string
    preferences: string[];
  };
}

interface UpdateResponse {
  success: boolean;
  user: UpdateUserdata; // Ensure this reflects the API's casing
}

interface UpdateUserdata {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  oldPassword: string; // New property for old password
  newPassword: string; // New property for new password
  preferences: string[];
}

// Get User Profile
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  try {
    const response = await api.get<UserProfileResponse>('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; // Consider creating a custom error type if needed
  }
};


// Update User Profile
// src/types/user.ts
export interface UpdateUserProfileData {
  firstName?: string;
  lastName?: string;
  preferences?: string[];
}

export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}


// src/api/userApi.ts

export const updateUserProfile = async (updateUserData: UpdateUserProfileData): Promise<UpdateResponse> => {
  try {
    const response = await api.put<UpdateResponse>('/users/profile', updateUserData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const updateUserPassword = async (passwordData: UpdatePasswordData): Promise<UpdateResponse> => {
  try {
    const response = await api.put<UpdateResponse>('/users/password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};
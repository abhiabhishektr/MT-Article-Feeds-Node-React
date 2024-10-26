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
    const response = await api.get<UserProfileResponse>('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; // Consider creating a custom error type if needed
  }
};

// Update User Profile
export const updateUserProfile = async (updateUserData: UpdateUserdata): Promise<UpdateResponse> => {
  console.log("updateUserData: ", updateUserData);
  try {
    const response = await api.put<UpdateResponse>('/users/profile', updateUserData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error; // Consider creating a custom error type if needed
  }
};

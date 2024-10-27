// Frontend-article-feeds-webapp/src/api/authApi.ts
import { BASE_URL } from '@/config';
import axios, { AxiosInstance } from 'axios';


interface LoginResponse {
    message: string;
    data: {
        token: string,
        user: string
    }; // Token
}

// Create an Axios instance with a base URL
const api: AxiosInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: 5000,
});

// Signup request
// Define the SignupResponse interface
interface SignupResponse {
    message: string; // Message from the server
    data: { token: string };    // Token returned from the server
}

// Modify the signup function
// Signup request
export const signup = async (userData: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: Date;
    password: string;
    preferences: string[];
}): Promise<SignupResponse> => { // Expecting to return a string (token)
    try {
        const response = await api.post<SignupResponse>('/auth/signup', userData);
        console.log("response.data: ", response);
        // console.log("response.data: ", response.data);
        return response.data; // Return the token, which is inside response.data
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};

// Login request
export const login = async (credentials: {
    identifier: string;
    password: string;
}): Promise<LoginResponse> => { // Specify the return type
    try {
        const response = await api.post<LoginResponse>('/auth/login', credentials);
        console.log("response.data: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export default api;

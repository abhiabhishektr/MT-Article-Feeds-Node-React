// utils/response.ts
import { Response } from 'express';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T; // Optional data field
  }
  
  const sendResponse = <T>(res: Response, status: number, message: string, data?: T): Response => {
    // console.log(message);
    const response: ApiResponse<T> = {
      success: status >= 200 && status < 300,
      message,
      data,
    };
  
    return res.status(status).json(response);
  };
  
  export default sendResponse;
  
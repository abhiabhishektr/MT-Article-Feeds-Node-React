import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT_EXPIRY, JWT_SECRET } from '../config/jwt';
import sendResponse from '../utils/response';

// Signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, phone, email, dob, password, preferences } = req.body;

  // Check for required fields
  if (!firstName || !lastName || !phone || !email || !dob || !password) {
    sendResponse(res, 400, 'All fields are required');
    return;
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        sendResponse(res, 409, 'Email is already in use');
      } else if (existingUser.phone === phone) {
        sendResponse(res, 409, 'Phone number is already in use');
      }
      return;
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      dob,
      password,
      preferences,
    });

    const savedUser = await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    
    sendResponse(res, 201, 'User created successfully', { token });
  } catch (error) {
    sendResponse(res, 400, 'Error creating user');
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
   
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user || !(await user.comparePassword(password))) {
      sendResponse(res, 401, 'Invalid credentials');
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    sendResponse(res, 200, 'Login successful', { token , user: user.firstName});
  } catch (error) {
    sendResponse(res, 500, 'Internal server error');
  }
};

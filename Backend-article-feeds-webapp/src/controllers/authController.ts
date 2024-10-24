import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT_EXPIRY, JWT_SECRET } from '../config/jwt';
import sendResponse from '../utils/response';

// Signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, phone, email, dob, password, preferences } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    phone,
    email,
    dob,
    password,
    preferences,
  });

  try {
    const savedUser = await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    
    sendResponse(res, 201, 'User created successfully', { token  });
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

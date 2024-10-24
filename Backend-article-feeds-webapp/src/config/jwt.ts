import { env } from "./env";

export const JWT_SECRET = env.JWT_SECRET || 'github.com/abhiabhishektr';
export const JWT_EXPIRY = '1d';  // Token expiry duration

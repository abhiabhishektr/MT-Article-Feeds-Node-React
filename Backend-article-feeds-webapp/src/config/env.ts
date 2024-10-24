import * as dotenv from "dotenv";

dotenv.config();

interface Env {
    MONGODB_URI: string;
    JWT_SECRET: string;
    PORT: number;
}

export const env: Env = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/MT-Article-Feeds-Node-React',
    JWT_SECRET: process.env.JWT_SECRET || 'github.com/abhiabhishektr',
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000 
};

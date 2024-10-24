// Backend-article-feeds-webapp/src/types/express/index.d.ts
import { IJwtPayload } from '../jwtPayload';
import { IJwtToken } from '../jwtToken';
  // Adjust the import path as needed

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
      token?: string;
    }
  }
}
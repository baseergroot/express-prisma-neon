// src/types/express.d.ts
import { User as MyUserType } from "../models/user.model"; // Import your actual User type

declare global {
  namespace Express {
    interface Request {
      user?: MyUserType; // Use '?' if the user is not present on every request
    }
  }
}

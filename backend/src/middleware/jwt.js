import { expressjwt } from 'express-jwt';

// Define the middleware for requiring authentication
export const requireAuth = expressjwt({
  secret: () => process.env.JWT_SECRET, // Retrieves the secret from environment variables
  algorithms: ['HS256'], // The algorithm used to sign the JWT
});

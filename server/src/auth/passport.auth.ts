import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Define your user model if you have one
interface User {
  id: string;
  // other user properties
}

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const jwtSecret = process.env.JWT_SECRET as string;

// JWT Authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret, // Replace with your actual JWT secret
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // You can customize this based on your user model and authentication logic
    const user: User = { id: jwtPayload.sub };
    return done(null, user);
  })
);

// Google OAuth Authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // You can customize this based on your user model and authentication logic
      const user: User = { id: profile.id };
      return done(null, user);
    }
  )
);

// Middleware to handle both JWT and Google OAuth authentication
export function authenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    ["jwt", "google"],
    { session: false },
    (err: any, user: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;

      return next();
    }
  )(req, res, next);
}

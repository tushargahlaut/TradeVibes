import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { DecodeJWTToken } from "../utils/jwt.utils";
import { JWTInterface } from "../interfaces/jwtpayload.interface";

dotenv.config();
declare global {
  namespace Express {
    interface Request {
      user?: JWTInterface;
    }
  }
}

export const VerifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No Token was provided",
    });
  }
  try {
    const decodedToken = DecodeJWTToken(token);
    req.user = decodedToken;
    next();
    return res.status(200);
  } catch (error) {
    console.log("Couldn't Verify Token", error);
    return res.status(401).json({
      message: "Couldn't verify token",
    });
  }
};

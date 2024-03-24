import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { JWTInterface } from "../interfaces/jwtpayload.interface";
import { IBasicUserOutput } from "../interfaces/user.interface";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;

export const GenerateJWTToken = (payload: IBasicUserOutput): string => {
  const token = jwt.sign({ payload }, jwtSecret, { expiresIn: "2h" });
  return token;
};

export const DecodeJWTToken = (token: string): JWTInterface => {
  const payload = jwt.verify(token, jwtSecret) as JWTInterface;
  return payload;
};

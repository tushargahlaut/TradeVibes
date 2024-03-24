import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
}

export interface IBasicUserInput {
  name: string;
  email: string;
  password: string;
}

export interface IBasicUserOutput extends Omit<IBasicUserInput, "password"> {}

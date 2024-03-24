import {
  BasicLoginDAL,
  BasicSignupDAL,
} from "../database/mongodb/DAL/user.dal";
import {
  IBasicUserInput,
  IBasicUserOutput,
} from "../interfaces/user.interface";
import { HashPassword, VerifyPassword } from "../utils/bcrypt.utils";

interface Payload {
  email: string;
  password: string;
}

export const BasicSignupService = async (
  payload: IBasicUserInput
): Promise<IBasicUserOutput> => {
  try {
    const hashedPassword = await HashPassword(payload.password);
    payload.password = hashedPassword;
    const basicSignupData = await BasicSignupDAL(payload);
    const { name, email } = basicSignupData;
    return { name, email };
  } catch (error: any) {
    if (error?.message === "email should be unique") {
      throw new Error("email should be unique");
    }
    console.log("Error in Basic Signup Service", error);
    throw new Error("Error in Basic Signup Service" + error.message);
  }
};

export const BasicLoginService = async (payload: Payload): Promise<any> => {
  try {
    const userDetails = await BasicLoginDAL(payload.email);
    if (userDetails === null) {
      throw new Error("user doesn't exists");
    }
    const verifyPassword =
      userDetails?.password &&
      VerifyPassword(payload.password, userDetails?.password);
    if (!verifyPassword) {
      throw new Error("Incorrect Password");
    }
    const { name, email } = userDetails;
    return { name, email };
  } catch (error: any) {
    console.log("Error in BasicLoginService", error);
    throw new Error(error?.message);
  }
};

import {
  BasicLoginDAL,
  BasicSignupDAL,
  GoogleLoginDAL,
} from "../database/mongodb/DAL/user.dal";
import {
  IBasicUserInput,
  IBasicUserOutput,
} from "../interfaces/user.interface";
import { HashPassword, VerifyPassword } from "../utils/bcrypt.utils";
import { encryptString } from "../utils/crypto.util";

interface BasicPayload {
  email: string;
  password: string;
}

interface GooglePayload{
  name: string;
  email: string;
}

export const BasicSignupService = async (
  payload: IBasicUserInput
): Promise<IBasicUserOutput> => {
  try {
    const hashedPassword = await HashPassword(payload.password);
    payload.password = hashedPassword;
    const basicSignupData = await BasicSignupDAL(payload);
    const { name, email, _id } = basicSignupData;
    const user_id = encryptString(_id.toString());
    return { name, email, user_id };
  } catch (error: any) {
    if (error?.message === "email should be unique") {
      throw new Error("email should be unique");
    }
    console.log("Error in Basic Signup Service", error);
    throw new Error("Error in Basic Signup Service" + error.message);
  }
};

export const BasicLoginService = async (payload: BasicPayload) => {
  try {
    const userDetails = await BasicLoginDAL(payload.email);
    if (userDetails === null) {
      throw new Error("user doesn't exists");
    }
    const verifyPassword =
      userDetails?.password &&
      (await VerifyPassword(payload.password, userDetails?.password));

    if (!verifyPassword) {
      throw new Error("Incorrect Password");
    }
    const { name, email, _id } = userDetails;
    const user_id = encryptString(_id.toString());
    return { name, email, user_id };
  } catch (error: any) {
    console.log("Error in BasicLoginService", error);
    throw new Error(error?.message);
  }
};

export const GoogleLoginService = async(payload: GooglePayload) =>{
  try {
    const basicSignupData = await GoogleLoginDAL(payload);
    const { name, email, _id } = basicSignupData;
    const user_id = encryptString(_id.toString());
    return { name, email, user_id };
  } catch (error: any) {
    if (error?.message === "email should be unique") {
      throw new Error("email should be unique");
    }
    console.log("Error in Basic Signup Service", error);
    throw new Error("Error in Basic Signup Service" + error.message);
  }
}

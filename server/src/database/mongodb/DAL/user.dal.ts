import { IBasicUserInput, IUser } from "../../../interfaces/user.interface";
import { UserModel } from "../models/user.model";

export const BasicSignupDAL = async (
  payload: IBasicUserInput
): Promise<IUser> => {
  try {
    const ifAlreadyExists = await UserModel.findOne({ email: payload.email });
    if (ifAlreadyExists) {
      throw new Error("email should be unique");
    }
    const savedUser = await UserModel.create(payload);
    return savedUser;
  } catch (error: any) {
    console.log("Error while creating user");
    throw new Error("Error in BasicSignupDAL" + error?.message);
  }
};

export const BasicLoginDAL = async (payload: string): Promise<IUser | null> => {
  try {
    const getUser = await UserModel.findOne({
      email: payload,
    });
    if (!getUser) return null;
    return getUser;
  } catch (error: any) {
    console.log("Error while creating user");
    throw new Error("Error in BasicSignupDAL" + error?.message);
  }
};

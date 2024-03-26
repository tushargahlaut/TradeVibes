import * as bcrypt from "bcrypt";

export const HashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("Couldn't Hash Password, Try Again Later");
    throw new Error("Error while hashing password");
  }
};

export const VerifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.log("Couldn't verify password, try again later", error);
    throw new Error("Error while verifying password");
  }
};

import { Request, Response } from "express";
import { validateEmail, validateName } from "../utils/formvalidator.utils";
import {
  BasicLoginService,
  BasicSignupService,
} from "../services/auth.service";
import { IBasicUserOutput } from "../interfaces/user.interface";
import { GenerateJWTToken } from "../utils/jwt.utils";
import { GoogleLoginDAL } from "../database/mongodb/DAL/user.dal";


export const BasicLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email is Missing or Invalid",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is Missing",
      });
    }
    const getUserDetails = await BasicLoginService({ email, password });
    const token = GenerateJWTToken(getUserDetails);
    return res.status(200).json({
      success: true,
      data: getUserDetails,
      token,
    });
  } catch (error: any) {
    console.log("Error in Basic Login Controller", error);
    if (error.message === "Incorrect Password") {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password, Please Try Again",
      });
    }
    if (error.message === "user doesn't exists") {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exists, Please Register",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong, try again later",
    });
  }
};

export const BasicSignupController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, Password is Missing",
      });
    }
    if (!validateName(name)) {
      return res.status(400).json({
        success: false,
        message: "Improper Validation for Name",
      });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Improper Validation for Email",
      });
    }
    const basicSignUpUser: IBasicUserOutput = await BasicSignupService({
      name,
      email,
      password,
    });
    const jwtToken = GenerateJWTToken(basicSignUpUser);

    return res.status(200).json({
      success: true,
      token: jwtToken,
      data: basicSignUpUser,
    });
  } catch (error: any) {
    if (error?.message === "email should be unique") {
      return res.status(409).json({
        success: false,
        message: "A User is already registered with this email",
      });
    }
    console.log("Error in Basic Signup Controller", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, try again later",
    });
  }
};


export const GoogleAuthController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {name, email} = req.body;
    if(!name || !email){
      return res.status(400).json({
        success: false,
        message:"Email or Name is not present"
      })
    }

    const googleAuthResult = await GoogleLoginDAL({name, email});
    const jwtToken = GenerateJWTToken(googleAuthResult);

    return res.status(200).json({
      success: true,
      token: jwtToken,
      data: googleAuthResult,
      message:"Login with Google is Success",
    });
  } catch (error: any) {
    console.log("Error", error?.message);
    return res.status(500).json({
      success: false,
      message:"Login with Google has Failed",
    })
  }
}




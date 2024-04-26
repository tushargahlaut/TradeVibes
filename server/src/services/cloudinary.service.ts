import dotenv from "dotenv";

import {v2 as cloudinary} from 'cloudinary';

dotenv.config();

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;



cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET 
});

export const handleCloudinaryUpload = async (file: string) =>{
    try {
        const res = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
          });
          return res;
    } catch (error) {
        console.log("Error occured in handle Cld Upload", error);
    }
   
}

export default cloudinary
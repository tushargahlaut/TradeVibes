import axios from "axios"
import redisClient from "../database/redis/redisClient";

const NIFTY_URL = process.env.NIFTY_URL as string;
const NIFTY_USER_AGENT = process.env.NIFTY_USER_AGENT as string;
const NIFTY_REF = process.env.NIFTY_REF as string;


export const GetNiftyDataService = async() =>{
    try {
        const redisHit = await redisClient.get("NIFTY_DATA");
        if(redisHit){
            return  JSON.parse(redisHit);
        }
        const apiReq = await axios.get(NIFTY_URL,{
            headers:{
                
                "User-Agent": NIFTY_USER_AGENT,
                "Host":	"www.nseindia.com",
                "Connection": "keep-alive",
            }
        });
        await redisClient.set("NIFTY_DATA", JSON.stringify(apiReq.data));
        await redisClient.expire("NIFTY_DATA", 10800);
        return apiReq.data;
    } catch (error: any) {
        console.log("Error in GetNiftyDataService", error);
        throw new Error(error?.message);
    }
}
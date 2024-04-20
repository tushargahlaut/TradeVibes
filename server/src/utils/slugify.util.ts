import { getRandomString } from "./crypto.util"

export const SlugifyString = (str: string) =>{
    return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') + "-" +getRandomString();
}
   
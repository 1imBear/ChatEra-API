import "regenerator-runtime";
//import bcrypt from "bcrypt";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const key16 = randomBytes(16).toString('hex');

const HashPassword = (passwd) => {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(passwd, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

const ComparePassword = (hash, passwd) => {
    const [salt, key] = hash.split(':');
    const hashBuffer = scryptSync(passwd, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    return timingSafeEqual(hashBuffer, keyBuffer);
}


// const HashPassword = async (passwd, saltRound = 10) => {
//     try {
//         var salt = await bcrypt.genSalt(saltRound);
//         var hash = await bcrypt.hash(passwd, salt)
//         return hash;
//     } catch (error) {
//         throw error;
//     }
// }

// const ComparePassword = async (ori, passwd) => {
//     try {
//         return await bcrypt.compare(passwd, ori);
//     } catch (error) {
//         throw error;
//     }
// }

export default {
    HashPassword,
    ComparePassword
}
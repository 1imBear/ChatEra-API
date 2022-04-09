import "regenerator-runtime";
import bcrypt from "bcrypt";

const HashPassword = async (passwd, saltRound = 10) => {
    try {
        var salt = await bcrypt.genSalt(saltRound);
        var hash = await bcrypt.hash(passwd, salt)
        return hash;
    } catch (error) {
        throw error;
    }
}

const ComparePassword = async (ori, passwd) => {
    try {
        return bcrypt.compare(passwd, ori);
    } catch (error) {
        throw error;
    }
}

export default {
    HashPassword,
    ComparePassword
}
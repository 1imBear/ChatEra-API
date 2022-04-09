import "regenerator-runtime/runtime"
import dbConnect from "./connectionstring";
import UserModel from "../../models/user/UserModel"

const DefaultAuthor = async (userName, passwd) => {
    dbConnect();
    try {
        var user = UserModel.findOne({
            UserName : userName,
        })
        .exec()
        .then(result => {
           return result.comparePassword(passwd)
        });

        return user;
    } catch (error) {
        throw new Error(error)
    }
}


export default DefaultAuthor
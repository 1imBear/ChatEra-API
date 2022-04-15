import "regenerator-runtime/runtime";
import HashingHelper from "../helper/HashingHelper";
import UserModel from "../models/UserModel"

const DefaultAuthor = async (userName, passwd) => {
    try {
        var user = await UserModel.findOne({
            UserName : userName,
        })
        .exec()

        if(HashingHelper.ComparePassword(user.Password, passwd)){
            return {
                id: user._id,
                PublicKey: user.PublicKey,
                Name: user.Name
            };
        }
        
        return null;
    } catch (error) {
        throw new Error(error)
    }
}

const GetOneById = async (id) => {
    try {
        const user = await UserModel.findOne({
            _id : id
        })
        .select({
            _id : 1,
            UserName : 1,
            Chats: 2
        })
        .exec();

        return user;          

    } catch (error) {
        return new Error(error)
    }
}

const GetOneByUserName = async (username) => {
    try {
        const user = await UserModel.findOne({
             UserName: username 
            })
            .select({
                _id: 1,
                UserName: 1
            })
            .exec();

        return user;          

    } catch (error) {
        return new Error(error)
    }
}

const CreateOne = async (userViewModel) => {
    try {
        var user = new UserModel({
            UserName : userViewModel.UserName,
            Password : userViewModel.Password,
            Name : userViewModel.Name
        });  
        await user.save();


        return true;
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    DefaultAuthor,
    GetOneById,
    GetOneByUserName,
    CreateOne,
}
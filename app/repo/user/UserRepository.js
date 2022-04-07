import "regenerator-runtime/runtime"
import dbConnect from "../connectionstring";
import UserModel from "../../models/user/UserModel"

const GetUserById = async (id) => {

    await dbConnect();
    try {
        const user = await UserModel.findOneById(id, {
            projection: { UserName: 1 }
        });

        return user;          

    } catch (error) {
        throw error;
    }
}

const GetUserByUserName = async (username) => {
    await dbConnect();
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
        throw error;
    }
}

const GetPasswordById = async (id, passwd) => {
    const db = dbConnect();
    try {
        return await UserModel.findOne({
            _id : id,
            Password: passwd
        })
            .select({
                Password: 1
            })
            .exec();        

    } catch (error) {
        throw error.message;
    }
}

const CreateUser = async (userViewModel) => {
    await dbConnect();
    try {
        var user = await UserModel.create({
            UserName: userViewModel.UserName,
            Password : userViewModel.Password
        });
        await user.save();
        return {
            id : user._id,
            UserName : user.UserName
        };
        
    } catch (error) {
        throw error;
    }
}

const UpdateUserById = async (id, userViewModel) => {
    await dbConnect();
    try {
        const user = await UserModel.findById(id);
        user.UserName = userViewModel.UserName;
        await user.save()
        return {
            id : user._id,
            UserName : user.UserName
        };          

    } catch (error) {
        throw error.message;
    }
}

export default {
    GetUserById,
    GetUserByUserName,
    CreateUser,
    UpdateUserById,
    GetPasswordById
}
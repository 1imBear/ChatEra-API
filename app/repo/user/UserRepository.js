import "regenerator-runtime/runtime"
import dbConnect from "../connectionstring";
import UserModel from "../../models/user/UserModel"

const GetUserById = async (id) => {

    await dbConnect();
    try {
        const user = await UserModel.findOne({
            _id : id
        })
        .select({
            _id : 1,
            UserName : 1
        })
        .exec();

        return user;          

    } catch (error) {
        return new Error(error)
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

        return {
            Id : user._id,
            UserName : user.UserName
        };          

    } catch (error) {
        return new Error(error)
    }
}

const CreateUser = async (userViewModel) => {
    await dbConnect();
    try {
        var user = new UserModel({
            UserName : userViewModel.UserName,
            Password : userViewModel.Password,
            Name : userViewModel.Name
        });

        return user.save().then(result => {
            return {
                Id : result._id,
                UserName : result.UserName
            }
        }).catch(error => {
            throw new Error(error);
        })

    } catch (error) {
        throw new Error(error);
    }
}

const UpdateUserById = async (id, userViewModel) => {
    await dbConnect();
    try {
        const user = await UserModel.findById(id);
        user.Name = userViewModel.Name;
        await user.save()
        return {
            PublicKey : user._id,
            UserName : user.UserName
        };          

    } catch (error) {
        return new Error(error)
    }
}

export default {
    GetUserById,
    GetUserByUserName,
    CreateUser,
    UpdateUserById,
}
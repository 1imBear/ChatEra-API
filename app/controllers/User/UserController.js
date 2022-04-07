import "regenerator-runtime";
import User from "../../models/user/UserModel";
import UserRepository from "../../repo/user/UserRepository";
import ExceptionModel from "../../viewmodels/exception/ExceptionViewModel";
import ExceptionPrefix from "../../helper/ExceptionPrefix";
import MessageHelper from "../../helper/ExceptionMessageHelper";

const UpdateUser = async (userViewModel) => {
    try {
        var result = ExceptionModel.printError(MessageHelper.ResponseMsg.Body_Null);
        if(userViewModel){
            result = await VerifyUserById(userViewModel.Id);
            if(result == true){
                result = await UserRepository.UpdateUserById(userViewModel.Id,userViewModel).then(res => {   
                    return res == null ?  ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, err) : ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], "User Updated", res);
                }).catch(err => {
                    return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, err);
                });
            }
        }
        return result;
    } catch (error) {
        console.warn(error.message);
        return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, error.message)
    }
}

const VerifyUserById = async (id) => {
    return UserRepository.GetUserById(id).then(res => {
        return  res == null ? ExceptionModel.map(ExceptionPrefix["SUCCESS"],  MessageHelper.UserAuthMsg.Fail, false) : true;
    }).catch(err => {
        return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserAuthMsg.Error, false);
    });
}

const VerifyUserByPublicKey = async (pubKey) => {
    return UserRepository.GetUserByPublicKey(pubKey).then(res => {
        return  res == null ? ExceptionModel.map(ExceptionPrefix["SUCCESS"],  MessageHelper.UserAuthMsg.Fail, false) : true;
    }).catch(err => {
        return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserAuthMsg.Error, false);
    });
}

export default {
    UpdateUser,
    VerifyUserByPublicKey
}
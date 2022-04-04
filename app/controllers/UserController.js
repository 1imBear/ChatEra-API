import "regenerator-runtime";
import User from "../model/UserModel";
import UserRepository from "../repositories/UserRepository";
import ExceptionModel from "../viewmodels/ExceptionModel";
import ExceptionPrefix from "../helper/ExceptionPrefix";
import MessageHelper from "../helper/ExceptionMessageHelper";

const UpdateUser = async (userViewModel) => {
    try {
        var result = ExceptionModel.printError(MessageHelper.ResponseMsg.Body_Null);
        try {
            if(userViewModel){
                result = await UserIdVerify(userViewModel.Id);
                if(result == true){
                    var user = User.map(userViewModel);
                    result = await UserRepository.UpdateUserById(userViewModel.Id,user).then(res => {   
                        return res == null ?  ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, err) : ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], "User Updated", res);
                    }).catch(err => {
                        return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, err);
                    });
                }
            }
            return result;
        } catch (error) {
            console.warn(error.message);
            return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, err)
        }
    } catch (error) {
        console.warn(error.message);
        return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, err)
    }
}

const UserIdVerify = async (id) => {
    return UserRepository.GetUserById(id).then(res => {
        return  res == null ? ExceptionModel.map(ExceptionPrefix["SUCCESS"],  MessageHelper.UserAuthMsg.Fail, false) : ExceptionModel.map(ExceptionPrefix["SUCCESS"],  MessageHelper.UserAuthMsg.Success, true);
    }).catch(err => {
        return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserAuthMsg.Error, err);
    });
}

export default {
    UpdateUser
}
import ExceptionModel from '../viewmodels/ExceptionModel';
import ExceptionPrefix from '../helper/ExceptionPrefix';
import UserRepository from "../repositories/UserRepository"
import "regenerator-runtime/runtime";
import  User from "../model/UserModel";
import MessageHelper from "../helper/ExceptionMessageHelper"

async function UserAuthentication (userViewModel) {
    try{
        if(userViewModel){
            var result =  await UserRepository.GetUserByUserName(userViewModel.UserName).then(res => {
                return PasswordAuthentication(res.Password, userViewModel.Password)
            }).catch(err => {
                return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserAuthMsg.Error, err.message);
            })
            return await result;
        }
    }
    catch(e){
        console.warn(e.message);
    }
}

function PasswordAuthentication(ori, veri){
    var result = ExceptionModel.map(
        ExceptionPrefix.ExceptionStatus["SUCCESS"],
        MessageHelper.UserAuthMsg.Fail,
        false);
    if(ori === veri){
        result.result = true;
        result.message = MessageHelper.UserAuthMsg.Success;
    }

    return result;
}

async function UserSignUp(userViewModel) {

    var result = ExceptionModel.printError(MessageHelper.ResponseMsg.Body_Null);
    try {
        if(userViewModel){
            result = await UserNameVerify(userViewModel.UserName);
            if(result == true){
                var user = User.map(userViewModel);
                result = await UserRepository.CreateUser(user).then(res => {   
                    return res;
                }).catch(err => {
                    return err;
                });
            }
        }
        return result;
    } catch (error) {
        console.warn(error.message);
    }
}

async function UserNameVerify(username){
    return UserRepository.GetUserByUserName(username).then(res => {
        return  res == null ? true : ExceptionModel.map(ExceptionPrefix["SUCCESS"],  MessageHelper.UserUpdateMsg.Conflick, false);
    });
}

export default {
    UserAuthentication,
    UserSignUp
}
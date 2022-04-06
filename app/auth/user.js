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
        result.message = MessageHelper.UserAuthMsg.OK;
    }

    return result;
}

async function UserSignUp(userViewModel) {

    var result = ExceptionModel.printError(MessageHelper.ResponseMsg.Body_Null);
    try {
        if(userViewModel){
            result = await UserNameVerify(userViewModel.UserName) && UserPasswordVerify(userViewModel.Password);
            if(result == true){
                var user = User.map(userViewModel);
                result = await UserRepository.CreateUser(user).then(res => {   
                    return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserCreate.OK, res != null);
                }).catch(err => {
                    return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserCreate.Fail, false);
                });
            }
        }
        return result;
    } catch (error) {
        console.warn(error.message);
    }
}

async function UserNameVerify(username){
    if(username == null) return false
    return UserRepository.GetUserByUserName(username).then(res => {
        return  res == null ? true : ExceptionModel.map(ExceptionPrefix["SUCCESS"],  MessageHelper.UserUpdateMsg.Conflick, false);
    });
}

const UserPasswordVerify = (passwd) => {return passwd != null && passwd != undefined}

export default {
    UserAuthentication,
    UserSignUp
}
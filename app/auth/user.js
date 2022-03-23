import ExceptionModel from '../viewmodels/ExceptionModel';
import ExceptionPrefix from '../src/ExceptionPrefix';
import UserRepository from "../repositories/UserRepository"
import "regenerator-runtime/runtime";
import  User from "../model/UserModel";

async function UserAuthentication (userViewModel) {
    try{
        if(userViewModel){
            var result =  await UserRepository.GetUserByUserName(userViewModel.UserName).then(res => {
                return PasswordAuthentication(res.Password, userViewModel.Password)
            }).catch(err => {
                return err;
            })
            return await result;
        }
    }
    catch(e){
        console.warn(e.message);
    }
}

function PasswordAuthentication(ori, veri){
    var result = new ExceptionModel();
    result.result = false;
    result.message = "UnAuthorize User";
    result.setStatusCode(ExceptionPrefix.ExceptionStatus["SUCCESS"]);
    if(ori === veri){
        result.result = true;
        result.message = "User Authorize Success";
    }

    return result;
}

async function UserSignIn(userViewModel) {

    var result = ExceptionModel.printError("Input is not recornize");
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
        return  res == null ? true : ExceptionModel.map(ExceptionPrefix["SUCCESS"],  "User Name is already take", false);
    });
}

export default {
    UserAuthentication,
    UserSignIn
}
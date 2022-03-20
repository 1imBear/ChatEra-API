import ExceptionModel from '../viewmodels/ExceptionModel';
import ExceptionPrefix from '../src/ExceptionPrefix';
import UserRepository from "../repositories/UserRepository"
import "regenerator-runtime/runtime"

async function UserAuthentication (userViewModel) {
    try{
        if(userViewModel.constructor.name == "UserViewModel"){
            var result =  await UserRepository.GetUserByUserName(userViewModel.UserName).then(user => {
                return PasswordAuthentication(user.Password, userViewModel.Password)
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
    try {
        
    } catch (error) {
        
    }
}

export default {
    UserAuthentication,
    UserSignIn
}
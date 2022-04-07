import "regenerator-runtime/runtime";
import ExceptionViewModel from '../viewmodels/exception/ExceptionViewModel';
import ExceptionHelper from '../helper/ExceptionHelper';
import UserRepository from "../repo/user/UserRepository"

const UserAuthentication = async (userViewModel) => {
    try{
        if(userViewModel){
            return await PasswordAuthentication(await UserRepository.GetUserByUserName(userViewModel.UserName), userViewModel.Password)
        }
        return ExceptionViewModel(ExceptionHelper.ResponseMsg.NULL);
    }
    catch(error){
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const PasswordAuthentication = async (user, passwd) => {
    return await UserRepository.GetPasswordById(user._id, passwd) == null ? ExceptionViewModel(ExceptionHelper.UserAuthMsg.FAIL) : ExceptionViewModel(ExceptionHelper.UserAuthMsg.OK, ExceptionHelper.ExceptionStatus.OK);
}

const UserSignUp = async (userViewModel) => {
    try{
        if(userViewModel){
            return ExceptionViewModel(ExceptionHelper.UserCreate.OK, ExceptionHelper.ExceptionStatus.OK, await UserRepository.CreateUser(userViewModel))
        }
        return ExceptionViewModel(ExceptionHelper.ResponseMsg.NULL);
    }
    catch(error){
        if(error.message.indexOf("11000") != -1) return ExceptionViewModel(ExceptionHelper.UserCreate.UNIQUE, ExceptionHelper.ExceptionStatus.ERROR)
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

export default {
    UserAuthentication,
    UserSignUp
}
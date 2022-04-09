import "regenerator-runtime/runtime";
import ExceptionViewModel from '../viewmodels/exception/ExceptionViewModel';
import ExceptionHelper from '../helper/ExceptionHelper';
import UserRepository from "../repo/user/UserRepository";
import DefaultAuthor from "./repo/author"

const UserAuthentication = async (userViewModel) => {
    try{
        const isValid = await DefaultAuthor(userViewModel.UserName, userViewModel.Password);
        return PasswordAuthor(isValid);
    }
    catch(error){
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const PasswordAuthor = (user) => { 
    return user ?  ExceptionViewModel(ExceptionHelper.UserAuthMsg.OK, ExceptionHelper.ExceptionStatus.OK) : ExceptionViewModel(ExceptionHelper.UserAuthMsg.FAIL, ExceptionHelper.ExceptionStatus.ERROR)
}

const UserSignUp = async (userViewModel) => {
    try{
        return UserRepository.CreateUser(userViewModel).then(result => {
            return ExceptionViewModel(ExceptionHelper.UserCreate.OK, ExceptionHelper.ExceptionStatus.OK, result)
        }).catch(error => {
            if(error.message.indexOf("11000") != -1) return ExceptionViewModel(ExceptionHelper.UserCreate.UNIQUE, ExceptionHelper.ExceptionStatus.ERROR)
            return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
        })
    }
    catch(error){
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

export default {
    UserAuthentication,
    UserSignUp
}
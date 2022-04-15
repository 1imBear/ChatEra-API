import "regenerator-runtime/runtime";
import ExceptionViewModel from '../viewmodels/ExceptionViewModel';
import ExceptionHelper from '../helper/ExceptionHelper';
import UserRepository from "../repo/UserRepository";

const UserAuthentication = async ({UserName, Password}) => {
    try{
        const result = await UserRepository.DefaultAuthor(UserName, Password);
        return result ?  ExceptionViewModel(ExceptionHelper.User.Auth.OK, ExceptionHelper.ExceptionStatus.OK, result) : ExceptionViewModel(ExceptionHelper.User.Auth.FAIL, ExceptionHelper.ExceptionStatus.ERROR);
    }
    catch(error){
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const UserSignUp = async (userViewModel) => {
    try{
        await UserRepository.CreateOne(userViewModel)
        return ExceptionViewModel(ExceptionHelper.User.Create.OK, ExceptionHelper.ExceptionStatus.OK);
    }
    catch(error){
        if(error.message.indexOf("11000") != -1) return ExceptionViewModel(ExceptionHelper.User.Create.UNIQUE, ExceptionHelper.ExceptionStatus.ERROR)
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

export default {
    UserAuthentication,
    UserSignUp
}
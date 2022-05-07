import "regenerator-runtime";
import { ExceptionHelper, MappingHelper, ExceptionViewModel } from "../helper";
import UserRepository from "../repo/UserRepository";

const getAllByName = async (publicKey, name) => {
    try {
        var result = await UserRepository.GetAllByName(publicKey, name);
        return ExceptionViewModel("User", ExceptionHelper.ExceptionStatus.OK, result);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

export default {
    getAllByName
}
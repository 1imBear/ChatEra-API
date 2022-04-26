import "regenerator-runtime";
import { ExceptionHelper, MappingHelper, ExceptionViewModel } from "../helper";
import MessageRepository from "../repo/MessageRepository";

const getAllById = async (id) => {
    try {
        var result = await MessageRepository.GetAllById(id);
        return ExceptionViewModel("Messages", ExceptionHelper.ExceptionStatus.OK, result);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const createMany = async (messages) => {
    try {
        var result = await MessageRepository.CreateMany(messages);
        return ExceptionViewModel(ExceptionHelper.Chat.Updare.OK, ExceptionHelper.ExceptionStatus.OK, result);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

export default {
    getAllById,
    createMany
}
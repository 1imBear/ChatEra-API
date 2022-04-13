import "regenerator-runtime";
import { ExceptionHelper, MappingHelper, ExceptionViewModel } from "../helper";
import ChatRepository from "../repo/ChatRepository";
import MessageRepository from "../repo/MessageRepository";

const getAllById = async (id) => {
    try {
        var result = await MessageRepository.GetAllById(id);
        return ExceptionViewModel("", ExceptionHelper.ExceptionStatus.OK, result);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const create = async (memberViewModel) => {
    try {
        var ok = await MessageRepository.CreateOne(memberViewModel);
        ok = await ChatRepository.UpdateMemberById(memberViewModel.id)
        return ok ? ExceptionViewModel(ExceptionHelper.Chat.Updare.OK, ExceptionHelper.ExceptionStatus.OK) : ExceptionViewModel(ExceptionHelper.Chat.Updare.FAIL, ExceptionHelper.ExceptionStatus.FAIL);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

export default {
    getAllById,
    create
}
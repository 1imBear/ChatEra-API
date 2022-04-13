import "regenerator-runtime";
import { ExceptionHelper, MappingHelper, ExceptionViewModel } from "../helper";
import ChatRepository from "../repo/ChatRepository";
import MemberRepository from "../repo/MemberRepository";

const getAllById = async (id) => {
    try {
        var result = await MemberRepository.GetAllById(id);
        return ExceptionViewModel("", ExceptionHelper.ExceptionStatus.OK, result);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const create = async (chatViewModel) => {
    try {
        const id = await ChatRepository.CreateOne(chatViewModel);
        var ok = await MemberRepository.CreateMany(id, chatViewModel.Members);
        ok = await ChatRepository.UpdateMemberById(id);
        return ok ? ExceptionViewModel(ExceptionHelper.Chat.Create.OK, ExceptionHelper.ExceptionStatus.OK) : ExceptionViewModel(ExceptionHelper.Chat.Create.FAIL, ExceptionHelper.ExceptionStatus.FAIL);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const update = async (chatViewModel) => {
    try {
        var ok = await ChatRepository.UpdateOneById(chatViewModel);
        return ok ? ExceptionViewModel(ExceptionHelper.Chat.Updare.OK, ExceptionHelper.ExceptionStatus.OK) : ExceptionViewModel(ExceptionHelper.Chat.Updare.FAIL, ExceptionHelper.ExceptionStatus.FAIL);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const remove = async (id) => {
    try {
        var ok = await ChatRepository.DeleteOneById(id);
        return ok > 0 ? ExceptionViewModel(ExceptionHelper.Chat.Delete.OK, ExceptionHelper.ExceptionStatus.OK) : ExceptionViewModel(ExceptionHelper.Chat.Delete.FAIL, ExceptionHelper.ExceptionStatus.FAIL);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

export default {
    getAllById,
    create,
    update,
    remove
}
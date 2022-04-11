import "regenerator-runtime";
import ExceptionViewModel from "../viewmodels/ExceptionViewModel";
import ExceptionHelper from "../helper/ExceptionHelper";
import ChatRepository from "../repo/ChatRepository";

const ChatCreate = async (chatViewModel) => {
    try {
        const ok = await ChatRepository.CreateOne(chatViewModel);
        return ok ? ExceptionViewModel(ExceptionHelper.Chat.Create.OK, ExceptionHelper.ExceptionStatus.OK) : ExceptionViewModel(ExceptionHelper.Chat.Create.FAIL, ExceptionHelper.ExceptionStatus.FAIL);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const ChatUpdate = async (chatViewModel) => {
    try {
        const ok = await ChatRepository.UpdateOneById(chatViewModel);
        return ok ? ExceptionViewModel(ExceptionHelper.Chat.Updare.OK, ExceptionHelper.ExceptionStatus.OK) : ExceptionViewModel(ExceptionHelper.Chat.Updare.FAIL, ExceptionHelper.ExceptionStatus.FAIL);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const MemberUpdate = async (chatViewModel) => {
    try {
        const ok = await ChatRepository.UpdateMemberById(chatViewModel);
        return ok ? ExceptionViewModel(ExceptionHelper.Chat.Updare.OK, ExceptionHelper.ExceptionStatus.OK) : ExceptionViewModel(ExceptionHelper.Chat.Updare.FAIL, ExceptionHelper.ExceptionStatus.FAIL);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

const MessageUpdate = async (chatViewModel) => {
    try {
        const ok = await ChatRepository.UpdateMessageById(chatViewModel);
        return ok ? ExceptionViewModel(ExceptionHelper.Chat.Updare.OK, ExceptionHelper.ExceptionStatus.OK) : ExceptionViewModel(ExceptionHelper.Chat.Updare.FAIL, ExceptionHelper.ExceptionStatus.FAIL);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}
export default {
    ChatCreate,
    ChatUpdate,
    MemberUpdate,
    MessageUpdate
}
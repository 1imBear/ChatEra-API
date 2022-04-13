import "regenerator-runtime";
import { ExceptionHelper, MappingHelper, ExceptionViewModel } from "../helper";

import MemberRepository from "../repo/MemberRepository";
import ChatRepository from "../repo/ChatRepository";

const update = async (id, members) => {
    try {
        var ok = await MemberRepository.DeleteManyById(id, members);
        if(ok == 0)
            await MemberRepository.CreateMany(id, members);

        ok = await ChatRepository.UpdateMemberById(id);
        return ok ? ExceptionViewModel(ExceptionHelper.Chat.Updare.OK, ExceptionHelper.ExceptionStatus.OK) : ExceptionViewModel(ExceptionHelper.Chat.Updare.FAIL, ExceptionHelper.ExceptionStatus.FAIL);
    } catch (error) {
        return ExceptionViewModel(error.message, ExceptionHelper.ExceptionStatus.ERROR)
    }
}

export default {
    update,
}
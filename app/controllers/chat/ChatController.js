import "regenerator-runtime";
import ExceptionModel from "../../viewmodels/exception/ExceptionModel";
import ExceptionPrefix from "../../helper/ExceptionPrefix";
import MessageHelper from "../../helper/ExceptionMessageHelper";
import ChatSessionModel from "../../models/chat/ChatSessionModel";
import UserController from "../User/UserController";

const createOne = async (chatSessionViewModel) => {
    try {
        var result = ExceptionModel.printError(MessageHelper.ResponseMsg.Body_Null);
        try {
            if(chatSessionViewModel){
                result = await UserController.VerifyUserByPublicKey(chatSessionViewModel.PublicKey[0]);
                var chatSession = ChatSessionModel.map(userViewModel);
                if(result == true && chatSession != null){
                    result = await UserRepository.UpdateUserById(userViewModel.Id,user).then(res => {   
                        return res == null ?  ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, err) : ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], "User Updated", res);
                    }).catch(err => {
                        return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, err);
                    });
                }
            }
            return result;
        } catch (error) {
            console.warn(error.message);
            return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, err)
        }
    } catch (error) {
        console.warn(error.message);
        return ExceptionModel.map(ExceptionPrefix.ExceptionStatus["SUCCESS"], MessageHelper.UserUpdateMsg.Error, err)
    }
}

export default {
    createOne
}
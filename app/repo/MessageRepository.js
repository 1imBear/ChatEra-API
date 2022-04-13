import { ObjectId } from "mongodb";
import "regenerator-runtime/runtime";
import MessageModel from "../models/MessageModel";

const GetAllById = async (id) => {
    try {  
        var messages = await MessageModel.find({
            Chat: id
        })
        .select({
            PublicKey: 1,
            Content: 1,
        })
        .sort({
            DateUpdate: 1
        })
        .exec();
        
        return messages;
    } catch (error) {
        throw new Error(error);
    }
}

const CreateOne = async (memberViewModel) => {
    try {  
        for (let i = 0; i < memberViewModel.Messages.length; i++) {
            var message = new MessageModel({
                Chat: memberViewModel.id,
                PublicKey: memberViewModel.PublicKey,
                Content: memberViewModel.Messages[i]
            })
            await message.save();
        }
        
        return true;
    } catch (error) {
        throw new Error(error);
    }
}

const DeleteAllById = async (id) => {
    try {
        var result = await MessageModel.deleteMany({
            Chat: new ObjectId(id),
        })
        return result.deletedCount;
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    GetAllById,
    CreateOne,
    DeleteAllById,
}
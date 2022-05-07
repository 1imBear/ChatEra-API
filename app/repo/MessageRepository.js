import { ObjectId } from "mongodb";
import "regenerator-runtime/runtime";
import MessageModel from "../models/MessageModel";

const GetAllById = async (id) => {
    try {  
        var messages = await MessageModel.find({
            Chat: id
        })
        .select({
            _id: 0,
            id: "$_id",
            ChatId: "$Chat",
            PublicKey: 1,
            Content: 1,
            DateUpdate: 1,
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

const CreateOne = async (message) => {
    try {  

        var message = new MessageModel({
            Chat: message.ChatId,
            PublicKey: message.PublicKey,
            Content: message.Content
        })
        await message.save();

        return true;
    } catch (error) {
        throw new Error(error);
    }
}

const CreateMany = async (messages) => {
    try {  
        for (let i = 0; i < messages.length; i++) {
            var message = new MessageModel({
                Chat: messages[i].ChatId,
                PublicKey: messages[i].PublicKey,
                Content: messages[i].Content
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
    CreateMany,
    DeleteAllById,
}
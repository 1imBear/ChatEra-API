import { ObjectId } from "mongodb";
import "regenerator-runtime/runtime";
import DataModelHelper from "../helper/DataModelHelper";
import ChatModel from "../models/ChatModel";
import MessageRepository from "./MessageRepository";

const GetAllById = async (id) => {
    try {
        var chat = ChatModel
        .aggregate([
            { $match: { Members: id } },
            {
                $lookup: {
                    from: "users",
                    localField: "Members",
                    foreignField: "PublicKey",
                    as: "Members",
                },
            },
            {
                $project:{
                    _id: 0,
                    id: "$_id",
                    Name: 1,
                    DateUpdate: 1,
                    Members : {
                        Name: 1,
                        PublicKey: 1
                    },
                }
            }
        ])
        .exec()

        return chat;
    } catch (error) {
        throw new Error(error);
    }
}

const GetOneById = async (id) => {
    try {    
        var chat = await ChatModel.findOne({
            _id : id
         }).select({
             _id: 1,
            Members : 1
        })
        .exec();

        return {
            id: chat._id,
            Members: chat.Members
        } 
    } catch (error) {
        throw new Error(error);
    }
}

const CreateOne = async (chatViewModel) => {
    try {
        var chat = new ChatModel({
            Name: chatViewModel.Name,
            Members: chatViewModel.Members
        });

        await chat.save();

        return chat._id
    } catch (error) {
        throw new Error(error);
    }
}

const UpdateOneById = async (chatViewModel) => {
    try {
        var chat = await ChatModel.findOne({
            _id : chatViewModel.id
        })
        .exec();
        
        if(chat){
            chat.Name = chatViewModel.Name;
            await chat.save();
            return true;
        }

        return false;
    } catch (error) {
        throw new Error(error);
    }
}

const UpdateMemberById = async (chatViewModel) => {
    try {
 
        var chat = await ChatModel.findOne({
            _id: new ObjectId(chatViewModel.id)
        })
        .select({
            Members: 1
        })
        .exec();

        if(chat){
            for (let i = 0; i < chatViewModel.Members.length; i++) {
                var value = chatViewModel.Members[i]
                var index = await chat.Members.findIndex(key => key == value)
                if(index > 0){
                    chat.Members.splice(index,1);
                    break;
                }
                chat.Members.push(value);
                
            }
            await chat.save();
    
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(error);
    }
}

const DeleteOneById = async (id) => {
    try {
           
        var result = await ChatModel.deleteOne({
            _id: new ObjectId(id),
        })
        
        result = await MessageRepository.DeleteAllById(id);

        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    GetAllById,
    GetOneById,
    CreateOne,
    UpdateOneById,
    UpdateMemberById,
    DeleteOneById,
}
import { ObjectId } from "mongodb";
import "regenerator-runtime/runtime";
import ChatModel from "../models/ChatModel";
import MemberModel from "../models/MemberModel";
import MessageModel from "../models/MessageModel";
import MemberRepository from "./MemberRepository";
import MessageRepository from "./MessageRepository";

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
            Name : chatViewModel.Name,
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

const UpdateMemberById = async (id) => {
    try {
        var members = await MemberModel.find({
            ChatId : new ObjectId(id)
        })
        .select({
            _id: 1
        })
        .exec();

        var messages = await MessageModel.find({
            ChatId : new ObjectId(id)
        })
        .select({
            _id: 1
        })
        .exec();
        
        var chat = await ChatModel.findOne({
            _id: id
        })
        .select({
            Members: 1
        })
        .exec();

        if(chat){
            chat.Members = members;
            chat.Messages = messages;
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
        
        result = await MemberRepository.DeleteAllbyId(id);
        result = await MessageRepository.DeleteAllById(id);

        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    GetOneById,
    CreateOne,
    UpdateOneById,
    UpdateMemberById,
    DeleteOneById,
}
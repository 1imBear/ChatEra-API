import "regenerator-runtime/runtime";
import ChatModel from "../models/ChatModel";
import MemberModel from "../models/MemberModel";
import MessageModel from "../models/MessageModel";

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
        var members = [];
        chatViewModel.Members.forEach(key => {
            members = [...members, new MemberModel.Member({
                PublicKey: key
            })]
        });
        
        var chat = new ChatModel({
            Members: members,
            Name : chatViewModel.Name,
        });
        await chat.save();

        return chat
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
            _id : chatViewModel.id
        })
        .select({
            Members: 1
        })
        .exec();
        
        if(chat){
            chatViewModel.Members.forEach(async (key) => {
                var i = await chat.Members.findIndex((_key) => _key.PublicKey == key)
                if(i >= 0){
                    chat.Members.splice(i, 1);
                    return;
                }
                chat.Members.push(new  MemberModel.Member({
                    PublicKey: key
                })) 
            });
            await chat.save();
            return true;
        }
1
        return false;
    } catch (error) {
        throw new Error(error);
    }
}

const UpdateMessageById = async (chatViewModel) => {
    try {
        var chat = await ChatModel.findOne({
            _id : chatViewModel.id
        })
        .select({
            Members: 1
        })
        .exec();
        
        if(chat){
            var member = await chat.Members.find((_key) => _key.PublicKey == chatViewModel.Members[0].PublicKey)
            if(member){
                chatViewModel.Members[0].Messages.forEach(key => {
                    member.Messages.push(new MessageModel.Message({
                        Content: key.Content
                    }));
                });
                await chat.save();
            }
            return true;
        }
1
        return false;
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    GetOneById,
    CreateOne,
    UpdateOneById,
    UpdateMemberById,
    UpdateMessageById,
}
import { ObjectId } from "mongodb";
import "regenerator-runtime/runtime";
import DataModelHelper from "../helper/DataModelHelper";
import MemberModel from "../models/MemberModel";

const GetAllById = async (id) => {
    try {
        var chat = MemberModel.find({
            PublicKey: id
        })
        .populate(DataModelHelper.Chat)
        .select({
            Chat: 1
        })
        .exec()

        return chat;
    } catch (error) {
        throw new Error(error);
    }
}

const CreateOne = async (id, key) => {
    try {
      
        var member = new MemberModel({
            Chat: id,
            PublicKey: key
        })
        await member.save();

        return true;
    } catch (error) {
        throw new Error(error);
    }
}

const CreateMany = async (id, members) => {
    try {
        for (let i = 0; i < members.length; i++) {            
            var member = new MemberModel({
                Chat: id,
                PublicKey: members[i]
            })
            await member.save();
        }
        return true;
    } catch (error) {
        throw new Error(error);
    }
}

const DeleteManyById = async (id, members) => {
    try {
        for (let i = 0; i < members.length; i++) {            
            var result = await MemberModel.deleteOne({
                Chat: new ObjectId(id),
                PublicKey: members[i]
            })
        }
        return result.deletedCount;
    } catch (error) {
        throw new Error(error);
    }
}

const DeleteAllbyId = async (id) => {
    try {
        var result = await MemberModel.deleteMany({
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
    DeleteManyById,
    DeleteAllbyId
}
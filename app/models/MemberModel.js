import mongoose from "mongoose";
import DataModelHelper from "../helper/DataModelHelper";
import MessageModel from "./MessageModel"

var Member = new mongoose.Schema({
    PublicKey: {
        type: String,
        ref: DataModelHelper.User
    },
    Messages: [{
        type: MessageModel.Model, 
        ref: DataModelHelper.Message
    }],
})


export default {
    Model: Member,
    Member: mongoose.model(DataModelHelper.Member, Member)
}
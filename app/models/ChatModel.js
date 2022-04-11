import mongoose from "mongoose"
import DataModelHelper from "../helper/DataModelHelper";
import MemberModel from "./MemberModel";

var Chat = new mongoose.Schema({
    Members: [{
        type: MemberModel.Model,
        ref: DataModelHelper.Member
    }],
    Name: {
        type: String,
        required: true
    },
    DateUpdate : {
        type: Date,
        require: true,
        default: () => { return Date.now() }
    },
})

Chat.pre('save', function (next) {
    this.DateUpdate = Date.now();
    next();
})

export default mongoose.model(DataModelHelper.Chat, Chat)
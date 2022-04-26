import mongoose from "mongoose"
import DataModelHelper from "../helper/DataModelHelper";

var Chat = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    DateUpdate: {
        type: Date,
        require: true,
        default: () => { return Date.now() }
    },
    Members: [{
        type: String,
        ref: DataModelHelper.User
    }],
    ChatType: {
        type: Number,
        enum: {
           values: [0, 1],
           message: "{Value} is not support"
        },
        default: 0
    }
})

Chat.pre('save', function (next) {
    this.DateUpdate = Date.now();
    next();
})

export default mongoose.model(DataModelHelper.Chat, Chat)
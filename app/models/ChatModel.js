import mongoose from "mongoose"
import DataModelHelper from "../helper/DataModelHelper";

var Chat = new mongoose.Schema({
    Name: {
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
})

Chat.pre('save', function (next) {
    this.DateUpdate = Date.now();
    next();
})

export default mongoose.model(DataModelHelper.Chat, Chat)
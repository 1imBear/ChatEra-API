import mongoose from "mongoose"
import DataModelHelper from "../helper/DataModelHelper";

var Message = new mongoose.Schema({
    Content: {
        type: String,
        required: true
    },
    DateUpdate : {
        type: Date,
        require: true,
        default: () => { return Date.now() }
    },
})

Message.pre('save', function (next) {
    this.DateUpdate = Date.now();
    next();
})

export default {
    Model: Message,
    Message: mongoose.model(DataModelHelper.Message, Message)
}
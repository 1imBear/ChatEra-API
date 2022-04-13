import mongoose from "mongoose"
import DataModelHelper from "../helper/DataModelHelper";

var Message = new mongoose.Schema({
    Chat:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: DataModelHelper.Chat,
        required: true,
    },
    PublicKey: {
        type: String,
        ref: DataModelHelper.User
    },
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

export default mongoose.model(DataModelHelper.Message, Message)

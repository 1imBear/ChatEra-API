import mongoose from "mongoose";
import DataModelHelper from "../helper/DataModelHelper";

var Member = new mongoose.Schema({
    Chat: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: DataModelHelper.Chat,
        require: true
    },
    PublicKey: {
        type: String,
        ref: DataModelHelper.User
    }
})


export default mongoose.model(DataModelHelper.Member, Member)

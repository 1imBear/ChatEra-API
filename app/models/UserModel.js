import mongoose from "mongoose";
import crypto from "crypto";
import HashingHelper from "../helper/HashingHelper";
import DataModelHelper from "../helper/DataModelHelper";

var User = new mongoose.Schema({
    UserName: {
        type: String, 
        require: true, 
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        require: true
    },
    PublicKey: {
        type: String,
        immutable: true,
        unique: true,
        required: true,
        default: () => { return crypto.randomBytes(16).toString('hex') }
    }
})

User.pre('save', function (next) {
    if (!this.isModified('Password')) return next();
    this.Password = HashingHelper.HashPassword(this.Password)
    next();
})

export default mongoose.model(DataModelHelper.User, User)

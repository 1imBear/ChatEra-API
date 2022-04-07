import mongoose from "mongoose";

const User = new mongoose.Schema({
    UserName : {
        type : String, 
        require : true, 
        unique : true
    },
    Password : {
        type : String,
        require : true
    }
})

export default mongoose.model("User", User)

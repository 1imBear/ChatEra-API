import mongoose from "mongoose"

var User = new mongoose.Schema({
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

var map = (userViewModel) => {
    User.UserName = userViewModel.UserName;
    User.Password = userViewModel.Password;

    return User;
}

export default {
    User, map
}
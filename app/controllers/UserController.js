import "regenerator-runtime";
import User from "../model/UserModel";
import UserRepository from "../repositories/UserRepository";
import ExceptionModel from "../viewmodels/ExceptionModel";
import ExceptionPrefix from "../src/ExceptionPrefix";

const UpdateUser = async (userViewModel) => {
    try {
        var result = ExceptionModel.printError("Input is not recornize");
        try {
            if(userViewModel){
                result = await UserIdVerify(userViewModel.Id);
                if(result == true){
                    var user = User.map(userViewModel);
                    result = await UserRepository.UpdateUserById(userViewModel.Id,user).then(res => {   
                        return ExceptionModel.map(ExceptionPrefix["SUCCESS"], "User Updated", res);
                    }).catch(err => {
                        return ExceptionModel.map(ExceptionPrefix["SUCCESS"], "User Updat Fail", err);
                    });
                }
            }
            return result;
        } catch (error) {
            console.warn(error.message);
        }
    } catch (error) {
        console.warn(error.message);
    }
}

const UserIdVerify = async (id) => {
    return UserRepository.GetUserById(id).then(res => {
        return  res == null ? ExceptionModel.map(ExceptionPrefix["SUCCESS"],  "User not found", false) : true;
    });
}

export default {
    UpdateUser
}
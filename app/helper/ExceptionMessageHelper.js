const ResponseMsg = {
    Body_Null : "Input format is not recognize"
}

const UserAuthMsg = {
    Success : "Authentication Success",
    Fail : "User not found !",
    Error : "Authentication Fail"
}

const UserUpdateMsg = {
    Conflick : "UserName is already take",
    Fail : "User Update Fail",
    Error : "Some input may wrong, please check again :)"
}

export default {
    ResponseMsg,
    UserAuthMsg,
    UserUpdateMsg
}
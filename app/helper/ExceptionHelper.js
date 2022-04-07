const ResponseMsg = {
    NULL : "Input format is not recognize"
}

const UserAuthMsg = {
    OK : "Authentication Success",
    FAIL : "User not found !",
    ERROR : "Authentication Fail"
}

const UserUpdateMsg = {
    OK : "User successfull update",
    FAIL : "User Update Fail",
    ERROR : "Some input may wrong, please check again :)"
}

const UserCreate = {
    OK : "User successfull create",
    FAIL : "User fail create",
    UNIQUE : "UserName is already take",
}

const ExceptionStatus = {
    OK : 200,
    FAIL: 400,
    ERROR : 404 
}

export default {
    ResponseMsg,
    UserAuthMsg,
    UserUpdateMsg,
    UserCreate,
    ExceptionStatus
}
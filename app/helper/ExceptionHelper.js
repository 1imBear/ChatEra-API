const Global = {
    NULL : "Input format is not recognize"
}

const User = {
    Auth: {
        OK : "Authentication Success",
        FAIL : "User not found !",
        ERROR : "Authentication Fail"
    },
    Create: {
        OK : "User successfull create",
        FAIL : "User fail create",
        UNIQUE : "UserName is already take",
    },
    Update: {
        OK : "User successfull update",
        FAIL : "User Update Fail",
        ERROR : "Some input may wrong, please check again :)"
    },
    Delete: {
        
    }
}

const Chat = {
    Create: {
        OK: "Chat successfull create",
        FAIL: "Chat fail create"
    },
    Updare: {
        OK: "Chat successfull update",
        FAIL: "Chat fail to update"
    },
    Delete: {
        OK: "Chat successfull delete",
        FAIL: "Chat fail to delete"
    }
}

const ExceptionStatus = {
    OK : 200,
    FAIL: 400,
    ERROR : 404 
}

export default {
    Global,
    ExceptionStatus,
    User,
    Chat,
}
import ExceptionPrefix from "../src/ExceptionPrefix";

var ExceptionModel = {

    statuscode : ExceptionPrefix.ExceptionStatus["FAIL"],
    statusview : null,
    message : null,
    result : null,
}

let map = (statuscode, message, result) => {
    ExceptionModel.statuscode = statuscode;
    ExceptionModel.message = message;
    ExceptionModel.result = result;
    ExceptionModel.statusview = setStatusCode(statuscode);

    return ExceptionModel;
}

let printError = (message) => {
    ExceptionModel.message = message;
    return ExceptionModel;
}

const setStatusCode = (statuscode) =>{
    switch(statuscode){
        case 200:
            return "OK";
        default:
            return "FAIL";
    }            
}
export default {
    ExceptionModel,
    map,
    printError
}
import ExceptionPrefix from "../src/ExceptionPrefix";

class ExceptionModel {

    statuscode = null;
    statusview = null;
    message = null;
    result = null;

    constructor(message, result = null){
        this.statuscode = ExceptionPrefix.ExceptionStatus["FAIL"];
        this.message = message;
        this.result = result;
    }
    
    map(statuscode, message, result){
        
    }

    setStatusCode(obj){
        this.statuscode = obj;
        this.statusview = () => {
            switch(statuscode){
                case 200:
                    return "OK";
                default:
                    return "FAIL";
            }            
        }
    }
}

export default ExceptionModel
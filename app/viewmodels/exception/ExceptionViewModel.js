import ExceptionHelper from "../../helper/ExceptionHelper";

const ExceptionViewModel = (message, statuscode = ExceptionHelper.ExceptionStatus.ERROR, result) => {
    var viewmodel = {};
    viewmodel.message = message;
    viewmodel.statuscode = statuscode;
    if(result) viewmodel.result = result

    return viewmodel;
}

export default ExceptionViewModel

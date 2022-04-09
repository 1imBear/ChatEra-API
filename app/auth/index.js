import { Router } from "express"
import "regenerator-runtime/runtime"
import UserViewModel from "../viewmodels/user/UserViewModel"
import UserAuth from "./user"
import ExceptionHelper from "../helper/ExceptionHelper"

const router = Router();

router.post('/signin', async (req, res) => {

    try{
        var data = req.body;
        UserAuth.UserAuthentication(UserViewModel(data["UserName"], data["Password"])).then(result => {
            res.json(result);
        }).catch(error => {
            res.json(error);
        });
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
});

router.post("/signup", async (req, res) => {
    try {
        var data = req.body;
        await UserAuth.UserSignUp(UserViewModel(data["UserName"], data["Password"]))
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        })
        
    } catch (error) {
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

export default router;
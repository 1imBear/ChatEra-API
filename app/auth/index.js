import { Router } from "express";
import "regenerator-runtime/runtime";
import UserViewModel from "../viewmodels/UserViewModel";
import UserAuth from "./user";
import {ExceptionHelper, MappingHelper} from "../helper"

const router = Router();

router.post('/user', async (req, res) => {
    try{
        const result = await UserAuth.UserAuthentication(MappingHelper(UserViewModel, req.body));
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
});

router.post("/user/create", async (req, res) => {
    try {
        const result = await UserAuth.UserSignUp(MappingHelper(UserViewModel, req.body))
        res.json(result);
    } catch (error) {
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

export default router;
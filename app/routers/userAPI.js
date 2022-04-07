import { Router } from "express";
import "regenerator-runtime";
import UserController from "../controllers/user/UserController";
import ExceptionHelper from "../helper/ExceptionHelper";
import UserViewModel from "../viewmodels/user/UserViewModel";

const router = Router();

router.put("/updateUser", async (req, res) => {
    try {
        const data = req.body;
        var userViewModel = UserViewModel(data["UserName"], null, req.query["id"]);
        await UserController.UpdateUser(userViewModel)
        .then(result => {
            res.json(result);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

export default router;
import { Router } from "express";
import "regenerator-runtime";
import UserController from "../controllers/UserController";
import UserViewModel from "../viewmodels/UserViewModel";
import ExceptionModel from "../viewmodels/ExceptionModel";

const router = Router();

router.put("/updateUser", async (req, res) => {
    try {
        const data = req.body;
        const id  = req.query["id"];

        if(data !== undefined && id !== undefined){
            var userViewModel = UserViewModel.map(id, data["UserName"], null);
            await UserController.UpdateUser(userViewModel)
            .then(result => {
                res.json({result});
            }).catch(err => {
                res.json({err});
            });
        }
    } catch (error) {
        res.json( ExceptionModel.printError(error.message) );
    }
})

export default router;
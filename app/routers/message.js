import { Router } from "express";
import "regenerator-runtime";
import { ExceptionHelper, MappingHelper } from "../helper"
import MemberViewModel from "../viewmodels/MemberViewModel";
import MessageController from "../controllers/MessageController";

const router = Router();

router.get("/getall/:id", async (req, res) => {
    try{
        const result = await MessageController.getAllById(req.params.id);
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.post("/create", async (req, res) => {
    try{
        const result = await MessageController.create(MappingHelper(MemberViewModel, req.body));
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

export default router;
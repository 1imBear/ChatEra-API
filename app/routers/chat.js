import { Router } from "express";
import "regenerator-runtime";
import ChatViewModel from "../viewmodels/ChatViewModel";
import ChatController from "../controllers/ChatController";
import { ExceptionHelper, MappingHelper } from "../helper"

const router = Router();

router.get("/getall/:id", async (req, res) => {
    try{
        const response = await ChatController.getAllById(req.params.id);
        res.json(response);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.post("/create", async (req, res) => {
    try{
        const response = await ChatController.create(MappingHelper(ChatViewModel, req.body));
        res.json(response);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.post("/update", async (req, res) => {
    try{
        const response = await ChatController.update(MappingHelper(ChatViewModel, req.body));
        res.json(reresponsesult);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.post("/member/update", async (req, res) => {
    try{
        const response = await ChatController.memberUpdate(MappingHelper(ChatViewModel, req.body));
        res.json(response);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.delete("/delete/:id", async (req, res) => {
    try{
        const response = await ChatController.remove(req.params.id);
        res.json(response);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

export default router;
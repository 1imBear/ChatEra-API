import { Router } from "express";
import "regenerator-runtime";
import ChatViewModel from "../viewmodels/ChatViewModel";
import ChatController from "../controllers/ChatController";
import { ExceptionHelper, MappingHelper } from "../helper"

const router = Router();

router.get("/getall/:id", async (req, res) => {
    try{
        const result = await ChatController.getAllById(req.params.id);
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.post("/create", async (req, res) => {
    try{
        const result = await ChatController.create(MappingHelper(ChatViewModel, req.body));
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.post("/update", async (req, res) => {
    try{
        const result = await ChatController.update(MappingHelper(ChatViewModel, req.body));
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.post("/member/update", async (req, res) => {
    try{
        const result = await ChatController.memberUpdate(MappingHelper(ChatViewModel, req.body));
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.delete("/delete/:id", async (req, res) => {
    try{
        const result = await ChatController.remove(req.params.id);
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

export default router;
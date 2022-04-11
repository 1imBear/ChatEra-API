import { Router } from "express";
import "regenerator-runtime";
import ChatViewModel from "../viewmodels/ChatViewModel";
import ChatController from "../controllers/ChatController";
import { ExceptionHelper, MappingHelper } from "../helper"

const router = Router();

router.post("/create", async (req, res) => {
    try{
        const result = await ChatController.ChatCreate(MappingHelper(ChatViewModel, req.body));
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.post("/update", async (req, res) => {
    try{
        const result = await ChatController.ChatUpdate(MappingHelper(ChatViewModel, req.body));
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.post("/member", async (req, res) => {
    try{
        const result = await ChatController.MemberUpdate(MappingHelper(ChatViewModel, req.body));
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

router.post("/member/message", async (req, res) => {
    try{
        const result = await ChatController.MessageUpdate(MappingHelper(ChatViewModel, req.body));
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

export default router;
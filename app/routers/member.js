import { Router } from "express";
import "regenerator-runtime";
import { ExceptionHelper, MappingHelper } from "../helper";
import ChatViewModel from "../viewmodels/ChatViewModel";
import MemberController from "../controllers/MemberController";

const router = Router();

router.post("/update", async (req, res) => {
    try{
        const chatViewModel = MappingHelper(ChatViewModel, req.body);
        const result = await MemberController.update(chatViewModel.id, chatViewModel.Members);
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})


export default router;
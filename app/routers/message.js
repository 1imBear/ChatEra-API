import { Router } from "express";
import "regenerator-runtime";
import { ExceptionHelper, MappingHelper } from "../helper";
import MessageController from "../controllers/MessageController";
import MessageViewModel from "../viewmodels/MessageViewModel";

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

export default router;
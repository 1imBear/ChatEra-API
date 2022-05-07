import { Router } from "express";
import "regenerator-runtime";
import { ExceptionHelper, MappingHelper } from "../helper";
import UserController from "../controllers/UserController";

const router = Router();

router.get("/getall/:id/:name", async (req, res) => {
    try{
        const result = await UserController.getAllByName(req.params.id, req.params.name);
        res.json(result);
    }
    catch(error){
        res.status(ExceptionHelper.ExceptionStatus.ERROR);
    }
})

export default router;
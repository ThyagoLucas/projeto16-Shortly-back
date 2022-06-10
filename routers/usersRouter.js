import { Router } from "express";
import { getInfoUser } from "../controllers/userController.js";
import { verifyHeaderToken, verifyParams } from "../middlewares/verifiesMidds.js";


const usersRouter = Router();

usersRouter.get('/users/:id?', verifyHeaderToken, verifyParams, getInfoUser);



export default usersRouter;
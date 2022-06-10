import { Router } from 'express'; 
import { postRegister } from '../controllers/signupController.js';
import { checkDatas } from '../middlewares/verifiesMidds.js';

const signupRouter = Router();

signupRouter.post('/signup', checkDatas, postRegister);


export default signupRouter;
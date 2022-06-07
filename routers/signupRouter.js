import { Router } from 'express'; 
import { postRegister } from '../controllers/signupController.js';

const signupRouter = Router();

signupRouter.post('/signup', postRegister);


export default signupRouter;
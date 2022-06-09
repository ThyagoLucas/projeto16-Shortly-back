import { Router } from 'express'; 
import { postRegister } from '../controllers/signupController.js';
import { verifyEqualPass } from '../middlewares/verifiesMidds.js';

const signupRouter = Router();

signupRouter.post('/signup', verifyEqualPass, postRegister);



export default signupRouter;
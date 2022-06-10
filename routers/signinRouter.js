import { Router } from 'express';
import { login } from '../controllers/signinController.js';
import { verifyUserAndPass } from '../middlewares/verifiesMidds.js';

const signinRouter = Router();

signinRouter.post('/signin', verifyUserAndPass, login );

export default signinRouter;
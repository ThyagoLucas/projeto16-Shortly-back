import { Router } from 'express';
import { deleteUrl, getUrl, redirectUser, saveUrl } from '../controllers/urlsController.js';
import { verifyHeaderToken, verifyParams, verifyUrl, vLinkProperty} from '../middlewares/verifiesMidds.js';

const  urlsRouter = Router();

urlsRouter.post('/urls/shorten', verifyHeaderToken, verifyUrl, saveUrl);

urlsRouter.get('/urls/:id?', verifyParams, getUrl);

urlsRouter.get('/urls/open/:shortUrl?', redirectUser);

urlsRouter.delete('/urls/:id?', verifyParams, verifyHeaderToken, vLinkProperty, deleteUrl);


export default urlsRouter;


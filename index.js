import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRouter from './routers/signupRouter.js';
import signinRouter from './routers/signinRouter.js';
import urlsRouter from './routers/urlsRouter.js';
import usersRouter from './routers/usersRouter.js';
import rankingRouter from './routers/rankingRouter.js';

const server = express();

dotenv.config();
server.use(cors());
server.use(json());

const port = process.env.PORT;
server.listen(port, ()=>{console.log(`Server is online on PORT ${port}`)});


//Routers
server.use(signupRouter);
server.use(signinRouter);
server.use(urlsRouter);
server.use(usersRouter);
server.use(rankingRouter);


import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRouter from './routers/signupRouter.js';

const server = express();

dotenv.config();
server.use(cors());
server.use(json());

const port = process.env.PORT;
server.listen(port, ()=>{console.log(`Server is online on PORT ${port}`)});


//Routers
server.use(signupRouter);
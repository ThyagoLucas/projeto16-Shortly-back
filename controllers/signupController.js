import db from '../db.js';


export async function postRegister(req, res){
    
    const {name, email, password} = req.body;

    console.log(name, email, password);


    try {

     await db.query(`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, '${password}')`);

     res.sendStatus(201)
        
    } catch (error) {
        console.log('ERRO AO INSERIR USER: ', error);
        res.sendStatus(400);
    }




}
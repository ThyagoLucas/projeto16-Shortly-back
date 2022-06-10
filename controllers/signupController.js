import db from '../db.js';
import bcrypt from 'bcrypt';

export async function postRegister(req, res){
    
    const {name, email, password} = req.body;
    const passCrypt = bcrypt.hashSync(password, 10);

    try {

     await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [`${name}`, `${email.toLowerCase()}`, `${passCrypt}`]);
     res.sendStatus(201)
        
    } catch (error) {
        
        res.status(422).send(`${error.detail}`);
    }

}
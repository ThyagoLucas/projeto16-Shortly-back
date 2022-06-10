import { compareSync } from "bcrypt";
import db from "../db.js";


export async function checkDatas (req, res, next){

    const {name, email, password, confPassword} = req.body;
    if(!email || !email || !password || !confPassword) return res.status(422).send('preencha todos os campos');
    if(password !== confPassword)  return res.status(404).send('senha e confirmação divergentes');
    else next();

}

export async function verifyUserAndPass(req, res, next ){

    const {email, password} = req.body;

    if(!password || !email){
        return res.status(422).send('email ou senha não podem ser vazios');
    }

    try {

        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [`${email}`]);

        if(user.rowCount === 0){
            return res.status(401).send('usuario não existe')
        }else{

            compareSync(password, user.rows[0].password)
            ? next()
            : res.status(401).send('senha inválida');

        }

    } catch (error) {
       
        res.status(422);
    }

}
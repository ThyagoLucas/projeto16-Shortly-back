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

export async function verifyHeaderToken(req, res, next){

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    if(!authorization){
        return res.status(422).send('token não pode ser vazio');
    }

    try { 

        const user = await db.query(`SELECT * FROM sessions WHERE token = '${token}'`);
    
        if(user.rowCount === 0 ){
            return res.status(401).send('token da sessão não encontrado');
        }
        if(!user.rows[0].is_available){
            return res.status(401).send('token de sessão não esta disponivel, favor, faça o login novamente');
        }

        else next();
        
    } catch (error) {
        
    }
   

}

export async function verifyUrl(req, res, next){

    const { url } = req.body;

    try {
        let isUrl = new URL(url);
        next();
        
    } catch (error) {
        res.status(422).send('url inválida')
    }

}

export async function verifyParams (req, res, next){

    const { id } = req.params;

    if(!id){
        return res.status(401).send('rota sem parametro, envie pelo menoss um parametro para consulta')
    }
    else next();

}

export async function vLinkProperty(req, res, next){

    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    try {
        
        const user = await db.query(`SELECT user_id FROM sessions WHERE token = '${token}'`)
        const { user_id } = user.rows[0];
       
        const user_id_link = await db.query(`SELECT user_id FROM links WHERE id = ${id}`);

        if(user_id === user_id_link.rows[0].user_id){
            next()
        }
        else return res.status(401).send('url não pertence ao usuário')


    } catch (error) {
        res.status(404).send('url não existe');
    }

}
import { v4 } from "uuid";
import db from "../db.js";

export async function login(req, res){

    const { email } = req.body;
    const token = v4();
    
    try {
        const infoUser = await db.query(`SELECT user_id FROM users WHERE email = $1`, [`${email}`]);
        const user_id =infoUser.rows[0].user_id;
        
        await db.query(`INSERT INTO 
                            sessions (token, user_id, is_available)
                            VALUES ($1, $2, $3)`, [`${token}`, user_id, true]);
        
        res.status(200).send(token);

        
    } catch (error) {
        console.log("Erros:", error);
        res.status(411).send('erro interno');
        
    }

}
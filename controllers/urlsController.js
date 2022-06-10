
import db from "../db.js";
import { nanoid } from "nanoid";

export async function saveUrl(req, res){

    const linkId = nanoid(6);
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    const { url } = req.body;

    try {
        
        const user = await db.query(`SELECT user_id FROM sessions WHERE token = '${token}'`);
        await db.query(`INSERT
                            INTO links (user_id, url, "shortUrl", is_available, "visitCount")
                            VALUES ($1, $2, $3, $4, $5)`, [user.rows[0].user_id, `${url}`, `${linkId}`, true, 0])

        res.json({"shortUrl": `${linkId}`}).status(200);

    } catch (error) {
        console.log('Falha ao cadastrar: ', error)
        res.sen(404).send('falha interna no servidor')
    }

}

export async function getUrl(req, res){

    const { id } = req.params;

    try {

        const link = await db.query(`SELECT id, "shortUrl", url FROM links WHERE id = ${id}`);

        res.json(link.rows[0]).status(200);
        
    } catch (error) {
        res.sendStatus(404)

    }

}

export async function redirectUser(req, res){

    const { shortUrl } = req.params;
    
    try {

        const visits = await db.query(`SELECT "visitCount", url, is_available FROM links WHERE "shortUrl" = '${shortUrl}'`);
       
        if(visits.rowCount !== 0 && visits.rows[0].is_available ){
            let visitsCont = visits.rows[0].visitCount + 1;
            let link = visits.rows[0].url;

            await db.query(`UPDATE links SET "visitCount" = ${visitsCont} WHERE "shortUrl" = '${shortUrl}'`);
        
            res.redirect(`${link}`);
        }

        else{
             res.status(404).send('link não existe ou desativado')
        }
        
        
    } catch (error) {
        res.sendStatus(404)
    }


}

export async function deleteUrl(req, res){

    const { id } = req.params;
    
    try {

        await db.query(`DELETE FROM links WHERE id = ${id}`)

        res.status(204).send('link deletado')
        
    } catch (error) {
        res.status(404).send('url não existe');
    }

}



import db from "../db.js";

export async function getInfoUser(req, res){

    const { id } = req.params;

    try {
        const userInfos = await db.query(`
                                        SELECT u.user_id AS id, u.name, sum(l."visitCount") as "visitCount"
                                        FROM users u 
                                        JOIN links l ON u.user_id = l.user_id
                                        WHERE u.user_id = ${id}
                                        GROUP BY (u.user_id)
        
        
        `)
        const userLinks = await db.query(`
                                            SELECT id, "shortUrl", url, "visitCount" FROM links WHERE user_id = ${id} 
        
        `)

        const resumeUser = {...userInfos.rows[0], shortenedUrls: userLinks.rows };
        

        res.json(resumeUser).status(200);
        
    } catch (error) {

        console.log(error)
        res.sendStatus(404).send('usuario não encontrado');
        
    }


}
import db from "../db.js";


export async function getRanking(req, res){

    try {
        
        const ranking = await db.query(`

            SELECT u.user_id AS id, u.name, COUNT(l.url ) AS "linksCount", SUM(l."visitCount") AS "visitCount"
            FROM users u
            JOIN links l ON u.user_id = l.user_id
            WHERE l.user_id = u.user_id
            GROUP BY (u.user_id) 
            ORDER BY ("visitCount") DESC
            LIMIT 10

        `)
        res.json(ranking.rows).status(200);


    } catch (error) {
        
    }






}
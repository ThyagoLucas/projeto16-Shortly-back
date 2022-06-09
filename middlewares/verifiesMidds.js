

export async function verifyEqualPass (req, res, next){

    const {password, confPassword} = req.body;

    if(password !== confPassword)  return res.status(404).send('senha e confirmação divergentes');
    else next();

}
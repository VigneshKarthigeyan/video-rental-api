const jwt=require('jsonwebtoken');
const config=require('config');
function auth(req,res,next){
    const token=req.header("x-auth-token");
    if(!token){
        return res.status(401).send("Access denied. No auth token provided.")
    }
    try {
        const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(400).send("Access denied.Invalid token")
    }
    // next();
}

module.exports=auth;
function role(req,res,next){
    const user=req.user;
    console.log(user);
    console.log("role middlewar called");
    console.log(user.isAdmin);
    if(!user.isAdmin){
        return res.status(403).send("Access forbidden")
    }
    next();
}

module.exports=role;
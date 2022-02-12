module.exports=function asyncMiddleware(handler){
    return async (req,res,next)=>{
        try{
            await handler(req,res);
        }
        catch(e){
            // console.log("error catch");
            next(e);
        }
    }
}
module.exports=function(err,req,res,next){
    console.log("error middleware",err);
    res.status(500).send('Something failed');
  }
const mongoose=require('mongoose');
const Joi=require('joi');
const jwt=require('jsonwebtoken');
const config=require('config');

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        unique:true
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
      },
});

userSchema.methods.getAuthToken=function(){
  const token=jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User',userSchema);

function validateSchema(user){
    const schema=Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).email().required(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(user);
}

module.exports.User=User;
module.exports.validate=validateSchema;
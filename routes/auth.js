const {User} = require('../models/user');
const Joi=require('joi');
const bcrypt=require('bcrypt');

const express = require('express');
const router = express.Router();

// authenticating a user
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user =await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send("Invalid Email");

  const isValid=await bcrypt.compare(req.body.password,user.password);
  console.log(isValid);
  if(!isValid) return res.status(400).send("Invalid Password");
  const token=user.getAuthToken();
  res.send(token);
});

function validate(user){
    const schema=Joi.object({
        email: Joi.string().min(5).email().required(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(user);
}

module.exports=router;
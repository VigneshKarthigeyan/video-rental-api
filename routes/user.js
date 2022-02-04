const {User, validate} = require('../models/user');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
const auth=require('../middleware/auth');

// getting user details
router.get('/me',auth, async (req, res) => {
  const user=await User.findById(req.user._id);
  res.send(user);
});

// registering a user
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user =await User.findOne({email:req.body.email});
  if(user) return res.status(400).send("User already registered");
  
  user = new User(_.pick(req.body,['name','email','password']));
  const salt=await bcrypt.genSalt(10);
  const password=await bcrypt.hash(req.body.password,salt);
  user.password=password;
  user = await user.save();
  const token=user.getAuthToken();
  res.header("x-auth-token",token).send(_.pick(user,['_id','name','email']));
});

module.exports=router;
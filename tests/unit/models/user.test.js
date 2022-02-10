const mongoose = require("mongoose");
const {User}=require('../../../models/user');
const jwt=require('jsonwebtoken');
const config=require('config');

describe('user.getAuthToken',()=>{
    it('should return a valid auth token for given user',()=>{
        const payload={_id:new mongoose.Types.ObjectId().toHexString(),isAdmin:true};
        const user=new User(payload);
        const token=user.getAuthToken();
        const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    })
})
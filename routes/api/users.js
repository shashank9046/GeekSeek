const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');
const User = require('../../models/User')

// @route GET api/users 
// @desc Rgister user
// @access Public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','please use a valid email').isEmail(),
    check('password','Please enter the password with 6 or more digit').isLength({min:6})
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {name,email,password} = req.body;
    try {
        //if user exists
        let user = await User.findOne({email});

        if(user) {
           return res.status(400).json({errors:[{msg:'user already exists'}]});
        }
        //get users gravatar
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });

        user = new User({
            name,email,avatar,password
        });
        //encrypt pass
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        //return token
        const payload = {
            user:{
                id:user.id //_id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'),
        {expiresIn:360000},
        (err,token)=>{
            if(err) throw err;
            res.json({token});
        });
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('server error');
    }
    
});
module.exports = router;
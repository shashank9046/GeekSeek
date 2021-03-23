const express = require('express');
const router = express.Router();
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
            res.status(400).json({errors:[{msg:'user already exists'}]});
        }
        //get users gravatar
        //encrypt pass
        //return token
        res.send('User route');
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('server error');
    }
    
});
module.exports = router;
'use strict'

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const User  = require('../models/User');



module.exports = {

    authUser : async(req , res, next) => {
        const user = await User.findOne({ email : req.body.email })
        if(!user) {
         res.status(401).json('Username atau password salah')
        }
        const validPassword = await bcrypt.compare(req.body.password , user.password)
        if (!validPassword) {
             res.status(402).send('Username atau password salah')
        }

        const token = jwt.sign({userId : user._id }, 'webtoonclone')
        res.send(token)
    }
}

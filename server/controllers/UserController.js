'use strict'

const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken')

const User = require('../models/User')


module.exports = {
    index : async (req, res, next) => {
        const alluser = await User.find({})
        res.status(200).send(alluser)
    },

    newUser : async (req , res , next) => {
        const user = await User.findOne({email : req.body.email})
        if (user) {
            res.status(400).send('Email sudah digunakan')
        }else {
            const newUser = new User(_.pick(req.body , ['fullname', 'email','password']))
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            newUser.profilepicture = '/uploads/15710455405680.4599622566335715asdds.jpeg'
            await newUser.save() 
            const token = jwt.sign({userId : newUser._id }, 'webtoonclone')
            res.send(token)
        }
    },

    getUser : async (req, res, next ) => {
        try{
            const user = await User.findById(req.userId)
            res.status(200).json(user) 
        }
        catch(err) {
            console.log(err)
            res.status(400).send("Error")
        }
        
    },

    editUser : async (req, res , next) => {
        try {
            if (!req.file) {
                const user = await User.findByIdAndUpdate(req.userId, {fullname : req.body.fullname}, {new : true})
                res.status(202).send(user)
            } 
            else {
                const path = require('path')
                const remove = path.join(__dirname , '..', 'public')
                const relPath = req.file.path.replace(remove, '')
                const user = await User.findByIdAndUpdate(req.userId, {fullname : req.body.fullname, profilepicture : relPath}, {new : true, useFindAndModify: false})
                res.status(202).send(user)
            }
        }
        catch(err) {
            console.log(err)
            res.status(400).send("Error")
        }
        
    }
}

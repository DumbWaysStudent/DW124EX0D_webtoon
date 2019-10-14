'use strict'

const express =require('express')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const s3 = new aws.S3()


const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        const uploadsDir = path.join(__dirname,  '..','public','uploads')
        cb(null , uploadsDir)
    },
    filename : function (req , file, cb) {
        cb(null, `${Date.now()}`+Math.random() + file.originalname)
    }
})
    const upload = multer({ storage })


// const storage = multerS3({
//     s3: s3,
//     acl : 'public-read',
//     bucket: 'webtoondb-images',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// const upload = multer({ storage })

module.exports = upload

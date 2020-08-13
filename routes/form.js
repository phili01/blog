const express = require('express');
const path = require('path');
const fs = require('fs'); 
const {posts, connectStatus} = require('../serverDB/serverDB');
let formInit = require('./utility/forminit');
let uploadToBucket = require('./utility/mainupload');
let submit = require('./utility/submit');

const router = express.Router();
let formidable = require('formidable');

fs.mkdir('./tmp', err => { 
    if (err && err.code != 'EEXIST') throw err
})

router.post('/add/blog', (req, res, next) => {
    formInit(req, formidable).then(form => {
    let image = form.files && form.files.image ? form.files.image : []; 
        uploadToBucket(image, 'image', 'image.files').then(image => {
            let mediaCnt = {
                image
            }
            const content = form.fields;
            connectStatus.then((result) => {
                submit(content, posts, mediaCnt).then(id =>
                    res.status(201).send(id)
                ).catch(err => {
                    res.status(500).send(err)
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

module.exports = router

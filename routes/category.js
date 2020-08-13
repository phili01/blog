let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {category} = require('../serverDB/serverDB');

router.post('/category',  (req, res, next) => {
    category.findOne({}).then(result => {
        let checkRes =  result ? result.post : []
        res.send(checkRes).status(200);
    }).catch(err => {
        res.status(500).send(err);
    });
    return
});

module.exports = router

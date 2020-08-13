let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const {category, posts, connectStatus} = require('../serverDB/serverDB');

router.get('/',  (req,res, next) => {
    res.render('post')
})

router.get('/:id',  (req, res,next) => {
    res.render('post');
})

router.post('/',  (req, res, next) => {
    if (req.header !== null && req.header('data-categ') === 'post') {
        return fetchPost();
    }
    function fetchPost(conditions, meta) {
        let condition = {...conditions}
        connectStatus.then(() => {
            let isMeta = meta ? meta : {};
            let sort = req.header('data-categ').startsWith('filter') ? { score: { $meta: "textScore" } } : {created: -1};
            let curLimit = parseInt(req.header('limit'));
            let skip = parseInt(req.header('skip'));
            posts.find(condition, isMeta).countDocuments({}).then((cntTotal) => {
                posts.find(condition, isMeta).sort(sort).limit(curLimit).skip(skip).then(result => {
                    let cntArray= [];
                    let send = 0;
                    if (result.length < 1) {
                        res.send({cnt: cntArray, cntTotal}).status(200)
                    }
                    for (let cnt of result) {
                        fetch( cnt, cntArray).then(cnt => {
                            cntArray = cnt;
                            ++send 
                            if (send === result.length) {
                                res.send({cnt: cntArray, cntTotal}).status(200)
                            }
                        }) 
                    }
                    
                    function fetch(cnt, cntArray) {
                        return new Promise((resolve, reject) => {
                            let desc = cnt.desc;
                            cnt.desc = String(desc.substr(0, 180000));
                           let update ={};
                            update['category'] = cnt.category;
                            update['desc'] = cnt.desc;
                            update['image'] = cnt.image;
                            update['created'] = cnt.created;
                            update['title'] = cnt.title;
                            update['_id'] = cnt._id;
                            cntArray.push({...update});
                            resolve(cntArray)
                        })
                    }
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            }) 
        }).catch(err => {
            res.status(500).send(err);
        })
    }
    

    // if(req.header !== null && req.header('data-categ') && req.header('data-categ').startsWith('postSearch')) {
    //     filterCnt(JSON.parse(req.header('data-categ').split('==')[1])).then(filter => {
    //        let category = filter.category && filter.category.length > 0 ? {category: {$in: filter.category}} : {};
    //        posts.find({$text: { $search: filter.searchCnt }, ...filter.filterCnt,  ...category, mode: 'publish', _isCompleted: true}).then(result => {
    //             let resultCount = new String(result.length);
    //             res.send(resultCount).status(200);
    //         }).catch(err => {
    //             res.status(500).send(err);
    //         })
    //     })
    //     return ;
    // }
    
    if (req.header !== null && req.header('data-categ')) {  
        return fetchPost({category: req.header('data-categ')});
    }
});

module.exports = router

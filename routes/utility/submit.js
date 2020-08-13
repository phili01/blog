const {category} = require('../../serverDB/serverDB');
module.exports = submitForm = (content, model, mediaCnt) => {
   return new Promise ((resolve, reject) => {
        let categRaw = String(content.categ).split(',');
        let categ = [...new Set(categRaw)];
        let id = null;
        let newDoc = new model({
            category: categ,
            image: mediaCnt.image,
            title: content.title,
            desc: content.desc
        }); 

        category.countDocuments({}).then((result) => {
            if ( result < 1) { 
                let newCateg = new category({
                   post: categ
                });
                newCateg.save().then(() => {
                    newDoc.save().then(result => {
                        id = result._id;
                        resolve(id)
                    })
                }).catch(err => {
                    reject(err)
                });
                return 
            }
            category.findOneAndUpdate({}, {$addToSet: { post: { $each: categ } }}).then(() => {
                newDoc.save().then(result => {
                    id = result._id;
                    resolve(id)
                })
            }).catch(err => {
                reject(err)
            })
        })
    })
}
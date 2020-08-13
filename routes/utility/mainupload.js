const uuid = require('uuid');
let uploadImage = require('./uploadimage');
let checkFile = require('./checkfile');
const fs = require('fs');


let upload = (files, bucketName, coll) => {
  return new Promise((resolve, reject) => {
    let images = [];
    let imgDet = []
    let imageUploaded = 0;
    
    if (!files || files.length < 1) {
      let allFile =  []
      return resolve(allFile)
    }

    if (files.length === undefined) {
      files = [files]
    }

    for (let file of files) {
      checkFile(file.name, bucketName, coll).then(docs =>{
        let docInfo = docs && docs.length > 0 ? docs[0] : null;
          if (docInfo) {
            imgDet.push({id: docInfo._id, filename: docInfo.filename, type: `image/${docInfo.filename.split('.')[1]}`, position: file.position})
            fs.unlink(`./${file.path}`, function(err) {
              if (err) {
                return reject(err)
              }
              ++imageUploaded;
              if (imageUploaded === files.length) {
                resolve(imgDet)
              }
            })
          } else {
            uploadImage({path: `./${file.path}`, filename: file.name}).then(imgInfo => {
              imgDet.push({id: imgInfo._id, filename: imgInfo.filename, type: `image/${imgInfo.filename.split('.')[1]}`, position: file.position})
              ++imageUploaded;
              if (imageUploaded === files.length) {
                resolve(imgDet)
              }
            })
          }
      })
    }
  })
}

module.exports = upload
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const CategorySchema = new Schema({
    post: {
        type: Array,
        default: [String]
    }
})

const category = mongoose.model('category', CategorySchema);



module.exports = category;
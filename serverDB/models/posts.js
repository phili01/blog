const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    id: ObjectId,
    created: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    category: {
        type: Array,
        required: true
    },
    image: {
        type: Array,
        default: [String]
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    _isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
})

PostSchema.index({title: 'text'});
const posts = mongoose.model('posts', PostSchema);

module.exports = posts;

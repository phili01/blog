require('./config/config');
const {connectStatus} = require('./db/mongoose');
const posts = require('./models/posts');
const category = require('./models/category');
module.exports = {
    posts,
    category,
    connectStatus
};
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };

const connectStatus = mongoose.connect(process.env.MONGODB_URI, options);

module.exports = { connectStatus }
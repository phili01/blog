const express = require('express');
const path = require('path');
var favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const hbs = require('hbs');
let app = express();

app.use(function(req, res, next) {
  // if(req.headers.host.slice(0, 4) === 'www.') {
  //     var newHost = req.headers.host.slice(4);
  //     //   return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
  //     return res.redirect(301, 'https://slodge24.com' + req.url);
  //   }
    
    // if(req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
    //   return res.redirect(301, 'https://www.slodge24.com' + req.url);
    // }
      // let host = req.headers.host;
      // if (!host.match(/^www\..*/i)) {
      //   return res.redirect(301, "https://www." + host + req.url);
      // } 
      // // else if (req.headers['x-forwarded-proto'] !== 'https') {
      // //   return res.redirect('https://' + req.hostname + req.url);
      // // }
  next();
});

app.set('trust proxy', true);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json({limit: '100tb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '100tb', parameterLimit: 1099511627776}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, data-categ, authorization, limit, skip');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
let blogRoutes = require('./routes/post');
let formRoutes = require('./routes/form');
let categoryRoutes = require('./routes/category');
let mediaRoute = require('./routes/media');

app.use('/', [formRoutes, categoryRoutes, mediaRoute]);
app.use('/blog', blogRoutes)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.redirect('/');
});

module.exports = {app};

// Asenna ensin express npm install express --save

var express = require('express');
var fs = require("fs");
var cookieParser = require('cookie-parser');
var session = require('express-session')

var bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const handlebars = require('express-handlebars');
var app = express();
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir : __dirname + '/views/layout/',
  extname : 'hbs'
}));
app.use(cookieParser());

const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;


app.use(session({secret: 'keyboard cat', cookie: {maxAge: 60000}}));



app.use(express.static(__dirname + '/public'));

var user = {
}

//CORS middleware
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');

    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));
app.post('/login', (req, res)=>{
    if(req.body.username&&req.body.password) {
        user.username = req.body.username;
        user.password = req.body.password;
        user.session = req.sessionID
        res.cookie("userData", user);
        res.redirect("/")
    }
});

app.get('/logout', (req, res)=>{
    res.clearCookie("userData");
    res.redirect("/")
});
app.get('/', function (req, res, next) {
    if (req.cookies.userData) {  
        if (req.cookies.userData.session == req.sessionID){
            res.render('index', {
                layout : 'main'
              })
        } else {
            res.render('kirjaudu', {
                layout : 'main'
              })
        }
        
    } else {
        res.render('kirjaudu', {
            layout : 'main'
          })
    }
})

app.listen(port, hostname, () => {
    console.log(`Server running AT http://${hostname}:${port}/`);
});
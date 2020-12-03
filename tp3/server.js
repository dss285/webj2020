
// Asenna ensin express npm install express --save

var express = require('express');
var fs = require("fs");
var app=express();

// Otetaan käyttöön body-parser, jotta voidaan html-requestista käsitellä viestin body post requestia varten... *
var bodyParser = require('body-parser');
// Pyyntöjen reitittämistä varten voidaan käyttää Controllereita
var customerController = require('./customerController');

const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // Jos haluttaisiin rajata hakuja joidenkin ehtojen perusteella, niin määritettäisiin näin: 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
// Otetaan käyttöön CORS säännöt:
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //* ...jsonina


// Staattiset tiedostot, esim. kuvat, tyylitiedostot, scriptit käyttöliittymää varten
app.use(express.static('public'));

// REST API Asiakas

app.route('/Asiakas')
    .get(customerController.fetchAll)
    .post(customerController.create);
app.route('/Asiakas/:id')
    .delete(customerController.delete);

app.route('/Tyypit')
  .get(customerController.fetchTypes);
//

app.get('/', function(request, response){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    fs.readFile("index.html", function(err, data){
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.write(data);
      response.end();
    });
});


app.listen(port, hostname, () => {
  console.log(`Server running AT http://${hostname}:${port}/`);
});

/*
app.listen(port, () => {
    console.log(`Server running AT http://${port}/`);
  });
*/  
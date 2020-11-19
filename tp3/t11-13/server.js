
// Asenna ensin express npm install express --save

var express = require('express');
var fs = require("fs");
var app=express();

// Otetaan käyttöön body-parser, jotta voidaan html-requestista käsitellä viestin body post requestia varten... *
var bodyParser = require('body-parser');
// Pyyntöjen reitittämistä varten voidaan käyttää Controllereita
const handlebars = require('express-handlebars');
const http = require('http');
const url = require('url');
var footballController = require('./footballController')

const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir : __dirname + '/views/layout/',
  extname : 'hbs'
}));
var valitsevalikko = [
  "1 juttu",
  "2 juttu",
  "3 juttu",
  "4 juttu",
  "5 juttu",
  "6 juttu"
]
var seuraavattapahtumat = [
"28.10.2018 Suomi-Unkari miesten maaottelu",
"01.11.2018 Futsal turnaus Kuopiossa",
"12.11.2018 Kauden päättäjäiset Keskuskentällä",
"28.11.2018 Pikkujoulut"

]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //* ...jsonina


app.use(express.static('public'));

app.get('/sarjataulukko', async function(request, response) {
  var sarjataulukko = null
  try {
    sarjataulukko = await footballController.fetchSarjataulukko();
  } catch(error) {
    console.log(error)
  }
  response.render('sarjataulukko', {
    layout : 'index',
    valitsevalikko : valitsevalikko,
    seuraavattapahtumat : seuraavattapahtumat,
    sarjataulukko : sarjataulukko
  })

})
app.get('/pelaajatjajoukkueet', async function(request, response) {
  var pelaajat = null
  var joukkueet = null
  try {
    pelaajat = await footballController.fetchPelaajat();
    joukkueet = await footballController.fetchJoukkueet();
  } catch(error) {
    console.log(error)
  }
  var pelaajatstr = '<ul>';
  var joukkueetstr = '<ol>';
  if(pelaajat) {
    for(var pelaaja of pelaajat) {
      pelaajatstr += `<li>${pelaaja.Etunimi} ${pelaaja.Sukunimi} - ${pelaaja.Pelinumero}</li>`
    }
  }
  if(joukkueet) {
    for(var joukkue of joukkueet) {
      joukkueetstr += `<li>${joukkue.Nimi}, ${joukkue.Kaupunki} ${joukkue.Perustamisvuosi}</li>`
    }
  }
  pelaajatstr += '</ul>'
  joukkueetstr += '</ol>'
  response.render('pelaajatjajoukkueet', {
    layout : 'index',
    valitsevalikko : valitsevalikko,
    seuraavattapahtumat : seuraavattapahtumat,
    pelaajat : pelaajatstr,
    joukkueet : joukkueetstr
  })
})
app.get('/', function(request, response){
    response.render('main', 
    {
      layout : 'index', 
      valitsevalikko : valitsevalikko,
      seuraavattapahtumat : seuraavattapahtumat

    })
});


app.listen(port, hostname, () => {
  console.log(`Server running AT http://${hostname}:${port}/`);
});
'use strict'

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'aeon123',
  database: 'asiakas'
});
module.exports =
{
  fetchTypes: function (req, res) {
    connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function (error, results, fields) {
      if (error) {
        console.log("Virhe: " + error);
        res.status(500);
      }
      else {
        res.json(results)
      }
    });
  },
  fetchAll: function (req, res) {
    var query = "SELECT * FROM asiakas WHERE 1=1"
    if (req.query.hasOwnProperty('nimi') && req.query.nimi && req.query.nimi != "") {
      query += " AND nimi LIKE "+mysql.escape("%"+req.query.nimi+"%");
    }
    if (req.query.hasOwnProperty('osoite') && req.query.osoite && req.query.osoite != "") {
      query += " AND osoite LIKE "+mysql.escape("%"+req.query.osoite+"%");
      console.log(mysql.format(""));
    }
    if (req.query.hasOwnProperty('asty_avain') && req.query.asty_avain) {
      query += " AND asty_avain="+mysql.escape(req.query.asty_avain);
    }
    connection.query(query, function (error, results, fields) {
      if (error) {
        console.log("Virhe: " + error);
        res.status(500);
        res.json({"status" : "Error"})
      } else {
        res.json(results);
      }
    });
  }
}

'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'aeon123',
  database: 'asiakas'
});
/*
  MySQL escape estää SQL injektiot, jotka ovat vaarallisimpia hyökkäyksiä.
*/
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
    if (req.query.hasOwnProperty('nimi')) {
      query += " AND nimi LIKE "+mysql.escape("%"+req.query.nimi+"%");
    }
    if (req.query.hasOwnProperty('osoite')) {
      query += " AND osoite LIKE "+mysql.escape("%"+req.query.osoite+"%");
    }
    if (req.query.hasOwnProperty('asty_avain')) {
      query += " AND asty_avain="+mysql.escape(req.query.asty_avain);
    }
    connection.query(query, function (error, results, fields) {
      if (error) {
        console.log("Virhe: " + error);
        res.status(500);
      } else {
        res.json(results);
      }
    });

  }
}

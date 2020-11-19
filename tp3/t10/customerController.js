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
  },
  fetch : function(req, res) {
    if(!req.params.hasOwnProperty('id')) {
      res.status(400);
      res.json({"status" : "Error"});
    }
    connection.query("SELECT * FROM asiakas WHERE avain=?", [req.params.id], function(error, results, fields) {
      if(error) {
        console.log(error);
        res.status(500);
        res.json({"status" : "Error"})
      } else {
        res.status(200);
        res.json(results);
      }
    })
  },
  create : function(req, res) {

    if(!req.body.hasOwnProperty('nimi') ||  // Ehkä rumin ehtolauseke koskaan
    !req.body.hasOwnProperty('osoite') || 
    !req.body.hasOwnProperty('postinro') || 
    !req.body.hasOwnProperty('postitmp') || 
    !req.body.hasOwnProperty('asty_avain')||
    req.body.nimi == ""||
    req.body.osoite==""||
    req.body.postinro==""||
    req.body.postitmp==""||
    req.body.asty_avain==""
    ) {
      res.status(400);
      res.json({"status" : "Error", "message" : "Kaikki kentät pakollisia"})
      return;
    }
    connection.query("INSERT INTO asiakas (nimi, osoite, postinro, postitmp, luontipvm, asty_avain) VALUES (?, ?, ?, ?, CURDATE(), ?)",[req.body.nimi, req.body.osoite, req.body.postinro, req.body.postitmp, req.body.asty_avain], function(error, results, fields) {
        if(error) {
          console.log(error);
          res.status(500);
          res.json({"status" : "Error"})
        } else {
          res.status(200);
          res.json({"status" : "Success"});
        }
    })
  },
  delete : function(req, res) {
    if(!req.params.hasOwnProperty('id')) {
      res.status(400);
      res.json({"status" : "Error"});
    }
    connection.query("DELETE FROM asiakas WHERE avain=?",[req.params.id], function(error, results, fields) {
      if(error) {
        console.log(error);
        res.status(500);
        res.json({"status" : "Error"})
      } else {
        res.status(200);
        res.json({"status" : "Success"});
      }
    })
  },
  update : function(req, res) {
    if(!req.params.hasOwnProperty('id')) {
      res.status(400);
      res.json({"status" : "Error"});
    }
    if(!req.body.hasOwnProperty('nimi') ||  // Ehkä rumin ehtolauseke koskaan
    !req.body.hasOwnProperty('osoite') || 
    !req.body.hasOwnProperty('postinro') || 
    !req.body.hasOwnProperty('postitmp') || 
    !req.body.hasOwnProperty('asty_avain')||
    req.body.nimi == ""||
    req.body.osoite==""||
    req.body.postinro==""||
    req.body.postitmp==""||
    req.body.asty_avain==""
    ) {
      res.status(400);
      res.json({"status" : "Error", "message" : "Kaikki kentät pakollisia"})
      return;
    }
    connection.query("UPDATE asiakas SET nimi=?, osoite=?, postinro=?, postitmp=?, asty_avain=? WHERE avain=?", 
    [req.body.nimi, req.body.osoite, req.body.postinro, req.body.postitmp, req.body.asty_avain, req.params.id],
    function(error, results, fields) {
      if(error) {
        console.log(error);
        res.status(500);
        res.json({"status" : "Error"})
      } else {
        res.status(200);
        res.json({"status" : "Success"});
      }
    })
  }
}

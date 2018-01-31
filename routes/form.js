var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
	var con = mysql.createConnection({
	     host: "localhost",
	     user: "root",
	     password: "p@$$w0Rd1",
	     // database: "node"
	});
	con.query('SHOW DATABASES',function(err,result){
		console.log(result);
		var data = {
			Database : 'asdsadsa'
		};
  		res.render('form', { title: 'Create Tabs',active : 'nav-link.active',data:result});
  	});
});

router.post('/savedatabase', function(req, res, next) {	 
    var sql = "CREATE DATABASE "+req.body.databsename;
    console.log(sql);
   var query = con.query(sql, function (err,     result) {

    if (err) {
        res.send("Error Occured")
    } else {
        res.send("Database Created")
        //res.sendFile(path.join(__dirname + '/form.html'));
    }
    });
    //res.send('received the data.');
});

router.post('/savetable', function(req, res, next) {	
	var colnumber =  req.body.table_colnumber;
    var colname =  req.body.table_colname;
    var col_list = colname.split(';');
    var coltype =  req.body.table_coltype;
    var col_type = coltype.split(';');    
    var field_list = '';
    for (var i = 0; i < colnumber; i++) {
      if(field_list == '')
      {
        field_list = col_list[i]+ " "+col_type[i];
      }
      else
      {
        field_list = field_list+','+col_list[i]+ " "+col_type[i];
      }
    };
    
    //res.send(colnumber);
    var sql = "CREATE TABLE "+req.body.create_tablename+" ("+field_list+" )";
    console.log(sql);
    var db = req.body.dbname_table
    console.log(db.trim())
    var con1 = mysql.createConnection({
         host: "localhost",
         user: "root",
         password: "p@$$w0Rd1",
         database: db
    });
   var query = con1.query(sql, function (err,     result) {
    if (err) {
        res.send("Error Occured")       
    } else {
        res.send('Table created');
        //res.sendFile(path.join(__dirname + '/form.html'));
    }
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "p@$$w0Rd1",
     database: "node"
});

/* GET home page. */
router.post('/', function(req, res, next) {
	con.connect(function(err){
		if (err) 
		{
			console.log("Not Connected");
		}
		else
		{
			console.log("Connected");
			var sql = "INSERT INTO `form_value` (`fname`,`ftype`,`tabname`) VALUES ('"+req.body.fieldname+"','"+req.body.fieldtype+"','"+req.body.tabname+"')";
			con.query(sql,function(err,result){
				if(err)
				{
					console.log("Error Occured");
				}
				else
				{
					console.log("Record Inserted");
					res.redirect("/form");
				}
			});			
		}
	});	
 	console.log(req.body.fieldname);
    console.log(req.body.fieldtype);
    console.log(req.body.tabname);
});

module.exports = router;

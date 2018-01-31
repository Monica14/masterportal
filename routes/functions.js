var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.post('/', function(req, res, next) {
	console.log ('Request Received');
   res.send("yes");
	// console.log('body: ' + JSON.stringify(req.body));
	// res.send("gfdgfd");
	// var con = mysql.createConnection({
	//      host: "localhost",
	//      user: "root",
	//      password: "p@$$w0Rd1",
	//      // database: "node"
	// });
	// con.query('SHOW DATABASES',function(err,result){
	// 	console.log(result);
	// 	var data = {
	// 		Database : 'asdsadsa'
	// 	};
 //  		res.render('form', { title: 'Create Tabs',active : 'nav-link.active',data:result});
 //  	});
});

module.exports = router;

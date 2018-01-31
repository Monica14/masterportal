var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var common_library = require("./common_library.js");
// var validator = require('node-validator');
// var validate = require("./validation.js");


/* GET home page. */
router.get('/', function(req, res, next) {	
	common_library.select('access_rights','where 1',function(err,content){
		console.log()
		if(!err){
			res.render('access_rights', { title: 'Access Rights',tabledata: content });	
		}
	});
});

router.post('/valid', function(req, res, next) {
	req.assert('fname', 'Name is required').isNumber();   
	var errors = req.validationErrors(); 
	res.send(errors);
});



module.exports = router;

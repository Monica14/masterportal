var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var common_library = require("./common_library.js");
// var validator = require('node-validator');
// var validate = require("./validation.js");


/* GET home page. */
router.get('/', function(req, res, next) {	
	common_library.selectdist('form_name','where form_name !="" and tab_name!=""','form_name,tab_name',function(err,content){
		if(!err){
			console.log(content);
			res.render('validate', { title: 'Core Fields',tabledata: content });	
		}
	});
});


module.exports = router;

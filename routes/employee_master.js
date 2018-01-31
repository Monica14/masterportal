var express = require('express');
var router = express.Router();
var common_library = require("./common_library.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	common_library.selectdist('form_name','where tab_name !=""','tab_name',function(err,content){
	common_library.selectdist('form_name','where field_name !=""','field_name,field_type,field_extra_info,tab_name,validate,error_message,namefield',function(err,content1){
	//common_library.deleterecord('form_name','where field_name =""','where field_name ==""',function(err,content2){
		if (!err) 
		{
			console.log(content1);
			res.render('employee_master', { title: 'Employee Master',tablecontent:content,field_content:content1 });
		}	
	//});	
	}); 
	}); 
});

module.exports = router;

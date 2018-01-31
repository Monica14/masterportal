var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var common_library = require("./common_library.js");
// var validator = require('node-validator');
// var validate = require("./validation.js");


/* GET home page. */
router.get('/', function(req, res, next) {	
	common_library.selectdist('form_name','where form_name !="" and tab_name!=""','form_name,tab_name',function(err,content){
	common_library.tablenames('unipart',function(err,tablelist){
	common_library.databasenames(function(err,dblist){	
		if(!err){
			//res.send(tablelist);
			res.render('core_master', { title: 'Core Fields',tabledata: content,tablelist: tablelist,dblist: dblist });	
		}
	});
	});
	});
});

router.get('/getdata1', function(req, res, next) {	
	common_library.selectdist('form_name','where field_name !=""','field_name,id,columnname,tablename,dbname',function(err,content){
		res.send(content);
	});
});

router.get('/getdata', function(req, res, next) {	
	common_library.selectdist('form_name','where form_name !="" and tab_name!=""','form_name,tab_name',function(err,content){
		res.send(content);
	});
});

router.get('/getreportdata', function(req, res, next) {	
	common_library.select('report','where  report_name !=""',function(err,content){
		res.send(content);
	});
});

router.post('/edit', function(req, res) {
	common_library.select('form_name','where id ="'+req.body.id+'"',function(err,content){
		res.send(content);
	});
});

router.post('/columnedit', function(req, res) {
	//console.log(req.body.form_name);
	//return res.send('1');
	fieldlist = req.body.id;
	field_data = "`"+req.body.columnname+"` `"+req.body.columnname+"` "+req.body.coltype+"";
	console.log(field_data);
	common_library.columnedit(req.body.dbname,req.body.tablename,field_data,fieldlist,function(err,result){
		if(!err){
			res.send("successfully updated");
		}
		else
		{
			res.send("Error Occured");
		}
		
	});
});

router.get('/get_columndata', function(req, res, next) {	
	common_library.columnlist('node','form_name','',function(err,content){
		res.send(content);
	});
});

router.post('/updatedata', function(req, res, next) {
	//console.log(req.body.form_name);
	//return res.send('1');
	where = 'where id = '+req.body.id;
	delete req.body.id;
	common_library.update('form_name',req.body,where,function(err,result){
		if(!err){
			console.log(result);
		}
		else
		{
			console.log(err);
		}
		
	});
});

router.post('/get_columndata_dynamic', function(req, res, next) {	
	common_library.columnlist('unipart',req.body.tablename,'',function(err,content){
		res.send(content);
	});
});

router.post('/valid', function(req, res, next) {
	req.assert('fname', 'Name is required').isNumber();   
	var errors = req.validationErrors(); 
	res.send(errors);
});

router.post('/savedata', function(req, res, next) {
	console.log(req.body.form_name);
	//return res.send('1');
	common_library.insert('form_name',req.body,function(err,result){
		if(!err){
			res.send("hhh");
		}
		else
		{
			res.send("uiui");
		}
		
	});
});

router.get('/tablenames', function(req, res) {
	//console.log(req.body.form_name);
	//return res.send('1');
	common_library.tablenames('node',function(err,result){
		if(!err){
			res.send(result);
		}
		else
		{
			console.log(err);
		}
		
	});
});

router.post('/delrow', function(req, res) {
	//console.log(req.body.form_name);
	//return res.send('1');
	where = 'where `columnname` = "'+req.body.colname+'"';
	//res.send(req.body.tablename1);
	common_library.deleterecord(req.body.tablename1,'none',where,function(err,result){
		if(!err){
			res.send("Success");
		}
		else
		{
			res.send(err);
		}
		
	});
});

router.post('/columnadd', function(req, res) {
	//console.log(req.body.form_name);
	//return res.send('1');
	fieldlist = req.body.columnname+" "+req.body.coltype;
	console.log(fieldlist);
	common_library.columnadd(req.body.dbname,req.body.tablename,fieldlist,function(err,result){
		if(!err){
			console.log(result);
		}
		else
		{
			console.log(err);
		}
		
	});
});

router.post('/columndel', function(req, res) {
	//console.log(req.body.form_name);
	//return res.send('1');
	fieldlist = req.body.columnname+" "+req.body.coltype;
	console.log(fieldlist);
	common_library.columndel(req.body.dbname,req.body.tablename,req.body.colname,function(err,result){
		if(!err){
			console.log(result);
		}
		else
		{
			console.log(err);
		}
		
	});
});


module.exports = router;

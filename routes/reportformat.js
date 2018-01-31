var express = require('express');
var router = express.Router();
var common_library = require("./common_library.js");

var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {	
	common_library.select('report','where report_name !=""',function(err,     result){
		//res.send(result);reportformat
	  res.render('reportformat', { title: 'Report'});
	});	
});

router.post('/getreportdata', function(req, res, next) {	
	common_library.select('report','where report_name ="'+req.body.report_name+'"',function(err,content){
	common_library.selectdist(content[0].tablename,'where 1',content[0].columnname,function(err,content1){
		res.send(content[0]['columnname']);
	});
	});
});

router.post('/getreportdata2', function(req, res, next) {	
	//console.log(req.body);
	common_library.select('report','where report_name ="'+req.body.report_name+'"',function(err,content){
	common_library.selectdist(content[0].tablename,'where 1',content[0].columnname,function(err,content1){
		res.send(content1);
	});
	});
});

router.post('/getdata', function(req, res, next) {
	db = req.body.dbname;
	tablename = req.body.tablename;
	where = 'where username = "'+req.body.username+'" and password = "'+req.body.password+'"';	
	common_library.columnlistnew(db,tablename,'',function(err,     result){
		if(!err){
			res.send("success");	
		}
	});
  console.log(where);
});

router.post('/save', function(req, res, next) {
	// db = req.body.dbname;
	// tablename = req.body.tablename;
	// where = 'where username = "'+req.body.username+'" and password = "'+req.body.password+'"';	
	common_library.insert('report',req.body,function(err,     result){
		if(!err){
			res.send(result);	
		}
	});
  //console.log(where);
});

router.get('/databsenames', function(req, res, next) {
	common_library.databasenames(function(err,     dbresult){
		res.send(dbresult);
	});
});

module.exports = router;

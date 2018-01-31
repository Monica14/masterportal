var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var jsreport = require('jsreport-core')({ tasks: { allowedModules: '*' } })
jsreport.use(require('jsreport-xlsx')())
jsreport.use(require('jsreport-handlebars')())
// jsreport.use(require('jsreport-html-to-xlsx')()) 
//jsreport.use(require('jsreport-jsrender')())
var jsrender = require('jsrender');

router.get('/', function(req, res, next) { 
	var conversion = require("html-to-xlsx")();
	conversion("<table><tr><td>cell value</td></tr></table>", function(err, stream){
	  //readable stream to xlsx file 
	  stream.pipe(res);
	});
});
module.exports = router;
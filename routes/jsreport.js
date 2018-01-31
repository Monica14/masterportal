var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
 jsreport = require('jsreport');
// var jsreport = require('jsreport-core')()
// jsreport.use(require('jsreport-xlsx')())
// jsreport.use(require('jsreport-handlebars')())

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = {
  "people": [{
    "name": "Jan Blaha",
    "age": 31,
    "gender": "male"
  }, {
    "name": "Paule Noic",
    "age": 24,
    "gender": "female"
  }, {
    "name": "Trent Menzor",
    "age": 51,
    "gender": "male"
  }, {
    "name": "Gury Misneer",
    "age": 72,
    "gender": "male"
  }, {
    "name": "Linda Blend",
    "age": 11,
    "gender": "male"
  }, {
    "name": "Milan Novak",
    "age": 9,
    "gender": "male"
  }, {
    "name": "Peter Gabriel",
    "age": 48,
    "gender": "male"
  }, {
    "name": "Fidol Gutz",
    "age": 15,
    "gender": "male"
  }, {
    "name": "Katerina Miska",
    "age": 69,
    "gender": "female"
  }]
};
var jsrender = require('jsrender');
// console.log(path.resolve(__dirname + '/..') + '/views/report.jade');
// var page = fs.readFileSync(path.resolve(__dirname + '/..') + '/views/report.jade');
var html = jsrender.renderFile(path.resolve(__dirname + '/..') + '/views/index.html', {data: 'hello'})
   jsreport.render({
        template: {
        	shortid: 'r18kyD83ce',
            content: html,
            engine: 'jsrender',
           	recipe: 'phantom-pdf'
        }
    }).then(function(resp){
        resp.stream.pipe(res);
    })
});

module.exports = router;

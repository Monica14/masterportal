var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')

router.get('/', function(req, res, next) { 
 res.render('report_data', { title: 'Report'});
});

router.get('/generate', function(req, res, next) { 
  jsreport.serverUrl = 'http://localhost:5488';   
//URL path in which jsreport server runs  
/* For the sample purpose, the below JSON can be used. But in real time this data should come from Web API calls */  
  
var json_data = {
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
}

 var request = {  
        template: {  
              name: 'Population'  
             },   
                   data: json_data  
        };  
jsreport.render($("#placeholder"), request);  
});

module.exports = router;
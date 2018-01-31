var express = require('express');
var router = express.Router();
var common_library = require("./common_library.js");

router.get('/', function(req, res, next) {
  res.render('angular', { title: 'Validations' });
});

router.post('/auth', function(req, res, next) {
	where = 'where username = "'+req.body.username+'" and password = "'+req.body.password+'"';	
		common_library.select('login',where,function(err,     result){
			if(!err){
				res.send("success");	
			}
		});
  console.log(where);
});

module.exports = router;

var express = require('express');
var router = express.Router();
// var tokens = require('csurf');
var common_library = require("./common_library.js");

var app = express();
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(tokens());

// app.post('/login', passport.authenticate('local', { successRedirect: '/',
//                                                     failureRedirect: '/login' }));

/* GET home page. */
router.get('/', function(req, res, next) {
 // var cs = req.csrfToken();
 //console.log(cs);
  res.render('adminlogin', { title: 'Log in' });
});

router.post('/auth', function(req, res, next) {
	where = 'where username = "'+req.body.username+'" and password = "'+req.body.password+'"';
	// if (!tokens.verify(secret, token)) {
	//   throw new Error('invalid token!')
	// }
	// else
	// {
		common_library.select('login',where,function(err,     result){
			if(!err){
				res.send("success");	
			}
		});
	// }	
  console.log(where);
});

module.exports = router;

var express = require('express');
var router = express.Router();
// var email   = require("./node_modules/emailjs/email");
/* GET home page. */
router.get('/', function(req, res, next) {
	  var server 	= email.server.connect({
	   user:    "demo.appraisel@gmail.com", 
	   password:"appraisel@123", 
	   host:    "smtp.gmail.com", 
	   ssl:     true
	});

	// send the message and get a callback with an error or details of the message that was sent
	server.send({
	   text:    "i hope this works", 
	   from:    "demo.appraisel@gmail.com", 
	   to:      "demo.appraisel@gmail.com",
	   //cc:      "else <else@your-email.com>",
	   subject: "testing emailjs"
	}, function(err, message) { console.log(err || message); });

	// EXAMPLE USAGE - html emails and attachments

	// var email 	= require("./path/to/emailjs/email");
	// var server 	= email.server.connect({
	//    user:	"username", 
	//    password:"password", 
	//    host:	"smtp.your-email.com", 
	//    ssl:		true
	// });

	// var message	= {
	//    text:	"i hope this works", 
	//    from:	"you <username@your-email.com>", 
	//    to:		"someone <someone@your-email.com>, another <another@your-email.com>",
	//    cc:		"else <else@your-email.com>",
	//    subject:	"testing emailjs",
	//    attachment: 
	//    [
	//       {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
	//       {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
	//    ]
	// };

	// // send the message and get a callback with an error or details of the message that was sent
	// server.send(message, function(err, message) { console.log(err || message); });
});

module.exports = router;

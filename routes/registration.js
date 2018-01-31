var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sms = require("textlocal");
var csrf = require('csurf');
var app = express();
app.use(require('csurf')({cookie: true}));
con = mysql.createConnection({
	     host: "localhost",
	     user: "root",
	     password: "p@$$w0Rd1",
	     database: "node"
});

var insert = function(table,data,callback)
{
	//console.log(table);
	//console.log(data);
	str = "insert into "+table+" (";
	for(ans in data){
		str+= ans + ","
	}
	finalstr= str.slice(0,-1);
	finalstr+=")";

	finalstr+=" values ('";
	for(ans in data){
		finalstr+= data[ans] + "','"
	}
	finalstr1= finalstr.slice(0,-2);
	finalstr1+=")";
	

	con.query(finalstr1, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

var select = function(table,where,callback)
{
	//console.log(table);
	//console.log(data);
	query = "select * from "+table+" "+where;
	
	con.query(query, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

var update = function(table,setval,where,callback)
{
	//console.log(table);	
	str = "update `"+table+"` set ";
	console.log(setval);
	for(ans in setval)
	{		
		str += ans+'= "'+setval[ans]+'" ,'
	}
	str = str.slice(0,-1);
	str = str+' '+where;
	console.log(str);
	con.query(str, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}
   	else{
   		callback(null,result);
   	}
    });
}

var deleterecord = function(table,setval,where,callback)
{
	str = "delete from `"+table+"` "+where;	
	console.log(str);
	con.query(str, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}
   	else{
   		callback(null,result);
   	}
    });
}/* GET home page. */
router.get('/',function(req, res, next) {
	select('register','where 1',function(err,content){
		
		console.log(req.csrfToken());
		if(!err){
			res.render('registration', { title: 'Create User',tabledata: content,csrfToken: req.csrfToken() });			
		}
	});
  //res.render('registration', { title: 'Registration Form' });
});

router.post('/save', function(req, res, next) {
	//res.send('hello')
	console.log("fghgfhf");
	console.log(req.body.tablename);
	tablename = req.body.tablename;
	delete req.body.confirm_password;
	delete req.body.tablename;
	//console.log(req.body);

	insert(tablename,req.body,function(err,content){
		if(!err){
			// console.log(typeof sms);

			// var opts = {
			//     uname: 'demo.appraisel@gmail.com',
			//     hash: '094bf635b44cf5f601cd185bad5b9afb11cf2a698d186e0042a07fc26e6e9515',
			//     selectednums: req.body.mobilenumber,
			//     message: 'test jhgfdkjhgfjhgf'
			// };
			 
			// sms.sendsms(opts, function(err,res) {
			//     console.log(res);
			//     console.log(err);
			// });
			
				res.send("success");
			
		}
	});
	

});

router.post('/update', function(req, res, next) {
	//res.send('hello')
	console.log(req.body.tablename);
	console.log(req.body);
	where = 'where email_id = "'+req.body.email_id1+'"';
	tablename = req.body.tablename;
	// delete req.body.confirm_password;
	delete req.body.tablename;
	delete req.body.email_id1;
	

	update(tablename,req.body,where,function(err,content){
		if(!err){
			res.send("success");			
		}
		else
		{
			console.log(err);
		}
	});

});

router.post('/delete', function(req, res, next) {
	//res.send('hello')
	console.log(req.body.params);
	where = 'where email_id = '+"'"+req.body.email_id1+"'";
	tablename = req.body.tablename;
	// delete req.body.confirm_password;
	delete req.body.tablename;
	//console.log(req.body);

	deleterecord(tablename,req.body,where,function(err,content){
		if(!err){
			res.send("success");			
		}
	});

});

module.exports = router;

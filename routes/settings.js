var express = require('express');

var app = express();
var router = express.Router();
var common_library = require("./common_library.js");



var ssn ;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('settings', { title: 'Express' });
});

router.post('/savedata', function(req, res) {
	//common_library.select('form_name','where id ="'+req.body.id+'"',function(err,content){
		var list_data = req.body.list_items.split(',');
		//delete req.body.list_items[list.length]	
		
		//res.send(list_data);
		// for (var i = 0; i < list_data.length; i++) {
			//var list_data1 = list_data[i].split(':');
			// var tablename1 = list_data[list_data.length-2];
			// var dbname1 = list_data[list_data.length-1];
			// var tablename = tablename1.split(':');
			// delete list_data[list_data.length-2]
			// delete list_data[list_data.length-1]
			//console.log(tablename[1])
			// if (list_data1[0].trim() == "tablename") 
			// {
			// 	console.log(list_data1);
			// };
			//res.send(req.body.flag);
			if (req.body.flag == "save") 
			{
				common_library.insert_backend(req.body.tablename,list_data,function(err,content){
					res.send(content)
				});
			}
			else if (req.body.flag == "update")
			{	
				current_yr = new Date().getFullYear();
				prev_yr = new Date().getFullYear()+1
				if (req.body.where != "") 
				{
					where = ' year = "'+current_yr+'-'+prev_yr+'"';
				}
				else
				{
					where = where+' and year = "'+current_yr+'-'+prev_yr+'"';
				}
							
				common_library.update_backend(req.body.tablename,list_data,where,function(err,content){
					console.log(content)
				});
			}
			
		// };
	//});
});

router.post('/deletedata', function(req, res) {
	//where = 'where '+req.body.where
		common_library.deleterecord(req.body.tablename,'',req.body.where,function(err,content){
			res.send(content)
		});
});

router.post('/settab', function(req, res) {
	//ssn = req.session;
	//sess.tabname_active = req.body.tabname_active;
	//console.log(sess.tabname_active)
	req.session.tabname_active = req.body.tabname_active;				
	res.locals.tabname_active = req.session.tabname_active;
	req.session.firstName = 'Aniruddha';
	res.locals.firstName = req.session.firstName;
	var col_content = '';
	common_library.select('form_name','where form_name IS NOT NULL and tab_name = "'+req.body.tabname_active+'"',function(err,content){
		for (var i = 0; i < content.length; i++) {
			if (i == 0) 
			{
				col_content = content[i]['columnname'];
			}
			else
			{
				col_content = col_content+","+content[i]['columnname'];
			}
			
		};
		// if (content['0']['tablename'] != null) 
		// {
			req.session.tablename_session = content['0']['tablename'];				
			res.locals.tablename_session = req.session.tablename_session;
		// };
		// if (content['0']['dbname'].trim() != null) 
		// {
			req.session.database_session = content['0']['dbname'];				
			res.locals.database_session = req.session.database_session;
		// };
		req.session.tablecontent_session = col_content;				
		res.locals.tablecontent_session = req.session.tablecontent_session;
		//res.send(req.session);
		res.send(req.session.tablecontent_session);
	});
	// req.session.lastName = 'Chakraborty';
	//console.log('req.session: '+req.locals.tabname_active);
	
});

router.get('/getdata_value', function(req, res, next) {	
	common_library.select('settings','where setgoal_from IS NOT NULL and setgoal_to IS NOT NULL',function(err,content){
		res.send(content);
	});
});

router.post('/getdata', function(req, res) {
		var list_data = req.body.list_items.split(',');
		delete list_data[list_data.length-2]
		delete list_data[list_data.length-1]
		finalstr1= list_data.slice(0,-2);
		console.log(req.body.tablename)
		// for (var i = 0; i < list_data.length; i++) {
		// 	var list_data1 = list_data[i].split(':');
		// 	var tablename1 = list_data[list_data.length-2];
		// 	var dbname1 = list_data[list_data.length-1];
		// 	var tablename = tablename1.split(':');
			
		// 	//console.log(tablename[1])
		// 	// if (list_data1[0].trim() == "tablename") 
		// 	// {
		// 	// 	console.log(list_data1);
		// 	// };
		current_yr = new Date().getFullYear();
		prev_yr = new Date().getFullYear()+1
		//console.log(current_yr+'-'+prev_yr)
		where = 'where year = "'+current_yr+'-'+prev_yr+'" and '+req.body.where;
			common_library.selectdist(req.body.tablename,where,finalstr1,function(err,content){
				res.send(content)
			});
		// };
	//});
});

module.exports = router;

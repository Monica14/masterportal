var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var tokens = require('csurf');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var Validator = require('express-validator');

// var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var savedata = require('./routes/saver_record');
var tabs = require('./routes/tabs');
var form = require('./routes/form');
var functions = require('./routes/functions');
var login = require('./routes/login');
var register = require('./routes/registration');
var access_rights = require('./routes/access_rights');
var core_master = require('./routes/core_master');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(tokens());
//app.use(Validator);

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
app.use('/javascripts',express.static('public/javascripts'));
app.use('/scss',express.static('public/scss'));
app.use('/css',express.static('public/stylesheets'));
app.use('/vendor',express.static('public/vendor'));

// app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/saverecord', savedata);
app.use('/tabs', tabs);
app.use('/form', form);
app.use('/functions', functions);
app.use('/login', login);
app.use('/registration', register);
app.use('/access_rights', access_rights);
app.use('/core_master', core_master);
// app.get('/', function(req, res) {
//     res.render('index');
// });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

var mysql = require('mysql');
var con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "p@$$w0Rd1",
     // database: "node"
});

// app.get('/form', function(req, res) {
//   var options = {
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true,
//         'name': 'MattDionis',
//         'origin':'stackoverflow' 
//     }
//   };
//     res.sendFile(path.join(__dirname + '/form.html'),options);
// });

app.get('/getdata', function(req, res) {
    con.query('SELECT * FROM `form_value`',function(err,result){
      if(err)
      {
      console.log("Problem with MySQL"+err);
      }
      else
      {
        console.log("getdata");
        res.json(users);
      }   
      //res.sendFile(path.join(__dirname + '/form.html'),{data:result});
      //res.send(result);
    });
    
});

 app.post('/savedatabase', function(req, res, next) {
    var cope = req.body;
    console.log('request received:', req.body);
    var sql = "CREATE DATABASE "+req.body.dbname;
   var query = con.query(sql, function (err,     result) {
    if (err) {
        console.error("er");        
    } else {
        console.log('Database created');
        res.redirect('/form');
        //res.sendFile(path.join(__dirname + '/form.html'));
    }
    });
    //res.send('received the data.');
    });

 app.post('/savetable', function(req, res, next) {   
    var colnumber =  req.body.colnumber;
    var colname =  req.body.colname;
    var col_list = colname.split(';');
    var coltype =  req.body.coltype;
    var col_type = coltype.split(';');    
    var field_list = '';
    for (var i = 0; i < colnumber; i++) {
      if(field_list == '')
      {
        field_list = col_list[i]+ " "+col_type[i];
      }
      else
      {
        field_list = field_list+','+col_list[i]+ " "+col_type[i];
      }
    };
    console.log(req.body.tablename);
    console.log(field_list);
    var sql = "CREATE TABLE "+req.body.tablename+" ("+field_list+" )";
    var con1 = mysql.createConnection({
         host: "localhost",
         user: "root",
         password: "p@$$w0Rd1",
         database: req.body.dbname
    });
   var query = con1.query(sql, function (err,     result) {
    if (err) {
        console.log(err);        
    } else {
        console.log('Table created');
        res.sendFile(path.join(__dirname + '/form.html'));
    }
    });
    //res.send('received the data.');
    });

   app.post('/savercolumn', function(req, res, next) {   
    var colnumber =  req.body.colnumber;
    var colname =  req.body.colname;
    var col_list = colname.split(';');
    var coltype =  req.body.coltype;
    var col_type = coltype.split(';');    
    var field_list = '';
    for (var i = 0; i < colnumber; i++) {
      if(field_list == '')
      {
        field_list = col_list[i]+ " "+col_type[i];
      }
      else
      {
        field_list = field_list+','+col_list[i]+ " "+col_type[i];
      }
    };
    console.log(req.body.tablename);
    console.log(field_list);
    var sql = "ALTER TABLE "+req.body.tablename+" ADD COLUMN "+field_list;
    var con1 = mysql.createConnection({
         host: "localhost",
         user: "root",
         password: "p@$$w0Rd1",
         database: req.body.dbname
    });
   var query = con1.query(sql, function (err,     result) {
    if (err) {
        console.log(err);        
    } else {
        console.log('Column Updated');
        res.sendFile(path.join(__dirname + '/form.html'));
    }
    });
    //res.send('received the data.');
    });

 app.post('/saverecord', function(req, res, next) {
    var cope = req.body;
    console.log('request received:', req.body);
    var sql = "INSERT INTO `"+req.body.tablename+"` (`fname`,`ftype`,`tabname`) VALUES ('"+req.body.fieldname+"','"+req.body.fieldtype+"','"+req.body.tabname+"')";
   var query = con.query(sql, function (err,     result) {
    if (err) {
        console.error(err);
        return res.send(err);
    } else {
        return res.send('Record Saved');
        res.sendFile(path.join(__dirname + '/form.html'));
    }
    });
    //res.send('received the data.');
    });

// app.post('/quotes', function(req, res) {
//     console.log(req.body);
// });

// catch 404 and forward to error handler
app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

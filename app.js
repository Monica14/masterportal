var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var csrf = require('csurf');

// var tokens = require('csurf');
var cookieParser = require('cookie-parser');
var express_session = require('express-session');
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
var blank = require('./routes/blank');
var angular = require('./routes/angular');
var employee_master = require('./routes/employee_master');
var company_master = require('./routes/company_master');
var report = require('./routes/report');
var email_configuration = require('./routes/email_configuration');
var validate = require('./routes/validate');
var dynamicreport = require('./routes/dynamicreport');
// var jsreport = require('./routes/jsreport');
var jsreportexcel = require('./routes/jsreportexcel');
var sendmail = require('./routes/sendmail');
var reportformat = require('./routes/reportformat');
var report_data = require('./routes/report_data');
var adminlogin = require('./routes/adminlogin');
var dashboard = require('./routes/dashboard');
var settings = require('./routes/settings');

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
app.use(express_session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
// app.use(function(req,res,next){
//     res.locals.tabname_active = req.session;
//     next();
// });
app.use(require('csurf')({cookie: true}));

app.use(function (req, res, next) {
  console.log(req.csrfToken());
  res.cookie('XSRF-TOKEN', req.csrfToken())
  next()
})

// app.use(tokens());
//app.use(Validator);
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
app.use('/javascripts',express.static('public/javascripts'));
app.use('/scss',express.static('public/scss'));
app.use('/css',express.static('public/stylesheets'));
app.use('/vendor',express.static('public/vendor'));
app.use('/js',express.static('public/js'));
app.use('/css',express.static('public/css'));
app.use('/src',express.static('public/font'));
app.use('/font',express.static('public/src'));
app.use('/thirdparty',express.static('public/thirdparty'));
app.use('/tools',express.static('public/tools'));
app.use('/images',express.static('public/images'));
app.use('/lib',express.static('public/lib'));
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
app.use('/blank', blank);
app.use('/angular', angular);
app.use('/employee_master', employee_master);
app.use('/company_master', company_master);
app.use('/report', report);
app.use('/validate', validate);
app.use('/email_configuration', email_configuration);
app.use('/dynamicreport', dynamicreport);
// app.use('/jsreport', jsreport);
app.use('/jsreportexcel', jsreportexcel);
app.use('/sendmail', sendmail);
app.use('/reportformat', reportformat);
app.use('/report_data', report_data);
app.use('/adminlogin', adminlogin);
app.use('/dashboard', dashboard);
app.use('/settings', settings);

var sess;

app.get('/', function(req, res) {
    res.render('index', { title: 'Dashboard' });
});

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/dashboard.html'));
// });

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

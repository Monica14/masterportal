var express = require('express');
var router = express.Router();
var common_library = require("./common_library.js");
var multer = require('multer');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        console.log(file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var upload = multer({ //multer settings
    storage: storage
}).single('file');
//var upload = multer({ dest: 'uploads/' })
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('create_task', { title: 'Create Task' });
});

router.post('/save', function (req, res, next) {
    //console.log(req.file);
    upload(req, res, function (err) {
        // req.body.filename = req.file_data.filename;
        // req.body.path = req.file_data.destination;
        console.log(req.file);
        // common_library.insert(req.body.table_name, req.body, function (err, result) {
        //     if (!err) {
        //         res.send("Success")
        //     }
        //     else {
        //         console.log(err)
        //     }
        // })
        //console.log(req.file.filename);
        res.send(req.files)
        // if(err){
        //      res.json({error_code:1,err_desc:err});
        //      return;
        // }
        //  res.json({error_code:0,err_desc:null});
    })
    // table_name = req.body.table_name;
    // delete req.body.table_name;
    // //res.send(req.body)
    // common_library.insert(table_name, req.body, function (err, result) {
    //     res.send(result);
    // })
});

router.post('/get', function (req, res, next) {
    common_library.select('project_data', req.body.where, function (err, result) {
        res.send(result);
    })
});

router.post('/update', function (req, res, next) {
    common_library.update('project_data', req.body.setdata, req.body.where, function (err, result) {
        res.send(result);
    })
});

module.exports = router;

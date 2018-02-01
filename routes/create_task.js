var express = require('express');
var router = express.Router();
var common_library = require("./common_library.js");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('create_task', { title: 'Email Settings' });
});

router.post('/save', function (req, res, next) {
    table_name = req.body.table_name;
    delete req.body.table_name;
    //res.send(req.body)
    common_library.insert(table_name,req.body,function(err,result){
        res.send(result);
    })
    
});

module.exports = router;

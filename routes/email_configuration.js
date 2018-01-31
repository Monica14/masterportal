var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('email_configuration', { title: 'Email Settings' });
});

module.exports = router;

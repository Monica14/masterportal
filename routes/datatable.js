var express = require('express');
var router = express.Router();

$(document).ready(function() {
	//alert("dsadas");
    $('#database_list').DataTable({
        "pagingType": "full_numbers"
    });
    $("body").on('click','.delete_db',function(){
    	router.get('/', function(req, res, next) {
    		res.render('/admin');
    	});
    });
} );
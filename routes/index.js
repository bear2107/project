var express = require('express');
var router = express.Router();
var hfcutil=require('../backend/chaincode');
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
	console.log(req.user.username);
	hfcutil.enrolluser(req.user.username);


});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		//console.log(req.user.name);
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
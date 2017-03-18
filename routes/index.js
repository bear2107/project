var express = require('express');
var router = express.Router();
var hfcutil=require('../backend/chaincode');
// Get Homepage
var chaincodeID;
var util=require('util');
router.get('/', ensureAuthenticated, function(req, res){

	//console.log(req.user.username);
	hfcutil.enrolluser(req.user.username);
	//chaincodeID=hfcutil.chaincodeID;
	//console.log(chaincodeID);
	res.render('index');

});
var counts;
router.post('/transactions', function(req, res) {
	// Amount to transfer
	var amount = req.body.amount.toString();
	console.log("amount"+amount);
	// Construct the invoke request
	//hfcUtil.enrolluser(req.user.username);
	count(req.user.username);
	chaincodeID=hfcutil.chains();
	var invokeRequest = {
		// Name (hash) required for invoke
		chaincodeID: chaincodeID,
		// Function to trigger
		fcn: "invoke",
		// Parameters for the invoke function
		args: [req.user.username, counts+1]
	};

hfcutil.chain.getMember(req.user.username,  function(error, user) {
                if (error)
                    reject(" Failed to register and enroll " + userName + ": " + error);

                console.log("Enrolled %s successfully\n");
                console.log("invoke chaincode ...");
	// Trigger the invoke transaction
	var invokeTx = user.invoke(invokeRequest);
	// Trigger the invoke transaction
//	var invokeTx = req.user.username.invoke(invokeRequest);

	// Invoke transaction submitted successfully
	invokeTx.on('submitted', function (results) {
		console.log(util.format("Successfully submitted chaincode invoke " +
		"transaction: request=%j, response=%j", invokeRequest, results));

		res.status(200).json({ status: "submitted" });
	});
	// Invoke transaction submission failed
	invokeTx.on('error', function (err) {
		var errorMsg = util.format("ERROR: Failed to submit chaincode invoke " +
		"transaction: request=%j, error=%j", invokeRequest, err);

		console.log(errorMsg);

		res.status(500).json({ error: errorMsg });
	});
});
});
router.get('/last',function(req,res){



res.render('last');

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

function count(username)
{


	// State variable to retrieve
	var stateVar = username;

	// Construct the query request
	var queryRequest = {
		// Name (hash) required for query
		chaincodeID: chaincodeID,
		// Function to trigger
		fcn: "query",
		// State variable to retrieve
		args: [stateVar]
	};
	hfcutil.chain.getMember(req.user.username,  function(error, user) {
                if (error)
                    reject(" Failed to register and enroll " + userName + ": " + error);

                console.log("Enrolled %s successfully\n");
                console.log("invoke chaincode ...");
	// Trigger the invoke transaction
	var queryTx = user.invoke(queryRequest);
	// Trigger the invoke transaction
	// Trigger the query transaction
	//var queryTx = app_user.query(queryRequest);

	// Query completed successfully
	queryTx.on('complete', function (results) {
		console.log(util.format("Successfully queried existing chaincode state: " +
		"request=%j, response=%j, value=%s", queryRequest, results, results.result.toString()));
		if(results.result.toString()=="")
			counts=0;
		else
			counts=num(results.result.toString());
		//res.status(200).json({ "value": results.result.toString() });
	});
	// Query failed
	queryTx.on('error', function (err) {
		var errorMsg = util.format("ERROR: Failed to query existing chaincode " +
		"state: request=%j, error=%j", queryRequest, err);

		console.log(errorMsg);

	//	res.status(500).json({ error: errorMsg });
	});



});
}
module.exports = router;

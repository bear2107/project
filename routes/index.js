var express = require('express');
var router = express.Router();
var hfcutil=require('../backend/chaincode');
// Get Homepage
var moment=require('moment');
var chaincodeID="e303eb7fd5d8f15da04bac1aa7826dc7aeeca0daf38450a18e10c8c9a3d5e539";
var util=require('util');
var User = require('../models/user');
var random=(Math.floor(Math.random()))%5+1;
//console.log("random"+random);
var ran=0;
var Qr=require('../models/admin');
var QrCode=require('../models/region');
var Random =require('../models/random');
var check=0;
var duration=0;
var end=0;
var me="";
var checkqr="";
var area="";
var Details=require('../models/user_details')
router.get('/', ensureAuthenticated, function(req, res){


	//console.log(req.user.username);
	hfcutil.enrolluser(req.user.username);
	//chaincodeID=hfcutil.chaincodeID;
	//console.log(chaincodeID);
Random.findOneAndUpdate(
		{username:req.user.username},
		{$set:{"start":Math.floor(Math.random()*5)+1, "count":0,"timestamp":new Date()}},
		{safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
		    );
	if(req.user.username=="admin")
		res.redirect('/view')
	else
		
	res.redirect('/last');




});
router.get('/view', function(req, res){


	User.find({}, function(err, docs){
		if(err) res.json(err);
		else   {


			res.render('view', {users:docs});
			//console.log(users[0]);
			


	}
	});
});
router.get('/test',function(req,res)
{
console.log("test"+checkqr);
res.render('test',{checkqrs:checkqr, area:area});
});
var counts;
router.post('/transactions', function(req, res) {
	// Amount to transfer
	var xem;
	var amount = req.body.amount.toString();
//	console.log("amount"+amount);
	var che=req.body.check;
	console.log("che"+che);
  var area=req.body.area;
	// Construct the invoke request
	hfcutil.enrolluser(req.user.username);
	//count(req.user.username);
	//chaincodeID=hfcutil.chains();
var invokeRequest = {
		// Name (hash) required for invoke
		chaincodeID: chaincodeID,
		// Function to trigger
		fcn: "invoke",
		// Parameters for the invoke function
		args: [req.user.username, amount,req.user.count.toString()]
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
				User.findOne({username: req.user.username}, function(err, user){
  if (err) { return next(err); }
  user.count += 1;
  user.save(function(err) {
    if (err) { return next(err); }
  });
});
				//random=random+1;
		
				var now=new Date();

				var t=now.getTime();
				
			//console.log("t"+t);
				//now.toLocaleString('de-DE', {hour: '2-digit',   hour12: false, timeZone: 'Asia/Kolkata' })
			//	d = new Date();
			//	utc = d.getTime() + (d.getTimezoneOffset() * 60000);
			//	now = new Date(utc + (3600000*+5.5));
			//		console.log(now);
			//	var ist =  now.toLocaleString();
			//	console.log("IST now is : " +ist);
			//	var date=new date(ist).toISOString();
			Random.findOne({username:req.user.username},function(err,docs)

			{
				if(err)
				{
					return next(err);
				}

				end=docs.timestamp.getTime();
				duration=t-end;

				if(duration/1000<3000)
				{
				console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");

					me="yes";

				}
				else
				{
					me="no";
				}
				//t="success"
			//console.log("ll"+duration/1000 + "anse" + me);
			//console.log("aaaaaaaaaaaaaa"+che);
			//console.log("amount "+amount);
			che = che.replace(/\s/g, '');
			amount = amount.replace(/\s/g, '');
			if(che===amount)
				me="yes";
			else
				me="no";
		Details.findOneAndUpdate(
        {username:req.user.username},
        {$push: {"details": {codescanned: amount,timestamp:now,success:me,place:area}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );


				//res.redirect('/last');
		res.status(200).json({ status: "submitted" });
			
			});
//			end=moment
			//console.log("end"+end+"t"+t);
			//var 
		//	var duration = moment.duration(a.diff(end));
//			console.log("me "+ me);


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
//console.log("here"+ ran);
/*Details.findOne({username:req.user.username})
    .select({ "details": { "$slice": -1 }})
    .exec(function(err,doc) {
    	//console.log(doc);

    })
*/
Random.findOne({username:req.user.username},function(err,user)
{
	if(err){
		return next(err);
	}

ran=user.start;
console.log("rankkkk"+ran); 
check=user.count+1;
//console.log("check"+(ran%5+1));
	Random.findOneAndUpdate(
		{username:req.user.username},
		{$set:{"start":ran%5 +1 ,"count":user.count+1 }},
		{safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
		    );


	if(check==6)
{
	res.render('completed');
}
else
if(req.user.region==1)
{
console.log("random"+ran);
Qr.findOne({Sno:ran},function(err,user)
{
	//if(user.length)
	//{

	//}
if (err) { 
	console.log("here");
 return next(err);
}
if(user)
{
	checkqr=user.password;
	area=user.place;
		res.render('last',{place:user.place});
}
//console.log(user.Sno);


});
}
else
QrCode.findOne({Sno:ran},function(err,user)
{
	//if(user.length)
	//{

	//}
if (err) { 
	console.log("here");
 return next(err);
}
if(user)
{
		checkqr=user.password;
		area=user.place;
		res.render('last',{place:user.place});
}

//console.log(user.Sno);


});



});
//console.log("aaaa"+ran);


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
router.get('/details/:id',function(req,res)
{

Details.findOne({username:req.params.id},function(err,user)

{
if(err)
{
	return next(err);
}


res.render('info',{info:user.details});




});







});

module.exports = router;

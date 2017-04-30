var express = require('express');
var router = express.Router();
var hfcutil=require('../backend/chaincode');
// Get Homepage
var moment=require('moment');
var async=require('async');
var chaincodeID="26040ebc847fe2f51dee33ba33ce67106ace3da858e8accf0706019a71fb30c9";
var regions=0;
var util=require('util');
var User = require('../models/user');
var Place=require('../models/place');
var random=(Math.floor(Math.random()))%5+1;
//console.log("random"+random);
var ran=0;
var Qr=require('../models/admin');
var QrCode=require('../models/region');
var QrCodess=require('../models/regions');
var cc;
var Random =require('../models/random');
var Codes=require('../models/codes');
var check=0;
var duration=0;
var end=0;
var me="";
var checkqr="";
var area="";
var test=0;
var coo=[];
var qrplace=[];
var qrcodeplace=[];
var count=0;
var arr=[];
var Details=require('../models/user_details')
var Detailss=require('../models/user_detailss')
var Databases=['Qr','Qrcode','Qrcodess']
var codecount=0;
console.log("checking"+cc);

router.get('/', ensureAuthenticated, function(req, res){


	//console.log(req.user.username);
	hfcutil.enrolluser(req.user.username);
	//chaincodeID=hfcutil.chaincodeID;
	//console.log(chaincodeID);
	var x=Math.floor(Math.random()*5)+1;
	Random.findOneAndUpdate(
		{username:req.user.username},
		{$set:{"start":x, "count":0,"timestamp":new Date()}},
		{safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
		    );
	

if(req.user.username=='admin')
	{
		Qr.find({},function(err,users)
		{
			if(err)
			{
				res.json(err);
			}

			else
			{
				for(var i=0;i<users.length;i++)
					qrplace[i]=users[i].place;
			}
		});
		QrCode.find({},function(err,users)
		{
			if(err)
			{
				res.json(err);
			}

			else
			{
				for(var i=0;i<users.length;i++)
					qrcodeplace[i]=users[i].place;
			}
		});
		res.redirect('/admin');
	}
	else
	{
	var y=x+1;
	if(y>5)
		y=y-5;
	var z=x+2;
	if(z>5)
		z=z-5;
	var qw=x+3;
	if(qw>5)
		qw=qw-5;
	var ro=x+4;
	if(ro>5)
		ro=ro-5;
	var oldDateObj=new Date();
	//console.log("aass"+oldDateObj);
	var currentOffset = oldDateObj.getTimezoneOffset();
var ISTOffset = 330; 
var newDateObj = new Date((oldDateObj.getTime() + (ISTOffset + currentOffset)*60000)+(10*60000));

	//var newDateObj = new Date(oldDateObj.getTime() + 10*60000);
	var time2=new Date(newDateObj.getTime()+10*60000);
	var time3=new Date(time2.getTime()+10*60000);
	var time4=new Date(time3.getTime()+10*60000);
	var time5=new Date(time4.getTime()+10*60000);
if(req.user.region==1)
{	
	
Place.findOneAndUpdate(
		{username:req.user.username},
		{$set:{"place1":qrplace[x-1],"time1":newDateObj.toGMTString(),"time2":time2.toGMTString(),"time3":time3.toGMTString(),"time4":time4.toGMTString(),"time5":time5.toGMTString(), "place2":qrplace[y-1],"place3":qrplace[z-1],"place4":qrplace[qw-1],"place5":qrplace[ro-1]}},
		{safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
		    );

		    }
		    else
		    {
		    	Place.findOneAndUpdate(
		{username:req.user.username},
		{$set:{"place1":qrcodeplace[x-1],"time1":newDateObj.toGMTString(),"time2":time2.toGMTString(),"time3":time3.toGMTString(),"time4":time4.toGMTString(),"time5":time5.toGMTString(), "place2":qrcodeplace[y-1],"place3":qrcodeplace[z-1],"place4":qrcodeplace[qw-1],"place5":qrcodeplace[ro-1]}},
		{safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
		    );
		    }		
	res.redirect('/last');
}



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


router.get('/admin',function(req,res)

{




res.render('adminview');

});
router.get('/ehash',function(req,res)
{

res.render('hash');


});
router.post('/enterhash', function(req, res){

var name=req.body.name;
console.log('name'+name);
coo[codecount]=name;
codecount++;
res.render('hash');

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

				var now=new Date();
				var currentOffset = now.getTimezoneOffset();
			var ISTOffset = 330; 
			var newDateObj = new Date((now.getTime() + (ISTOffset + currentOffset)*60000));
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
			
	
				//random=random+1;
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
			if(che===amount&&me=="yes")
				me="yes";
			else
				me="no";
			if(me=="yes")
	{		
		Details.findOneAndUpdate(
        {username:req.user.username},
        {$push: {"details": {codescanned: amount,timestamp:newDateObj.toGMTString(),success:me,place:area}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );




	}
	else
	{
		Detailss.findOneAndUpdate(
        {username:req.user.username},
        {$push: {"details": {codescanned: amount,timestamp:newDateObj.toGMTString(),success:me,place:area}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );
	}
	});
  		res.status(200).json({ status: "submitted" ,success:me, place:area,timestamp:now});

			//	res.redirect('/lasted/me+","timestamp');
			
			});
//			end=moment
			//console.log("end"+end+"t"+t);
			//var 
		//	var duration = moment.duration(a.diff(end));
//			console.log("me "+ me);



	// Invoke transaction submission failed

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
	var tt=area+ran;
	//var ppp=["time1","time2","time3","time4","time5"]
	var timetosend="time"+ran;
	
		//console.log(timetosend +""+ time.time1);
		res.render('last',{place:user.place,timetosend:"10 minutes"});
	
	
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
		res.render('last',{place:user.place,timetosend:"10 minutes"});
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
router.get('/detailss/:id',function(req,res)
{

Detailss.findOne({username:req.params.id},function(err,user)

{
if(err)
{
	return next(err);
}
res.render('info',{info:user.details});




});
});
router.get('/lasted/:x',function(req,res)
{
// Construct the invoke request
	hfcutil.enrolluser(req.user.username);
	//count(req.user.username);
	//chaincodeID=hfcutil.chains();
	var arr=req.params.x.split("]");
	console.log(req.params.a);
	console.log(req.params.y);
//console.log(req.user.username+"amount "+amount +"now "+now + "area " +area +"me"+me); 
var invokeRequest = {
		// Name (hash) required for invoke
		chaincodeID: chaincodeID,
		// Function to trigger
		fcn: "invoke",
		// Parameters for the invoke function
		args: [req.user.username, arr[0],arr[1],arr[2],arr[3]]
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
				res.redirect('/last');


});
	invokeTx.on('error', function (err) {
		var errorMsg = util.format("ERROR: Failed to submit chaincode invoke " +
		"transaction: request=%j, error=%j", invokeRequest, err);

		console.log(errorMsg);

		res.status(500).json({ error: errorMsg });
	});
});
});
router.get('/eregion',function(req,res)
{

res.render('region');


});
	router.post('/region',function(req,res)
	{
      var region=req.body.name;

      regions=Number(region);
      res.render('regionenter');

	});
	router.post('/regioninfos',function(req,res)
	{
    var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var toput=[name,email,username,password,password2];
	var codes=["+huM1AUuk+vG1GuWAKLn68VlUpekvkR3pr/TJV6rd1qDoW7Cu4Gs2Sh6xtC9B2Z+lNTg9F5JVFzC 3Vlxjm1gbz0uJZ9qzC/jzcOZS+UGAvXbL6a4cbum/i8h6IEE065bFSlG1q/Ahv19nlYNA2rUHg==","+huM1AUuk+vG1GuWAKLn68VlUpekvkR3pr/TJV6rd1qDoW7Cu4Gs2Sh6xtC9B2Z+AlPldF7aq/yt BzKaGeBMGLN1QaaEPjhb6yyUR3PtAmYrnswt/T0X/A3HhtI1Xq1+VDsFXhwYre9219VryoEoEg==","+huM1AUuk+vG1GuWAKLn68VlUpekvkR3pr/TJV6rd1qDoW7Cu4Gs2Sh6xtC9B2Z+nacrnD18u5Rd manUjqK01KE6UWyGaONpnHUTbrrxC1O22mRDejtRCp74TvDkT3BSW++UiXnJZ7bqddlIQVToFw==","+huM1AUuk+vG1GuWAKLn68VlUpekvkR3pr/TJV6rd1qDoW7Cu4Gs2Sh6xtC9B2Z+ke9dUx5lqt5R RSWzKhAXc4fHJkHXx4yMr2y8qzDXO+0rnswt/T0X/A3HhtI1Xq1+VDsFXhwYre9219VryoEoEg==","+huM1AUuk+vG1GuWAKLn68VlUpekvkR3pr/TJV6rd1qDoW7Cu4Gs2Sh6xtC9B2Z+ke9dUx5lqt5R RSWzKhAXc4fHJkHXx4yMr2y8qzDXO+0rnswt/T0X/A3HhtI1Xq1+VDsFXhwYre9219VryoEoEg==","+huM1AUuk+vG1GuWAKLn68VlUpekvkR3pr/TJV6rd1qDoW7Cu4Gs2Sh6xtC9B2Z+pfGmzYCrmC3w yZo9q1iR5Rn5/uyDC3MWhVl47m+rPnsrnswt/T0X/A3HhtI1Xq1+VDsFXhwYre9219VryoEoEg==","+huM1AUuk+vG1GuWAKLn68VlUpekvkR3pr/TJV6rd1qDoW7Cu4Gs2Sh6xtC9B2Z+A50FRasg5VqB zZLeiAObbHK+qM537iXD1u8DPpZWmIIseYDvJidf/WlyPf9rjHpTDxtVNTDQGWT97p+hi91H/OOS DR7keOcfuicZZiLR1lA=","+huM1AUuk+vG1GuWAKLn68VlUpekvkR3pr/TJV6rd1oMXBJTG1w79WjMZHZ1eMkcw0nFcbo5Sc10 bvY37p0hBms8xZdJ9N9KMmuU4QdVNqMl/AsrX53bEarcuIjDNEMzKQNGaRy5huzHq7bktofdgw==","+huM1AUuk+vG1GuWAKLn68VlUpekvkR3pr/TJV6rd1oMXBJTG1w79WjMZHZ1eMkcw0nFcbo5Sc10 bvY37p0hBms8xZdJ9N9KMmuU4QdVNqMl/AsrX53bEarcuIjDNEMzKQNGaRy5huzHq7bktofdgw==","+huM1AUuk+vG1GuWAKLn68VlUpekvkR3pr/TJV6rd1qDoW7Cu4Gs2Sh6xtC9B2Z+dldn6uYnMsEu 6QVyrPP8mIR/BJH24YsmNLVDGJpn0rzbL6a4cbum/i8h6IEE065bFSlG1q/Ahv19nlYNA2rUHg=="];

	if(test==0)
{		
	for(var i=1;i<=5;i++)
			{
								//console.log("asc"+i);
			var m=i;
			//Codes.findOne({Sno:i},function(err,user)
			//{
	//if(user.length)
	//{						
	//	console.log("aschgh"+Sno);


	//}

	/*		if (err) { 
				console.log("here");
 				return next(err);
					}
			if(user)
			{*/
				console.log("m"+m);
			//checkqr=user.code;
			var newUser = new Qr({
			Sno: m,
			password:codes[m-1],
			place: toput[m-1],
			
			});
			newUser.save(function(err){
 			 if (err) {
				return err;
  						}
  					else {
  				console.log("Post saved");
  					}
					});
		
			}
		}
		else if(test==1)
		{
			for(var i=6;i<=10;i++)
			{
								//console.log("asc"+i);
			var m=i;
			//Codes.findOne({Sno:i},function(err,user)
			//{
	//if(user.length)
	//{						
	//	console.log("aschgh"+Sno);


	//}

	/*		if (err) { 
				console.log("here");
 				return next(err);
					}
			if(user)
			{*/
				console.log("m"+m);
			//checkqr=user.code;
			var newUser = new QrCode({
			Sno: (m-5),
			password:codes[m-1],
			place: toput[(m-1)%5],
			
			});
			newUser.save(function(err){
 			 if (err) {
				return err;
  						}
  					else {
  				console.log("Post saved");
  					}
					});
		
			}
		}
		else if(test==2)
		{
				for(var i=11;i<=15;i++)
			{
								//console.log("asc"+i);
			var m=i;
			//Codes.findOne({Sno:i},function(err,user)
			//{
	//if(user.length)
	//{						
	//	console.log("aschgh"+Sno);


	//}

	/*		if (err) { 
				console.log("here");
 				return next(err);
					}
			if(user)
			{*/
				console.log("m"+m);
			//checkqr=user.code;
			var newUser = new QrCodess({
			Sno: (m-10),
			password:codes[m-11],
			place: toput[(m-1)%5],
			
			});
			newUser.save(function(err){
 			 if (err) {
				return err;
  						}
  					else {
  				console.log("Post saved");
  					}
					});
		
			}
		}
//console.log(user.Sno);
		//	});
	
		
		test++;
		if(test==regions)
			res.redirect('/');
		
		else 
			res.render('regionenter');
		

	
	});
router.get('/route/:id',function(req,res)
{

Place.find({username:req.params.id},function(err,user)

{
if(err)
{
	return next(err);
}
//res.render('info',{info:user.details});


res.render('route',{users:user});
});

});
router.get("/state/:var", function(req, res) {
	// State variable to retrieve
	var stateVar = req.params.var;

	// Construct the query request
	var queryRequest = {
		// Name (hash) required for query
		chaincodeID: chaincodeID,
		// Function to trigger
		fcn: "query",
		// State variable to retrieve
		args: [stateVar]
	};

	// Trigger the query transaction
	var queryTx = app_user.query(queryRequest);

	// Query completed successfully
	queryTx.on('complete', function (results) {
		console.log(util.format("Successfully queried existing chaincode state: " +
		"request=%j, response=%j, value=%s", queryRequest, results, results.result.toString()));

		res.status(200).json({ "value": results.result.toString() });
	});
	// Query failed
	queryTx.on('error', function (err) {
		var errorMsg = util.format("ERROR: Failed to query existing chaincode " +
		"state: request=%j, error=%j", queryRequest, err);

		console.log(errorMsg);

		res.status(500).json({ error: errorMsg });
	});
});


module.exports = router;

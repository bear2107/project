var mongoose = require('mongoose');

// User Schema
var QrSchema = mongoose.Schema({
	Sno: {
		type: Number,
		index:true
	},
	password: {
		type: String
	},
	place: {
		type: String
	}
});
//QrSchema.plugin(random, { path: 'r' }); 

var Qr = module.exports = mongoose.model('Qr', QrSchema);

/*module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}*/
/*mongoose.model('Qr').findOne({Sno:1},function(err,user)
{
if (err) {  return next(err);}
console.log(user.place);
//res.render('last',{place:user});


});
*/
/*var newSche = new Qr({
			Sno: 1,
			password:'email',
			place: 'username'
		});
newSche.save(function (err) {
  if (err) {
		return err;
  }
  else {
  	console.log("Post saved");
  }
});
var newSche = new Qr({
			Sno: 2,
			password:'email',
			place: 'ppp'
		});

	newSche.save(function (err) {
  if (err) {
		return err;
  }
  else {
  	console.log("Post saved");
  }
});
		var newSche = new Qr({
			Sno: 3,
			password:'email',
			place: 'poii'
		});
newSche.save(function (err) {
  if (err) {
		return err;
  }
  else {
  	console.log("Post saved");
  }
});*/
module.exports.getQrBySno = function(Sno, callback){
	var query = {Sno: Sno};
	Qr.findOne(query, callback);
}


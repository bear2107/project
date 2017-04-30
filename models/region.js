var mongoose = require('mongoose');
var random = require('mongoose-random');

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
module.exports.createUser = function(newUser, callback){

	        newUser.save(callback);
	    
	
}
var QrCode = module.exports = mongoose.model('QrCode', QrSchema);
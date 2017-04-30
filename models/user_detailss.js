var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	details:[
	{
	codescanned : {type:String},
	timestamp : {type:String ,default:Date.now},
	success:{type:String},
	place:{type:String}
}
]
});

var Detailss = module.exports = mongoose.model('Detailss', UserSchema);


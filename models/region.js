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

var QrCode = module.exports = mongoose.model('QrCode', QrSchema);
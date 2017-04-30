var mongoose = require('mongoose');

// User Schema
var CodesSchema = mongoose.Schema({
	Sno: {
		type: Number,
		index:true
	},
	hash:{
		type:String
	}
	
});
//QrSchema.plugin(random, { path: 'r' }); 

var Codes = module.exports = mongoose.model('Codes', CodesSchema);
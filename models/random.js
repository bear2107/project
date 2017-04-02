var mongoose = require('mongoose');

// User Schema
var QrSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	start:{
		type:Number
	}
	,count:{
		type:Number
	}
	,timestamp:

		{
			type:Date ,default:Date.now

		}
	
});
//QrSchema.plugin(random, { path: 'r' }); 

var Random = module.exports = mongoose.model('Random', QrSchema);
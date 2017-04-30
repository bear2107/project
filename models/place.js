var mongoose = require('mongoose');

// User Schema
var QrSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	place1:{
		type:String
	}
	,place2:{
		type:String
	}
	,
	place3:{
		type:String
	}
	,place4:{
		type:String
	}
	,
	place5:{
		type:String
	}
	,time1:{
		type:String
	}
	,time2:{
		type:String
	}
	,time3:{
		type:String
	}
	,time4:{
		type:String
	}
	,time5:{
		type:String
	}
	
	
});
//QrSchema.plugin(random, { path: 'r' }); 

var Place = module.exports = mongoose.model('Place', QrSchema);
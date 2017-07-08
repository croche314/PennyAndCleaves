var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

//mongoose.connect('mongodb://localhost/eStore_DB');

mongoose.connect('mongodb://54.202.251.108:27017/eStore_DB');


var models_path = path.join(__dirname, "../models");

fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') >=0 ) {
		require(models_path + '/' + file);
	}
});
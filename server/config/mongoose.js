var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

// mongoose.connect('mongodb://localhost/eStore_DB');
mongoose.connect('mongodb://heroku_22qxd1wq');
var models_path = path.join(__dirname, "../models");

fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') >=0 ) {
		require(models_path + '/' + file);
	}
});
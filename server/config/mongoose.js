var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

// mongoose.connect('mongodb://localhost/eStore_DB');
mongoose.connect('process.env.ds133922.mlab.com:33922/heroku_22qxd1wq');
var models_path = path.join(__dirname, "../models");

fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') >=0 ) {
		require(models_path + '/' + file);
	}
});
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

mongoose.connect('mongodb://54.202.251.108:27017/eStore_DB');
//mongoose.connect('mongodb://127.0.0.1:27017/eStore_DB');
//mongoose.connect('mongodb://heroku_22qxd1wq:2huvv9vv7anetcn5l5q8ov1mck@ds133922.mlab.com:33922/heroku_22qxd1wq');
var models_path = path.join(__dirname, "../models");

fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') >=0 ) {
		require(models_path + '/' + file);
	}
});
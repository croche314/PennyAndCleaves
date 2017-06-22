var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var LineItem = mongoose.model('LineItem');
var Cart = mongoose.model('Cart');
var Review = mongoose.model('Review');

module.exports = {
	// Users Index
	userIndex: function(req,res) {
		User.find({}, function(err, response) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:"Found all users", all_users:response});
			}
		});
	},

	// Create User
	createUser: function(req,res) {
		var newUser = new User({
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			password: req.body.password,
			phone: req.body.phone,
			street: req.body.street,
			city: req.body.city,
			state: req.body.state,
			zip_code: req.body.zip_code
		});
		
		newUser.save(function(err) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:"New User Created!", user:newUser});
			}
		});
	},

	// Login User
	findUser: function(req,res) {
		var email = req.params.email;

		User.findOne({email: req.params.email}, function(err, response) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:"Found a User", user:response});
			}
		});
	},
}
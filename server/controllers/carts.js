var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var LineItem = mongoose.model('LineItem');
var Cart = mongoose.model('Cart');
var Review = mongoose.model('Review');

module.exports = {
	// Carts Index
	cartIndex: function(req,res) {
		Cart.find({}, function(err, response) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:"Found all carts", all_carts:response});
			}
		});
	},

	// Create Cart
	createCart: function(req,res) {
		var newCart = new Cart({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			colors: req.body.colors,
			color_images: req.body.color_images,
			model_images: req.body.model_images,
			main_img: req.body.main_img,
			avg_rating: req.body.avg_rating,
			tags: req.body.tags
		});
		
		newCart.save(function(err) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:"New Cart Created!", cart:newCart});
			}
		});
	},
}
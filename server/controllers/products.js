var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var LineItem = mongoose.model('LineItem');
var Cart = mongoose.model('Cart');
var Review = mongoose.model('Review');

module.exports = {
	// Product Index
	productIndex: function(req,res) {
		Product.find({}, function(err, response) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:"Found all products", all_products:response});
			}
		});
	},
	// Create Product
	createProduct: function(req,res) {
		var newProduct = new Product({
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
		// Pop any null values from arrays
				for(var i=newProduct.colors.length-1;i>0;i--) {
					if(newProduct.colors[i] == null) {
						newProduct.colors.pop();
					}
				}
				for(var i=newProduct.color_images.length-1;i>0;i--) {
					if(newProduct.color_images[i] == null) {
						newProduct.color_images.pop();
					}
				}
				for(var i=newProduct.model_images.length-1;i>0;i--) {
					if(newProduct.model_images[i] == null) {
						newProduct.model_images.pop();
					}
				}
				for(var i=newProduct.tags.length-1;i>0;i--) {
					if(newProduct.tags[i] == null) {
						newProduct.tags.pop();
					}
				}
		newProduct.save(function(err) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:"New Product Created!", product:newProduct});
			}
		});
	},
	// Update
	updateProduct: function(req,res) {
		Product.findOne({_id:req.params.id}, function(err, product) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				// Update record
				product.name = req.body.name,
				product.description = req.body.description,
				product.price = req.body.price,
				product.colors = req.body.colors,
				product.color_images = req.body.color_images,
				product.model_images = req.body.model_images,
				product.main_img = req.body.main_img,
				product.avg_rating = req.body.avg_rating,
				product.tags = req.body.tags

				// Pop any null values from arrays
				for(var i=product.colors.length-1;i>0;i--) {
					if(product.colors[i] == null) {
						product.colors.pop();
					}
				}
				for(var i=product.color_images.length-1;i>0;i--) {
					if(product.color_images[i] == null) {
						product.color_images.pop();
					}
				}
				for(var i=product.model_images.length-1;i>0;i--) {
					if(product.model_images[i] == null) {
						product.model_images.pop();
					}
				}
				for(var i=product.tags.length-1;i>0;i--) {
					if(product.tags[i] == null) {
						product.tags.pop();
					}
				}

				// Save
				product.save(function(err) {
					if(err) {
						console.log("*********** ERRORS ***********");
						console.log(err);
						console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
						res.json({message:"Error!", error:err})
					} else {
						res.json({message:"Product Updated!", product_id:req.params.id});
					}
				})
			}
		})
	},
	// Delete
	deleteProduct: function(req,res) {
		Product.remove({_id:req.params.id}, function(err) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:"Product removed!", product_id:req.params.id});
			}
		})
	},
	// Show
	showProduct: function(req,res) {
		Product.findById(req.params.id, function(err, product) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:"Found Product!", product:product});
			}
		})
	}
}
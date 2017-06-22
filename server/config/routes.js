var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var LineItem = mongoose.model('LineItem');
var Cart = mongoose.model('Cart');
var Review = mongoose.model('Review');


var UserController = require('../controllers/users.js');
var ProductController = require('../controllers/products.js');
var CartController = require('../controllers/carts.js');

module.exports = function(app) {
	app.get('/', function(req,res) {
		console.log('Found / route');
	});
	app.get('/admin', function(req,res) {
		res.sendFile('admin.html', {
			root: './client/admin'
		});
	});

	//*********** USERS ***********
	// User Index
	app.get('/user/index', UserController.userIndex);

	// New User
	app.post('/user/new', UserController.createUser);

	// Find User
	app.get('/user/:email', UserController.findUser);

	//*********** PRODUCTS ***********
	// Product Index (get all products)
	app.get('/product/index', ProductController.productIndex);

	// New Product
	app.post('/product/new', ProductController.createProduct);

	// Delete Product
	app.delete('/product/:id', ProductController.deleteProduct);

	// Update Product
	app.put('/product/:id', ProductController.updateProduct);

	// Show Product
	app.get('/product/:id', ProductController.showProduct);

	//*********** CARTS ***********
	// Carts Index
	app.get('/cart/index', CartController.cartIndex);

	// New Cart
	app.post('/cart/new', CartController.createCart);

}
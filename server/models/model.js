var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var UserSchema = mongoose.Schema({
	email: String,
	first_name: String,
	last_name: String,
	password: String,
	phone: String,
	address: String,
	city: String,
	state: String,
	zip_code: String
}, {timestamps:true});

var ReviewSchema = mongoose.Schema({
	_author: {type:Schema.Types.ObjectId, ref:'User'},
	rating: Number,
	title: String,
	text: String
}, {timestamps:true});

var ProductSchema = mongoose.Schema({
	name: String,
	description: String,
	price: Number,
	sale_price: Number,
	main_img: String,
	colors: [String],
	color_images: [String],
	model_images: [String],
	avg_rating: Number,
	reviews: [ReviewSchema],
	num_reviews: Number,
	tags: [String]
}, {timestamps:true});

var LineItemSchema = mongoose.Schema({
	quantity: Number,
	_product: {type:Schema.Types.ObjectId, ref:'Product'},
	color: String,
	size: String,
	price: Number
})

var CartSchema = mongoose.Schema({
	_customer: {type:Schema.Types.ObjectId, ref:'User'},
	items: [LineItemSchema],
	subtotal: Number
}, {timestamps:true});

mongoose.model('User', UserSchema);
mongoose.model('Product', ProductSchema);
mongoose.model('Cart', CartSchema);
mongoose.model('LineItem', LineItemSchema);
mongoose.model('Review', ReviewSchema);



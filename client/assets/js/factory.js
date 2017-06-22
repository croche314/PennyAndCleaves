
//*********** USER FACTORY ***********
app.factory('userFactory', function($http) {
	var factory = {};

	// factory.currentUser = {
	// 	_id: '5908e327e6fcc70cb8dec729',
	// 	email: 'croche314@gmail.com',
	// 	first_name: 'Chris',
	// 	last_name: 'Roche'
	// }

	factory.createUser = function(userObj, callback) {
 		$http.post('/user/new', userObj).then(function(returned_data) {
 			callback(returned_data);
 		})
 	}

 	factory.findUser = function(userObj, callback) {
 		$http.get('/user/'+userObj.email).then(function(returned_data) {
 			callback(returned_data);
 		})
 	}

	return factory;
});


//*********** PRODUCT FACTORY ***********
app.factory('productFactory', function($http) {
	var factory = {};
	factory.all_products = [];

	factory.cart = {};

	// Product Index (Get All Products)
	factory.index = function(callback) {
		$http.get('/product/index').then(function(returned_data) {
			factory.all_products = returned_data.data.all_products;
			callback(returned_data);
		});
	}

	// Filter products by Tag
	factory.filterByTag = function(category,subcategory,callback) {
		console.log('filtering by category...',category);
		var filtered_list = [];
		for(var i=0;i<factory.all_products.length;i++) {
			var tags = factory.all_products[i].tags;
			for(var j=0;j<tags.length;j++) {
				if(tags[j] === category) {
					filtered_list.push(factory.all_products[i]);
				}
			}
		}
		if(subcategory != null) {
			console.log('filtering by subcategory...', subcategory);
			var result = [];
			for(var x=0;x<filtered_list.length;x++) {
				for(var y=0;y<filtered_list[x].tags.length;y++) {
					if(filtered_list[x].tags[y] === subcategory) {
						result.push(filtered_list[x]);
					} 
				}
			}
		} else {
			var result = filtered_list;
		}
		callback(result);
	}

	// Find Product
	factory.findProduct = function(id,callback) {
		$http.get('/product/'+id).then(function(returned_data) {
			callback(returned_data);
		});
	}


	return factory;
});

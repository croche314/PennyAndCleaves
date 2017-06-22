var app = angular.module('app', ['ngRoute']);

// *********** ROUTES ***********
app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'products.html',
		controller: 'AdminController'
	})
	.when('/products', {
		templateUrl: 'products.html',
		controller: 'AdminController'
	})
	.when('/product/new', {
		templateUrl: 'new_product.html',
		controller: 'AdminController'
	})
	.when('/product/update/:id', {
		templateUrl: 'edit_product.html',
		controller: 'EditProductController'
	})
	.when('/product/:id', {
		templateUrl: 'show_product.html',
		controller: 'ShowProductController'
	})
	.when('/users', {
		templateUrl: 'users.html',
		controller: 'AdminController'
	})
	.otherwise({
		templateUrl: 'products.html',
		controller: 'AdminController'
	})
})

// *********** CONTROLLERS ***********
// ADMIN CONTROLLER
app.controller('AdminController', function($scope, $location, $routeParams, adminFactory){
	console.log('Found Admin Controller');

	adminFactory.getAllProducts(function(response) {
		$scope.all_products = response.data.all_products;
		console.log('Successfully retrieved all products...');
		console.log($scope.all_products);
	});

	$scope.createProduct = function() {
		// Compile colors
		var colorList = [];
		colorList.push($scope.color1,$scope.color2,$scope.color3);
		$scope.product.colors = colorList;
		// Compile color images
		var colorImageList = [];
		colorImageList.push($scope.color_image1, $scope.color_image2, $scope.color_image3);
		$scope.product.color_images = colorImageList;
		// Compile model images
		var modelImageList = [];
		modelImageList.push($scope.model_image1, $scope.model_image2, $scope.model_image3);
		$scope.product.model_images = modelImageList;
		// Compile tags
		var tagList = [];
		tagList.push($scope.product.tag1,$scope.product.tag2,$scope.product.tag3,$scope.product.tag4, $scope.product.tag5);
		$scope.product.tags = tagList;

		// Create product
		adminFactory.createProduct($scope.product, function(response) {
			console.log(response);
			$location.url('/');
		});
	}

	$scope.deleteProduct = function(id) {
		adminFactory.deleteProduct(id, function(response) {
			console.log(response.data.message);
			$location.url('/admin');
		});
	}
});

// EDIT PRODUCT CONTROLLER
app.controller('EditProductController', function($scope, $location, $routeParams, adminFactory) {
	console.log('Found EditProductController');
	
	// Get product details
	adminFactory.findProduct($routeParams.id, function(response) {
		$scope.product = response.data.product;
		$scope.product.tag1 = $scope.product.tags[0];
		$scope.product.tag2 = $scope.product.tags[1];
		$scope.product.tag3 = $scope.product.tags[2];
		$scope.product.tag4 = $scope.product.tags[3];
		$scope.product.tag5 = $scope.product.tags[4];
		$scope.product.tag6 = $scope.product.tags[5];
		$scope.product.tag7 = $scope.product.tags[6];


		$scope.product.color1 = $scope.product.colors[0];
		$scope.product.color2 = $scope.product.colors[1];
		$scope.product.color3 = $scope.product.colors[2];
		$scope.product.color1_image = $scope.product.color_images[0];
		$scope.product.color2_image = $scope.product.color_images[1];
		$scope.product.color3_image = $scope.product.color_images[2];
		$scope.product.model1_image = $scope.product.model_images[0];
		$scope.product.model2_image = $scope.product.model_images[1];
		$scope.product.model3_image = $scope.product.model_images[2];

	});

	// Update product
	$scope.updateProduct = function() {
		// Compile colors
		var colorList = [];
		colorList.push($scope.product.color1,$scope.product.color2,$scope.product.color3);
		$scope.product.colors = colorList;
		// Compile color images
		var colorImageList = [];
		colorImageList.push($scope.product.color1_image, $scope.product.color2_image, $scope.product.color3_image);
		$scope.product.color_images = colorImageList;
		// Compile model images
		var modelImageList = [];
		modelImageList.push($scope.product.model1_image, $scope.product.model2_image, $scope.product.model3_image);
		$scope.product.model_images = modelImageList;
		// Compile tags
		var tagList = [];
		tagList.push($scope.product.tag1,$scope.product.tag2,$scope.product.tag3,$scope.product.tag4,$scope.product.tag5,$scope.product.tag6,$scope.product.tag7);
		$scope.product.tags = tagList;

		console.log('color1:', $scope.product.color1);
		console.log('colors:', $scope.product.colors);

		// Update product
		adminFactory.updateProduct($scope.product, function(response) {
			console.log(response.data.message);
			$location.url('/admin');
		});
	}
});

// SHOW PRODUCT CONTROLLER
app.controller('ShowProductController', function($scope, $location, $routeParams, adminFactory) {
	console.log('Found ShowProductController');
	
	// Get product details
	adminFactory.findProduct($routeParams.id, function(response) {
		$scope.product = response.data.product;
	});
});




// *********** FACTORY ***********
app.factory('adminFactory', function($http) {
 	var factory = {};

 	factory.getAllProducts = function(callback) {
 		$http.get('/product/index').then(function(returned_data) {
 			callback(returned_data);
 		});
 	}

 	factory.createProduct = function(productObj, callback) {
 		$http.post('/product/new', productObj).then(function(returned_data) {
 			callback(returned_data);
 		})
 	}

 	factory.findProduct = function(id,callback) {
 		$http.get('/product/'+id).then(function(returned_data) {
 			callback(returned_data);
 		});
 	}

 	factory.updateProduct = function(productObj, callback) {
 		$http.put('/product/'+productObj._id, productObj).then(function(returned_data) {
 			callback(returned_data);
 		})
 	}

 	factory.deleteProduct = function(id, callback) {
 		$http.delete('/product/'+id).then(function(returned_data) {
 			callback(returned_data);
 		});
 	}

 	return factory;
});
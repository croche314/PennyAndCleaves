// *********** STORE CONTROLLER ***********
app.controller('StoreController', function($rootScope, $scope, $window, $location, $routeParams, userFactory, productFactory) {
	console.log('Found Store Controller');
	
	if(!$rootScope.currentUser) {
		$rootScope.currentUser = {
			_id: '5908e327e6fcc70cb8dec729',
			first_name: 'Chris',
			last_name: 'Roche',
			email: 'croche314@gmail.com',
			address: '4423 N Paulina St',
			city: 'Chicago',
			state: 'IL',
			zip_code: '60640',
			phone: '(847)682-9444'
		};
	}

	if(!$rootScope.bag) {
		$rootScope.bag = [
			{
				product_id: "590b88f40b50b619d963d40b",
				name: "Onitsuka Tiger Colorado Eighty-Five® sneakers",
				img: "C5242_EF3574.jpeg",
				color: "classic gravel",
				size: "9",
				quantity: 1,
				price: 95
			},
			{
				product_id: "5908eb8610c5460d24bbf8c7",
				name: "Essential chino pant in 1040 athletic fit",
				img: "64782_GY6104.jpeg",
				color: "smoked graphite",
				size: "34 x 29",
				quantity: 1,
				price: 68
			},
		];
	}

	// Login User
	$scope.loginUser = function() {
		// if fields are blank, warn and return
		// if($scope.user_login == undefined) {
		// 	toastr.warning('Invalid login, try again', 'Oops!');
		// 	return		
		// }

		// find user
		userFactory.findUser($scope.user_login, function(response) {
			if(response.data.user == null) {
				// email not found
				toastr.warning('Invalid login, try again', 'Oops!');
			} else {
				// email/user found! 
				userObj = response.data.user;
				// check password 
				if(userObj.password == $scope.user_login.password) {
					console.log('Passwords match! Redirecting...');
					//userFactory.currentUser = userObj;
					$rootScope.currentUser = userObj;
					toastr.success('Welcome back ' + userObj.first_name);
					console.log($location.url());
					if($location.url() == '/checkout') {
						return
					} else {
						$window.history.back();
					}
				} else {
					console.log('Password does not match!');
					toastr.warning('Invalid login, try again', 'Oops!');
				}
			}

		});
	};

	// if user clicked 'register' to get here, show register form
	if($location.url() == "/login#register") {
			$scope.register = true;
		}

	// show register form
	$scope.showRegisterForm = function() {
		if($scope.register) {
			$scope.register = false;
		} else {
			$scope.register = true;
		}

		console.log($location.url());
	}

	// Register User
	$scope.registerUser = function() {
		userFactory.createUser($scope.user, function(response) {
			console.log(response);
			$rootScope.currentUser = response.data.user;
			toastr.success('Thanks for registering!', 'Welcome');
			if($location.url() == '/checkout') {
				$location.url('/checkout');
			} else {
				$window.history.back();
			}
		});
	}

	// Logout
	$rootScope.logout = function() {
		$rootScope.currentUser = {};
		toastr.success('You are signed out', 'Bye!');
	}
});

// *********** HOME CONTROLLER ***********
app.controller('HomeController', function($scope, $location, $routeParams, productFactory) {
	console.log('Found Home Controller');
});

// *********** LOGIN CONTROLLER ***********
app.controller('LoginController', function($rootScope, $scope, $routeParams,$window, $location, productFactory, userFactory) {
	console.log("Found Login Controller");

	

	

});

// *********** SHOP CONTROLLER ***********
app.controller('ShopController', function($scope, $routeParams,$window, $location, productFactory) {
	console.log("Found Shop Controller");
	// Current Category and Subcategory(from URL)
	$scope.category = $routeParams.category;


	// Retrieve All Products
	productFactory.index(function(response) {
		$scope.all_products = response.data.all_products;
		var all_products = $scope.all_products; // shorten variable name
		console.log('All products:',$scope.all_products);
		console.log('Category:', $routeParams.category);
		if($routeParams.subcategory) {
			console.log('subcategory:', $routeParams.subcategory);
			$scope.subcategory = $routeParams.subcategory;
			// Filter products by selected subcategory
			productFactory.filterByTag($routeParams.category,$routeParams.subcategory, function(response) {
				$scope.products = response;
				$scope.sorted_products = [];
				console.log('Filtered products (sub):', $scope.products);
			});
		} else {
			// Filter products by selected category
			productFactory.filterByTag($routeParams.category,null, function(response) {
				$scope.products = response;
				console.log('Filtered products:', $scope.products);

				// Sort products into subcategories for display
				$scope.sorted_products = {};
				
				for(var i=0;i<$scope.subcategories.length;i++) {
					$scope.sorted_products[$scope.subcategories[i]] = [];
					productFactory.filterByTag($scope.category,$scope.subcategories[i],function(response) {
						$scope.sorted_products[$scope.subcategories[i]] = response;
					});
				}
				console.log('sorted_products:', $scope.sorted_products);
			});
		}

	});

	// Populate subcategories

	$scope.categories = {
		shirts: ['casual shirts', 'dress shirts', 't-shirts', 'polos'],
		pants: ['casual pants', 'dress pants', 'jeans'],
		blazers: ['casual blazers', 'suiting blazers'],
		shoes: ['sneakers','casual shoes', 'sandals', 'dress shoes'],
		accessories: ['sunglasses','hats', 'belts', 'ties']
	}
	
	if($scope.category == 'shirts') { // shirts
		$scope.subcategories = ['casual shirts', 'dress shirts','t-shirts', 'polos'];

	} else if($scope.category == 'pants') { // pants
		$scope.subcategories = ['casual pants','dress pants','jeans'];
	} else if($scope.category == 'blazers') {
		$scope.subcategories = ['casual blazers', 'suiting blazers'];
	} else if($scope.category == 'shoes') { // shoes
		$scope.subcategories = ['sneakers','casual shoes','sandals', 'dress shoes'];
	} else if ($scope.category == 'accessories') {
		$scope.subcategories = ['sunglasses','hats','belts','ties'];
	}	
	
});

// *********** SHOW PRODUCT CONTROLLER ***********
app.controller('ShowProductController', function($rootScope, $scope, $routeParams, $location, productFactory) {
	console.log('Found Show Product Controller');
	$scope.id = $routeParams.id;
	$scope.imgIndex = 0;
	
	// Reset Factory Index
	productFactory.index(function(response) {
		$scope.all_products = response.data.all_products;
		// Create Suggested Products
		$scope.suggestions = [];
		for(var i=0;i<5;i++) {
			$scope.suggestions.push($scope.all_products[i]);
		}
	});

	// Get Product Info
	productFactory.findProduct($routeParams.id, function(response) {
		$scope.product = response.data.product;
		$scope.category = $scope.product.tags[0];
		$scope.currentImage = $scope.product.main_img;
		$scope.currentColor = $scope.product.colors[0];
		$scope.color_images = $scope.product.color_images;

		// Create ratings array
		$scope.avg_rating = [];
		for(var i=0;i<$scope.product.avg_rating;i++) {
			$scope.avg_rating.push(i);
		}
	});

	// Change Image
	$scope.changeImage = function(image,index) {
		console.log('******** COLOR CHANGE ********');
		console.log('$scope.currentImage:', $scope.currentImage);
		console.log('clicked image:', image);
		console.log('$scope.currentImage:', $scope.currentImage);

		$scope.currentImage = image;
		if(index || index == 0) {
			console.log('index:', index)
			$scope.currentColor = $scope.product.colors[index];
			$scope.imgIndex = index;
		}
	}

	// Select Shirt Size
	$scope.shirt_size_range = ['S','M','L','XL','XXL'];

	$scope.selectShirtSize = function(size) {
		$scope.shirtSize = size;
	}

	// Select Waist and Inseam (Pants)
	$scope.pant_waist_range = [30,32,34,36,38,40,42,44];
	$scope.pant_inseam_range = [29,30,32,34,36]; 

	$scope.selectWaist = function(size) {
		$scope.waist = size;
	}
	$scope.selectInseam = function(size) {
		$scope.inseam = size;
	}

	// Select Shoe Size
	$scope.shoe_size_range = ['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','13','14'];
	$scope.selectShoeSize = function(size) {
		$scope.shoeSize = size;
	}

	// Select Blazer Size
	$scope.blazer_size_range = ['36 short','36 regular','36 long','38short','38 regular','38 long','40 short','40 regular','40 long','42 short', '42 regular','42 long','44 short', '44 regular', '44 long'];
	$scope.selectBlazerSize = function(size) {
		$scope.blazerSize = size;
	}

	// Add To Cart
	$scope.addToCart = function() {
		// figure out which size to use depending on the product category
		switch($scope.category) {
			case 'pants':
				$scope.size = $scope.waist + ' x ' + $scope.inseam;
				break;
			case 'shirts':
				$scope.size = $scope.shirtSize;
				break;
			case 'shoes':
				$scope.size = $scope.shoeSize;
				break;
			case 'blazers':
				$scope.size = $scope.blazerSize;
				break;
			default:
				$scope.size = 'OSFA';
		}

		if($scope.size == undefined) {
			toastr.warning('Please select a size');
			return;
		}

		newLineItem = {
			name: $scope.product.name,
			quantity: $scope.quantity,
			product_id: $scope.product._id,
			img: $scope.product.color_images[$scope.imgIndex],
			color: $scope.currentColor,
			size: $scope.size,
			price: $scope.product.price
		}
		$rootScope.bag.push(newLineItem);
		console.log(newLineItem);
		console.log('bag:',$rootScope.bag);
		toastr.success('Item added to bag!');
	}

	$scope.forceRegister = function() {
		toastr.success('Please sign in or register before proceeding to checkout');
		$location.url('/login#register')
	}
});

// *********** BAG CONTROLLER ***********
app.controller('BagController', function($rootScope, $scope, $routeParams, $location, productFactory, userFactory) {
	console.log("Found Bag Controller");

	// SHOPPING BAG
	// available quantities for select control in shopping bag (quantity)
	$scope.quantities = [1,2,3,4,5];

	$scope.bagSubtotal = 0
	bagSubtotal = 0;

	$scope.updateBagSubtotal = function() {
		bagSubtotal = 0;
		for(var i=0;i<$rootScope.bag.length;i++) {
			bagSubtotal += $rootScope.bag[i].quantity * $rootScope.bag[i].price;
		}
		$scope.bagSubtotal = bagSubtotal;
		$scope.tax = $scope.bagSubtotal * 0.0675;
		return bagSubtotal;
	}

	// Remove line item
	$scope.removeLineItem = function(index) {
		$rootScope.bag.splice(index,1);
		$scope.updateBagSubtotal();
		toastr.success('Item removed from bag');
	};

	// Empty Bag
	$scope.emptyBag = function() {
		$rootScope.bag = [];
		$scope.updateBagSubtotal();
		toastr.success('Shopping bag is empty!');
	}

	// Get Bag subtotal on page load
	$scope.updateBagSubtotal();

	// Place Order
	$scope.placeOrder = function() {
		$rootScope.bag = [];
		toastr.success('Order placed!','Thank You!');
		$location.url('/thank_you');
	}
});

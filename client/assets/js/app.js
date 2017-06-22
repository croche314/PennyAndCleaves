var app = angular.module('app', ['ngRoute']);

// *********** ROUTES ***********
app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '../partials/home.html',
		controller: 'HomeController'
	})
	.when('/shop/:category', {
		templateUrl: '../partials/shop.html',
		controller: 'ShopController'
	})
	.when('/shop/:category/:subcategory', {
		templateUrl: '../partials/shop.html',
		controller: 'ShopController'
	})
	.when('/view_product/:id', {
		templateUrl: '../partials/view_product.html',
		controller: 'ShowProductController'
	})
	.when('/login', {
		templateUrl: '../partials/login.html',
		controller: 'StoreController'
	})
	.when('/bag', {
		templateUrl: '../partials/bag.html',
		controller: 'BagController'
	})
	.when('/checkout', {
		templateUrl: '../partials/checkout.html',
		controller: 'BagController'
	})
	.when('/thank_you', {
		templateUrl: '../partials/thank_you.html',
		controller: 'BagController'
	})
});

toastr.options = {
  "debug": false,
  "positionClass": "toast-top-right",
  "onclick": null,
  "fadeIn": 300,
  "fadeOut": 1000,
  "timeOut": 5000,
  "extendedTimeOut": 1000
}

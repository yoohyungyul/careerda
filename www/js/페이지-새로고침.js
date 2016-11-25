var app  = angular.module('newApp', ['ionic']);

app.controller('myNewsController',function($scope, $http) {

	$scope.news = [];

	$scope.loadMore = function() {
		var parameters = {
			id : $scope.lastarticleID
		}
		$http.get('http://codedamn.com/filesCodedamn/news.php', { params : parameters }).success(function(items) {
		  //useItems(items);
			$scope.lastarticleID = items.lastID;
			angular.forEach(items, function (item) {
				$scope.news.push(item);
			});
			$scope.$broadcast('scroll.infiniteScrollComplete');
			
		});
   };

	$scope.doRefresh = function() {
		$scope.news = [];
		$http({
			method : "GET",
			url : "http://codedamn.com/filesCodedamn/news.php"
		}).then(function(newsData) {
			angular.forEach(newsData.data, function(newsArticle)  {
				$scope.news.push(newsArticle);
			});
			$scope.lastarticleID = newsData.data.lastID;
			$scope.$broadcast('scroll.refreshComplete');
		});
	};


	
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


app.config(function($stateProvider, $urlRouterProvider) {
});
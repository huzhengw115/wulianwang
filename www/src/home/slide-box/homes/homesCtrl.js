angular.module('Homes', [])
.controller('HomesCtrl', function($scope, homeService, $ionicSlideBoxDelegate, LoaderService, $timeout) {
	//获取轮播图片
	var homeTitlePic = function() {

        homeService.homeTitlePic().then( function(homeTitle) {
            $scope.ads = [];
            $ionicSlideBoxDelegate.$getByHandle('homes-pic').update();
            $scope.ads = homeTitle;
            console.log($scope.ads);
        })
    };

    var homeListItem = function() {
    	homeService.homeListItem().then( function(homeItem) {
    		$scope.homeItem = homeItem;
    	})
    };

    $scope.doRefresh = function () {
        LoaderService.show();
        homeTitlePic();
        homeListItem();
	    $scope.$broadcast('scroll.refreshComplete');
        $timeout(function() {
            LoaderService.hide();
        },1000);
    };

    $scope.doRefresh();
});
angular.module('Information', [])
.controller('InformationCtrl', function($scope, $timeout, $ionicSlideBoxDelegate, homeService, $http, $ocLazyLoad) {
	
	//加载的列表数据
	$scope.hotsItem = [];
	//上拉加载的控制
	$scope.More = false;
	//$scope.slideNumber = 0;

	//二级栏目的相应地址
	var informationTemplate = ['src/home/slide-box/information/content/hots/hots.html', 'src/home/slide-box/information/content/policy/policy.html', '', '', ''];
	//$scope.informationContent = informationTemplate[0];

	//二级栏目的选择
	$scope.selectView = function(number) {
		$scope.slideNumber = number;
		$ocLazyLoad.load('src/home/slide-box/information/tabSelect/tabSelect.css');
		switch(number) {
			case 0: {
				$ocLazyLoad.load(['src/home/slide-box/information/content/hots/hots.css']).then( function() {
	                $scope.informationContent = informationTemplate[0];
	            })
			}
			break;
			case 1: {
				$ocLazyLoad.load(['src/home/slide-box/information/content/policy/policy.css']).then( function() {
	                $scope.informationContent = informationTemplate[1];
	            })
			}
			break;
			case 2: {
				console.log(number);
			}
			break;
			case 3: {
				console.log(number);
			}
			break;
			case 4: {
				console.log(number);
			}
			break;
			default: break;
		}
	}

	//上拉加载
    $scope.loadMore = function () {
    	homeService.getHotsLiatData().then( function(hotsListData) {
    		Array.prototype.push.apply($scope.hotsItem, hotsListData);
    		console.log('上拉:', $scope.hotsItem)
    	})
    	.finally(function() {
	    	$scope.$broadcast('scroll.infiniteScrollComplete');
    	});
    };
	//下拉刷新
    $scope.doRefresh = function () {
    	homeService.getHotsLiatData().then( function(hotsListData) {
    		$scope.hotsItem = hotsListData;
    		console.log('下拉:', $scope.hotsItem)
    	})
    	.finally(function() {
	        // 停止广播ion-refresher
	    	$scope.$broadcast('scroll.refreshComplete');
	    });
	    $timeout(function() {
            $scope.More = true;
        }, 1000);
    };

    //$scope.doRefresh();

	$scope.selectView(0);
});
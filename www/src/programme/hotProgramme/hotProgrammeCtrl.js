angular.module('HotProgramme', [])
.controller('HotProgrammeCtrl', function($scope, programmeService, $timeout) {
	
	//二级栏目的选项
	$scope.slideProgrammeNumber = 7;
	//定义筛选项的初始值
	$scope.hotProgrammeIndex = 0;

	//二级栏目的选择
	$scope.selectProgrammeView = function(tabNumber) {
		$scope.slideProgrammeNumber = tabNumber;
		$scope.$emit('to-parent', tabNumber);
	}

	//筛选项的点击事件
	$scope.hotProgrammeSelect = function(tabProgrammeNum) {
		$scope.hotProgrammeIndex = tabProgrammeNum;
	}

	//下拉刷新
	$scope.doRefresh = function () {
    	programmeService.getProgrammeListItem().then( function(programmeListItem) {
    		$scope.hotProgrammeListItem = programmeListItem;
    		console.log('下拉:', $scope.hotProgrammeListItem)
    	})
    	.finally(function() {
	        // 停止广播ion-refresher
	    	$scope.$broadcast('scroll.refreshComplete');
	    });
	    $timeout(function() {
            //$scope.More = true;
        }, 1000);
    };

    $scope.doRefresh();
	$scope.hotProgrammeItem = programmeService.programmeItem;
});
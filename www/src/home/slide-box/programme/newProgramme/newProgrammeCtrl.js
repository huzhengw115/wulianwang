angular.module('NewProgramme', [])
.controller('NewProgrammeCtrl', function($scope, programmeService, $timeout) {
	
	//二级栏目的选项
	$scope.slideProgrammeNumber = 6;
	//定义筛选项的初始值
	$scope.newProgrammeIndex = 0;

	//二级栏目的选择
	$scope.selectProgrammeView = function(tabNumber) {
		$scope.slideProgrammeNumber = tabNumber;
		$scope.$emit('to-parent', tabNumber);
	}

	//筛选项的点击事件
	$scope.newProgrammeSelect = function(tabProgrammeNum) {
		$scope.newProgrammeIndex = tabProgrammeNum;
	}

	//下拉刷新
	$scope.doRefresh = function () {
    	programmeService.getProgrammeListItem().then( function(programmeListItem) {
    		$scope.newProgrammeListItem = programmeListItem;
    		console.log('下拉:', $scope.newProgrammeListItem)
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
	$scope.newProgrammeItem = programmeService.programmeItem;
});
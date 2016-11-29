angular.module('EleProgramme', [])
.controller('EleProgrammeCtrl', function($scope, programmeService, $timeout) {
	
	//二级栏目的选项
	$scope.slideProgrammeNumber = 8;

	//二级栏目的选择
	$scope.selectProgrammeView = function(tabNumber) {
		$scope.slideProgrammeNumber = tabNumber;
		$scope.$emit('to-parent', tabNumber);
	}

	//下拉刷新
	$scope.doRefresh = function () {
    	programmeService.getProgrammeListItem().then( function(programmeListItem) {
    		$scope.eleProgrammeListItem = programmeListItem;
    		console.log('下拉:', $scope.eleProgrammeListItem)
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
});
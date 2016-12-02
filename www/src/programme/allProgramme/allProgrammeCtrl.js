angular.module('AllProgramme', [])
.controller('AllProgrammeCtrl', function ($scope, programmeService, $timeout) {
	//二级栏目的选项
	$scope.slideProgrammeNumber = 5
	//定义筛选项的初始值
	$scope.allProgrammeIndex = 0
	//二级栏目的选择
	$scope.selectProgrammeView = function (tabNumber) {
		$scope.slideProgrammeNumber = tabNumber
		$scope.$emit('to-parent', tabNumber)
	}
	//筛选项的点击事件
	$scope.allProgrammeSelect = function (tabProgrammeNum) {
		$scope.allProgrammeIndex = tabProgrammeNum
		console.log('Select:',$scope.allProgrammeIndex)
	}
	//下拉刷新
	$scope.doRefresh = function () {
    programmeService.getProgrammeListItem().then( function (programmeListItem) {
    	$scope.allProgrammeListItem = programmeListItem
    	console.log('下拉:', $scope.allProgrammeListItem)
    })
    .finally(function () {
	      // 停止广播ion-refresher
	    $scope.$broadcast('scroll.refreshComplete')
	  })
	  $timeout(function () {
        //$scope.More = true;
    }, 1000)
  }
  $scope.doRefresh()
	$scope.allProgrammeItem = programmeService.programmeItem;
})
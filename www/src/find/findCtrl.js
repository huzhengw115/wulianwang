angular.module('Find', [])

.controller('FindCtrl', function ($scope, $ionicScrollDelegate) {
	//设置关键字
	$scope.keyword = ''
	//设置类型选择框隐藏的变量
	$scope.isClassShow = false
	//设置类型数组
	$scope.classItem = [{'id': 0,'class': '全部'},{'id': 1,'class': '资讯'},{'id': 2,'class': '方案'},{'id': 3,'class': '商机'},{'id': 4,'class': '活动'}]
	//设置页面最开始时的类型
	$scope.selectItem = $scope.classItem[0].class
	//搜索框类型选择
	$scope.classSelect = function () {
		$scope.isClassShow = !$scope.isClassShow
	}
	//类型选择列表的点击事件
	$scope.classSelectItem = function (index) {
		$scope.isClassShow = !$scope.isClassShow
		$scope.selectItem = $scope.classItem[index].class
	}
	//搜索按钮
	$scope.toSearch = function () {
		$scope.searchData = true
		console.log('keyword:',$scope.keyword);
	}
	//input内容变动时执行的函数
	$scope.searchChange = function() {
		if(!$scope.keyword.length) {
			$scope.more = false
			$scope.searchData = false
    	$ionicScrollDelegate.scrollTop()
		} else {
			$scope.more = true
		}
  }
  //清除input中的内容
  $scope.clearSearch = function () {
  	$scope.keyword = ''
    $ionicScrollDelegate.scrollTop()
  }
})

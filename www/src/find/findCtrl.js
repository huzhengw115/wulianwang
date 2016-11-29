angular.module('Find', [])

.controller('FindCtrl', function ($scope) {
	
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
})

angular.module('Meets', [])
.controller('MeetsCtrl', function($scope, meetsService, $timeout) {

    var getMeetsListItem = function() {
    	meetsService.getMeetsListItem().then( function(meetsListItem) {
    		$scope.meetsListItem = meetsListItem;
    	})
    };

    $scope.doRefresh = function () {
        getMeetsListItem();
	    $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.meetWork = ['行业', '小工', '搬砖', '泥水工', '木匠', '装修', '混泥土', '打桩'];
    $scope.meetCity = ['城市', '北京', '天津', '上海', '重庆', '广州', '深圳', '杭州', '宁波', '石家庄', '舟山'];
    $scope.meetTime = ['时间', '一小时内', '5小时内', '12小时内', '一天内', '一周内', '半个月内', '一个月内'];

    $scope.doRefresh()

    $scope.pickerButton = function () {
      console.log('111')
    }

    $scope.selectPickerValue = function () {
      var lalala = document.getElementsByName('first')
      console.log(lalala);
    }
    $scope.selectPickerValue()
})

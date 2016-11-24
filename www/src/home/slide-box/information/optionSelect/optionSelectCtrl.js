angular.module('optionSelect', [])
.controller('optionSelectCtrl', function($scope, informationService) {

	//取筛选项中的标签
	$scope.optionThings = informationService.hotsThings;
  	//物联网选项
    $scope.optionThingsIndex = 0;
	//点击筛选标签弹出
	$scope.optionTabShow = function() {
		//控制小三角的转动
		$scope.selectOpened = !$scope.selectOpened;
		//删选框的动画效果
		$scope.isOptionShow = !$scope.isOptionShow;
	}
	//物联网标签的选择
	$scope.optionThingsSelect = function(tabThingsNum) {

		switch(tabThingsNum) {
			case tabThingsNum: {
				$scope.optionThingsIndex = tabThingsNum;
				console.log(tabThingsNum);
			}
			break;
			default: break;
		}
	}
})

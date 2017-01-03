angular.module('optionSelect', [])

.controller('optionSelectCtrl', function ($scope, informationService, $timeout) {
  // 取筛选项中的标签
  $scope.optionThings = informationService.hotsThings
  // 阻止筛选框闪烁
  $scope.isShow = true

  // 点击筛选标签弹出
  $scope.optionTabShow = function () {

    // 将阻止闪烁ng-hide关掉
    $scope.isShow = false
    $timeout(function () {
      // 控制小三角的转动
      $scope.selectOpened = !$scope.selectOpened
      // 筛选框的动画效果
      $scope.isOptionShow = !$scope.isOptionShow
      console.log('点击筛选', $scope.isOptionShow)
    }, 50)
    
  }
  // 物联网标签的选择
  $scope.optionThingsSelect = function (tabThingsNum) {
    // 选中标签
    $scope.optionThingsIndex = tabThingsNum
    console.log(tabThingsNum)
  }

  // 物联网选项为第一项
  $scope.optionThingsSelect(0)

})

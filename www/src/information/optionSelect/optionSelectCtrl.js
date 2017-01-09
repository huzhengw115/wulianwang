angular.module('optionSelect', [])

.controller('optionSelectCtrl', function ($scope, informationService, $timeout) {
  // 获取到父级控制器传递过来的视图编号
  $scope.$on('to-child', function (event, data) {
    console.log('childCtrl:', data)
  })
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
  $scope.optionThingsSelect = function (data) {
    // 选中标签
    $scope.optionThingsIndex = data.id
    console.log('选中的标签', data.tab)
    // 向父级控制器（热门、政策、观点、原创）反馈选中的标签
    $scope.$emit('to-parent', data.tab)
    // 将选中的标签显示到页面上面
    $scope.tabSelect = data.tab
    // 选中标签之后将选择框收回去
    $scope.optionTabShow()
  }

  // 物联网选项为第一项
  // $scope.optionThingsSelect(0)
  $scope.optionThingsIndex = 0

})

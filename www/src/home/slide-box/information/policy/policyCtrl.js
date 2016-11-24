angular.module('Policy', [])

.controller('PolicyCtrl', function ($scope, homeService, informationService, $timeout, LoaderService) {
  // 二级栏目的首选项
  $scope.slideNumber = 1
  // 上拉加载的控制
  $scope.More = false

  // 二级栏目的选择
  $scope.selectView = function (tabNumber) {
    $scope.slideNumber = tabNumber
    switch (tabNumber) {
      case tabNumber:
        {
          $scope.$emit('to-parent', tabNumber)
        }
        break
      default:
        break
    }
  }

  // 上拉加载
  $scope.loadMore = function () {
    homeService.getHotsLiatData().then(function (hotsListData) {
      Array.prototype.push.apply($scope.policyItem, hotsListData)
      console.log('上拉:', $scope.policyItem)
    })
      .finally(function () {
        $scope.$broadcast('scroll.infiniteScrollComplete')
      })
  }
  // 下拉刷新
  $scope.doRefresh = function () {
    // LoaderService.show();
    homeService.getHotsLiatData().then(function (hotsListData) {
      $scope.policyItem = hotsListData
      console.log('下拉:', $scope.policyItem)
    })
      .finally(function () {
        // 停止广播ion-refresher
        $scope.$broadcast('scroll.refreshComplete')
      })
    $timeout(function () {
      $scope.More = true
      // LoaderService.hide();
    }, 1000)
  }

  $scope.doRefresh()
})

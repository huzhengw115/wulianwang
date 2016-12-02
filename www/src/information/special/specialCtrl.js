angular.module('Special', [])

.controller('SpecialCtrl', function ($scope, LoaderService, informationService, $timeout) {
  // 二级栏目的首选项
  $scope.slideNumber = 3
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
    informationService.getSpecialListItem().then(function (specialItem) {
      Array.prototype.push.apply($scope.specialItem, specialItem)
      console.log('上拉:', $scope.specialItem)
    })
      .finally(function () {
        $scope.$broadcast('scroll.infiniteScrollComplete')
      })
  }
  // 下拉刷新
  $scope.doRefresh = function () {
    // LoaderService.show()
    informationService.getSpecialListItem().then(function (specialItem) {
      $scope.specialItem = specialItem
      console.log('下拉:', $scope.specialItem)
    })
      .finally(function () {
        // 广播停止ion-refresher
        $scope.$broadcast('scroll.refreshComplete')
      })
    $timeout(function () {
      $scope.More = true
      // LoaderService.hide()
    }, 1000)
  }

  $scope.doRefresh()
})

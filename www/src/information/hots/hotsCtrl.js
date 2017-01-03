angular.module('Hots', [])

.controller('HotsCtrl', function ($scope, informationService, $timeout, LoaderService) {
  // 二级栏目的首选项
  $scope.slideNumber = 0
  // 上拉加载的控制
  $scope.More = false

  
  // ..
  $scope.hotsClassSelect = false
  $scope.hotsSelect = function () {
    //..
    $scope.hotsClassSelect = !$scope.hotsClassSelect
  }

  $scope.selectOpened = false
  // 二级栏目的选择
  $scope.selectView = function (tabNumber) {
    //console.log('tabNumber:',tabNumber)
    $scope.slideNumber = tabNumber
    $scope.$emit('to-parent', tabNumber)
  }

  // 上拉加载
  $scope.loadMore = function () {
    informationService.getListData().then(function (hotsListData) {
      Array.prototype.push.apply($scope.hotsItem, hotsListData)
      console.log('上拉:', $scope.hotsItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }
  // 下拉刷新
  $scope.doRefresh = function () {
    // LoaderService.show();
    informationService.getListData().then(function (hotsListData) {
      $scope.hotsItem = hotsListData
      console.log('下拉:', $scope.hotsItem)
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

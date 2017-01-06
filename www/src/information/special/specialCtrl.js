angular.module('Special', [])

.controller('SpecialCtrl', function ($scope, LoaderService, informationService, getDataService) {
  // 二级栏目的首选项
  $scope.slideNumber = 3
  // 上拉加载的控制
  $scope.More = false
  // 设置请求传输的数据
  var params = {id: 0}

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.specialItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.specialItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getNewsListItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.specialItem, data)
      console.log('上拉:', $scope.specialItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // 下拉刷新
  $scope.doRefresh = function () {
    // LoaderService.show();
    getDataService.getNewsListItem(params).then(function (data) {
      $scope.specialItem = data
      console.log('下拉:', $scope.specialItem)
    })
    .finally(function () {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      $scope.More = true
    })
  }

  $scope.doRefresh()

})

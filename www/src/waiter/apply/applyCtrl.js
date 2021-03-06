angular.module('Apply', [])
.controller('ApplyCtrl', function($scope, getDataService) {

  // 设置请求传输的数据
  var params = {dateformat: 1, id: 0}

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.applyData.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.applyData[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getWaiterItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.applyData, data)
      console.log('上拉:', $scope.applyData)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // 下拉刷新
  $scope.doRefresh = function () {
    params.id = 0
    // LoaderService.show()
    getDataService.getWaiterItem(params).then(function (data) {
      $scope.applyData = data
      console.log('下拉:', $scope.applyData)
    })
    .finally(function () {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      if ($scope.applyData.length < 15) {
        $scope.More = false
      } else {
        $scope.More = true
      }
    })
  }

  $scope.doRefresh()

})
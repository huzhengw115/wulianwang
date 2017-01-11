angular.module('EleProgramme', [])
.controller('EleProgrammeCtrl', function($scope, programmeService, getDataService) {
  
  $scope.More = false
  // 定义params
  var params = {keyword: '', id: 0, catid: 2}

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.eleProgrammeItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.eleProgrammeItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getProgrammeItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.eleProgrammeItem, data)
      console.log('上拉:', $scope.eleProgrammeItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // 下拉刷新
  $scope.doRefresh = function () {
    getDataService.getProgrammeItem(params).then( function(data) {
      $scope.eleProgrammeItem = data
      console.log('下拉:', $scope.eleProgrammeItem)
    })
    .finally(function() {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      $scope.More = true
    })
  }

  $scope.doRefresh()
})

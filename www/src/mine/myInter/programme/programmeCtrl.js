angular.module('MyInterProgCtrl', [])

.controller('MyInterProgCtrl', function ($scope, LoaderService, getDataService, $ionicScrollDelegate) {

  // 上拉加载的控制
  $scope.More = false
  // 首先定义按钮不显示
  $scope.isGoTopProg = false
  var params = {id: 0, dateformat: 1, center_type: 'interest'}

  // 回到页面的顶端
  $scope.scrollTop = function () {
    $ionicScrollDelegate.$getByHandle('progSrcoll').scrollTop(true)
  }

  // 在ion-content计算页面滚动的距离
  $scope.progToTopScroll = function (data){
    $scope.isGoTopProg = $ionicScrollDelegate.$getByHandle('progSrcoll').getScrollPosition().top>1000?true:false
    $scope.$apply()
  }

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.progItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.progItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getProgrammeItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.progItem, data)
      console.log('上拉:', $scope.progItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // 下拉刷新
  $scope.doRefresh = function (data) {
    params.id = 0
    // LoaderService.show()
    console.log(params)
    getDataService.getProgrammeItem(params).then(function (data) {
      console.log('实际上取到的数据：', data)
      $scope.progItem = data
      console.log('下拉:', $scope.progItem)
    })
    .finally(function () {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      if ($scope.progItem == undefined || $scope.progItem == '') {
        $scope.More = false
        $scope.space = true
      } else if ($scope.progItem.length < 15) {
        $scope.More = false
      } else {
        $scope.More = true
      }
    })
  }

  // 页面开始时数据通过下拉刷新加载
  $scope.doRefresh()

})

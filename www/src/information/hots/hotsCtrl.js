angular.module('Hots', [])

.controller('HotsCtrl', function ($scope, informationService, LoaderService, getDataService, $ionicScrollDelegate) {
  // 二级栏目的首选项
  $scope.slideNumber = 0
  // 上拉加载的控制
  $scope.More = false
  // 设置请求传输的数据,栏目分别对应热门：67,政策：68,观点：69,原创：71
  var params = {keyword: '', id: 0, catid: 67}

  // 回到页面的顶端
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true)
  }

  // 在ion-content计算页面滚动的距离
  $scope.toTopScroll = function(data){
    $scope.isGoTop = $ionicScrollDelegate.getScrollPosition().top
    $scope.$apply()
  }

  $scope.selectOpened = false
  // 二级栏目的选择
  $scope.selectView = function (tabNumber) {
    // console.log('tabNumber:',tabNumber)
    $scope.slideNumber = tabNumber
    $scope.$emit('to-parent', tabNumber)
  }

  // 获取到父级控制器传递过来的关键字
  $scope.$on('to-child', function (event, data) {
    console.log('childCtrl:', data)
    $scope.doRefresh(data)
  })

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.hotsItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.hotsItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getNewsItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.hotsItem, data)
      console.log('上拉:', $scope.hotsItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // 下拉刷新
  $scope.doRefresh = function (data) {
    params.keyword = data
    // LoaderService.show()
    getDataService.getNewsItem(params).then(function (data) {
      $scope.hotsItem = data
      console.log('下拉:', $scope.hotsItem)
    })
    .finally(function () {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      $scope.More = true
    })
  }

  // 页面开始时数据通过下拉刷新加载
  $scope.doRefresh()

})

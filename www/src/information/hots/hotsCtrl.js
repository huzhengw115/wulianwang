angular.module('Hots', [])

.controller('HotsCtrl', function ($scope, LoaderService, getDataService, $ionicScrollDelegate) {

  // 上拉加载的控制
  $scope.More = false
  // 首先定义按钮不显示
  $scope.displayGoTopHots = true
  $scope.isGoTopHots = false
  // 设置请求传输的数据,栏目分别对应热门：67,政策：68,观点：69,原创：71
  var params = {keyword: '', id: 0, catid: 67, dateformat: 1}

  // 回到页面的顶端
  $scope.scrollTop = function() {
    $ionicScrollDelegate.$getByHandle('HotsSrcoll').scrollTop(true)
  }

  // 在ion-content计算页面滚动的距离
  $scope.hotsToTopScroll = function(data){
    $scope.isGoTopHots = $ionicScrollDelegate.$getByHandle('HotsSrcoll').getScrollPosition().top>1000?true:false
    $scope.$apply()
  }

  // 获取到父级控制器传递过来的关键字
  $scope.$on('to-child', function (event, data) {
    console.log('childCtrl:', data)
    $scope.doRefresh(data)
    $scope.scrollTop()
  })

  // 从父级获取input框的焦点事件，对回到顶端按钮的隐藏
  $scope.$on('display', function (event, number) {
    console.log('display:', number)
    if (number == 0) {
      $scope.displayGoTopHots = false
    } else {
      $scope.displayGoTopHots = true
    }
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
    params.id = 0
    // LoaderService.show()
    console.log(params)
    getDataService.getNewsItem(params).then(function (data) {
      console.log('实际上取到的数据：', data)
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

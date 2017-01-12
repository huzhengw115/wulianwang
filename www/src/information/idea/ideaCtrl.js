angular.module('Idea', [])

.controller('IdeaCtrl', function ($scope, informationService, LoaderService, getDataService, $ionicScrollDelegate) {

  // 上拉加载的控制
  $scope.More = false
  // 首先定义按钮不显示
  $scope.displayGoTopIdea = true
  $scope.isGoTopIdea = false
  // 设置请求传输的数据
  var params = {keyword: '', id: 0, catid: 69, dateformat: 1}

  // 回到页面的顶端
  $scope.scrollTop = function() {
    $ionicScrollDelegate.$getByHandle('ideaSrcoll').scrollTop(true)
  }

  // 在ion-content计算页面滚动的距离
  $scope.ideaToTopScroll = function(data){
    $scope.isGoTopIdea = $ionicScrollDelegate.$getByHandle('ideaSrcoll').getScrollPosition().top>1000?true:false
    $scope.$apply()
  }

  // 获取到父级控制器传递过来的关键字
  $scope.$on('to-child', function (event, data) {
    console.log('childCtrl:', data)
    $scope.doRefresh(data)
  })

  // 从父级获取input框的焦点事件，对回到顶端按钮的隐藏
  $scope.$on('display', function (event, number) {
    console.log('display:', number)
    if (number == 0) {
      $scope.displayGoTopIdea = false
    } else {
      $scope.displayGoTopIdea = true
    }
  })

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.ideaItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.ideaItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getNewsItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.ideaItem, data)
      console.log('上拉:', $scope.ideaItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // 下拉刷新
  $scope.doRefresh = function (data) {
    params.keyword = data
    // LoaderService.show();
    getDataService.getNewsItem(params).then(function (data) {
      $scope.ideaItem = data
      console.log('下拉:', $scope.ideaItem)
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

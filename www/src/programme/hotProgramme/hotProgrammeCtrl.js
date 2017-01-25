angular.module('HotProgramme', [])
.controller('HotProgrammeCtrl', function($scope, $ionicScrollDelegate, getDataService) {
  
  // 定义筛选项的初始值
  $scope.hotProgrammeIndex = 0
  $scope.More = false
  // 定义params
  var params = {keyword: '', id: 0, dateformat: 1, posid: 37, tagid: 0}

  // 回到页面的顶端
  $scope.scrollTop = function() {
    $ionicScrollDelegate.$getByHandle('HotpSrcoll').scrollTop(true)
  }

  // 点击搜索的按钮隐藏按钮，弹出input框
  $scope.goFindHotp = function () {
    $scope.isGoFindHotp = true
    $scope.isGoFindInputHot = true
  }

  // yes 
  $scope.hotpYes = function (data) {
    $scope.isGoFindHotp = false
    $scope.isGoFindInputHot = false
    console.log(data)
    params.keyword = data
    $scope.doRefresh()
  }

  // no
  $scope.hotpNo = function () {
    $scope.isGoFindHotp = false
    $scope.isGoFindInputHot = false
  }

  // 在ion-content计算页面滚动的距离
  $scope.hotpToTopScroll = function(){
    $scope.isGoTopHotp = $ionicScrollDelegate.$getByHandle('HotpSrcoll').getScrollPosition().top>1000?true:false
    $scope.$apply()
  }

  // 筛选项的点击事件
  $scope.hotProgrammeSelect = function(index) {
   $scope.hotProgrammeIndex = index
    params.id = 0
    params.tagid = index
    $scope.doRefresh()
  }

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.hotProgrammeItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.hotProgrammeItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getProgrammeItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.hotProgrammeItem, data)
      console.log('上拉:', $scope.hotProgrammeItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // 下拉刷新
  $scope.doRefresh = function () {
    $scope.More = false
    params.id = 0
    getDataService.getProgrammeItem(params).then( function(data) {
      $scope.hotProgrammeItem = data
      console.log('下拉:', $scope.hotProgrammeItem)
    })
    .finally(function() {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      if($scope.hotProgrammeItem.length < 15) {
        $scope.More = false
      } else {
        $scope.More = true
      }
    })
  }

  var tab = {limitnum: 8}
  getDataService.getTabItem(tab).then(function (data) {
    $scope.hotProgrammeTab = data
    console.log('标签：', data)
  })

  $scope.doRefresh()

})

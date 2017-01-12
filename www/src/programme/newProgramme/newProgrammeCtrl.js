angular.module('NewProgramme', [])
.controller('NewProgrammeCtrl', function($scope, programmeService, getDataService, $ionicScrollDelegate) {
  
  // 定义筛选项的初始值
  $scope.newProgrammeIndex = 0
  $scope.More = false
  // 定义params
  var params = {keyword: '', id: 0, dateformat: 1}

  // 回到页面的顶端
  $scope.scrollTop = function() {
    $ionicScrollDelegate.$getByHandle('NewspSrcoll').scrollTop(true)
  }

  // 点击搜索的按钮隐藏按钮，弹出input框
  $scope.goFindNewsp = function () {
    $scope.isGoFindNewsp = true
    $scope.isGoFindInputNews = true
  }

  // yes 
  $scope.newspYes = function (data) {
    $scope.isGoFindNewsp = false
    $scope.isGoFindInputNews = false
    console.log(data)
    params.keyword = data
    $scope.doRefresh()
  }

  // no
  $scope.newspNo = function () {
    $scope.isGoFindNewsp = false
    $scope.isGoFindInputNews = false
  }

  // 在ion-content计算页面滚动的距离
  $scope.newspToTopScroll = function(){
    $scope.isGoTopNewsp = $ionicScrollDelegate.$getByHandle('NewspSrcoll').getScrollPosition().top>1000?true:false
    $scope.$apply()
  }

  // 筛选项的点击事件
  $scope.newProgrammeSelect = function(data, index) {
    $scope.newProgrammeIndex = index
    params.id = 0
    params.keyword = data
    $scope.doRefresh()
    console.log('选中的标签：', data)
  }

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.newProgrammeItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.newProgrammeItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getProgrammeItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.newProgrammeItem, data)
      console.log('上拉:', $scope.newProgrammeItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  //下拉刷新
  $scope.doRefresh = function () {
    getDataService.getProgrammeItem(params).then( function(data) {
      $scope.newProgrammeItem = data
      console.log('下拉:', $scope.newProgrammeItem)
    })
    .finally(function() {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      if($scope.newProgrammeItem < 15) {
        $scope.More = false
      } else {
        $scope.More = true
      }
    })
  }

  $scope.doRefresh()
  $scope.newProgrammeTab = programmeService.programmeItem
})

angular.module('EleProgramme', [])
.controller('EleProgrammeCtrl', function($scope, $ionicScrollDelegate, getDataService) {
  
  $scope.More = false
  // 定义params
  var params = {keyword: '', id: 0, dateformat: 1, posid: 45}

  // 回到页面的顶端
  $scope.scrollTop = function() {
    $ionicScrollDelegate.$getByHandle('ElepSrcoll').scrollTop(true)
  }

  // 点击搜索的按钮隐藏按钮，弹出input框
  $scope.goFindElep = function () {
    $scope.isGoFindElep = true
    $scope.isGoFindInputEle = true
  }

  // yes 
  $scope.elepYes = function (data) {
    $scope.isGoFindElep = false
    $scope.isGoFindInputEle = false
    console.log(data)
    params.keyword = data
    $scope.doRefresh()
  }

  // no
  $scope.elepNo = function () {
    $scope.isGoFindElep = false
    $scope.isGoFindInputEle = false
  }

  // 在ion-content计算页面滚动的距离
  $scope.elepToTopScroll = function(){
    $scope.isGoTopElep = $ionicScrollDelegate.$getByHandle('ElepSrcoll').getScrollPosition().top>1000?true:false
    $scope.$apply()
  }

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
    params.id = 0
    getDataService.getProgrammeItem(params).then( function(data) {
      $scope.eleProgrammeItem = data
      console.log('下拉:', $scope.eleProgrammeItem)
    })
    .finally(function() {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      if($scope.eleProgrammeItem.length < 15) {
        $scope.More = false
      } else {
        $scope.More = true
      }
    })
  }

  $scope.doRefresh()
})

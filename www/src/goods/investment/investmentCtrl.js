angular.module('Investment', [])

.controller('InvestmentCtrl', function ($scope, getDataService, goodsService, $ionicScrollDelegate) {

  // 设置请求传输的数据
  var params = {id: 0, catid: 73, dateformat: 1}
  $scope.More = false

  // 回到页面的顶端
  $scope.scrollTop = function() {
    $ionicScrollDelegate.$getByHandle('InvestSrcoll').scrollTop(true)
  }

  // 在ion-content计算页面滚动的距离
  $scope.investToTopScroll = function(data){
    $scope.isGoTopInvest = $ionicScrollDelegate.$getByHandle('InvestSrcoll').getScrollPosition().top>1000?true:false
    $scope.$apply()
  }

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.investmentListItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.investmentListItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getGoodsItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.investmentListItem, data)
      console.log('上拉:', $scope.investmentListItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  $scope.doRefresh = function () {
    // 重新定义
    params.id = 0
    getDataService.getGoodsItem(params).then(function (data) {
      $scope.investmentListItem = data
      console.log('下拉:', $scope.investmentListItem)
    })
    .finally(function () {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      $scope.More = true
    })
  }

  $scope.doRefresh()

})

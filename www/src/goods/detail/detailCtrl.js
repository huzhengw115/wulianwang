angular.module('Goods', [])

.controller('GoodsDetailCtrl', function ($scope, $stateParams, getDataService) {
  
  // 获取ID值
  var pageId = $stateParams.goodsId
  console.log("本页面的ID值是：", pageId)
  // 设置关注与否,应该是在页面进入的时候先判断是否登录，然后是否已经关注
  $scope.isFollow = true
  $scope.goFollow = function () {
    $scope.isFollow = !$scope.isFollow
  }

  $scope.isFollow = true
  $scope.goFollow = function () {
    $scope.isFollow = !$scope.isFollow
  }

  // 详情页面的数据获取
  getDataService.getGoodsDetail(pageId).then(function (data) {
    $scope.goodsDetailData = data
    $scope.tags = data.tags
    console.log('$scope.goodsDetailData:', $scope.goodsDetailData)
  })
  .finally(function () {
    var params = {
      keyword: $scope.tags[0].name,
      id: $scope.goodsDetailData.id,
      limitnum: 3,
      dateformat: 1
    }
    console.log(params)
    // 热门推荐的数据获取
    getDataService.getGoodsItem(params).then(function (data) {
      $scope.goodsDetailHotData = data
      console.log('$scope.goodsDetailHotData:', $scope.goodsDetailHotData)
    })
  })

})

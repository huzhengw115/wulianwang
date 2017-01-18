angular.module('Detail', [])

.controller('PageCtrl', function ($scope, $stateParams, getDataService) {
  // 获取ID值
  var pageId = $stateParams.pageId
  console.log("本页面的ID值是：", pageId)
  // 设置关注与否,应该是在页面进入的时候先判断是否登录，然后是否已经关注
  $scope.isFollow = true
  $scope.goFollow = function () {
    $scope.isFollow = !$scope.isFollow
  }

  // 详情页面的数据获取
  getDataService.getNewsDetail(pageId).then(function (data) {
    $scope.pageData = data
    $scope.tags = data.tags
    console.log('$scope.pageData:', $scope.pageData)
  })
  .finally(function () {
    var params = {
      keyword: $scope.tags[0].name,
      id: $scope.pageData.id,
      limitnum: 3,
      dateformat: 1
    }
    // 热门推荐的数据获取
    getDataService.getNewsItem(params).then(function (data) {
      $scope.pageHotData = data
      console.log('$scope.pageHotData:', $scope.pageHotData)
    })
  })
  
})
// 页面中链接的问题等做图片放大功能时再去实现

.controller('SpecialPageCtrl', function ($scope, detailService, $stateParams) {
  //获取ID值
  var specialId = $stateParams.specialId
  console.log("本页面的ID值是：", specialId)
  //详情页面的数据获取
  detailService.getPageData().then(function (pageData) {
    $scope.specialData = pageData
    console.log('$scope.specialData:', $scope.specialData)
  })
  // 热门推荐的数据获取
  detailService.getPageHotData().then(function (pageHotData) {
    $scope.pageHotData = pageHotData
    console.log('$scope.pageHotData:', $scope.pageHotData)
  })
})
angular.module('Detail', [])

.controller('PageCtrl', function ($scope, detailService, $stateParams) {
  //获取ID值
  var pageId = $stateParams.pageId
  console.log("本页面的ID值是：", pageId)
  //详情页面的数据获取
  detailService.getPageData().then(function (pageData) {
    $scope.pageData = pageData
    $scope.tags = pageData.tags
    console.log('$scope.pageData:', $scope.pageData)
  })
  // 热门推荐的数据获取
  detailService.getPageHotData().then(function (pageHotData) {
    $scope.pageHotData = pageHotData
    console.log('$scope.pageHotData:', $scope.pageHotData)
  })
})

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
angular.module('Home', [])

.controller('DetailPageCtrl', function ($scope, pageService, $stateParams, swipeService, $timeout) {
  //获得详情页的id值
  var detailId = $stateParams.detailPageId
  console.log('detailId:',detailId)
  //获取详情页的数据
  var getDetailData = function (detailId) {
    pageService.getDetailData(detailId).then(function (detailData) {
      $scope.detailData = detailData
      console.log('detailData:',detailData)
      // $timeout(function() {
      //   swipeService.databigpic
      // }, 500)
      swipeService.photoswipe()
    })
  }
  //获取热点的数据
  var getDetailHotData = function () {
    pageService.getDetailHotData().then(function (detailHotData) {
      $scope.detailHotData = detailHotData
      console.log('detailHotData:',detailHotData)
    })
  }
  getDetailData(detailId)
  getDetailHotData()
})

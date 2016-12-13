angular.module('Read', [])

.controller('ReadCtrl', function ($scope, readService) {
  //热门标签的获取
  $scope.getHotTab = function () {
    readService.getHotTab().then(function (hotTab) {
      $scope.readHotTab = hotTab
      console.log('readHotTab:',$scope.readHotTab)
    })
  }
  //搜索标签的获取
  $scope.tabChange = function () {
    readService.getSearchTab().then(function (searchTab) {
      $scope.readSearchTab = searchTab
      console.log('readSearchTab:',$scope.readSearchTab)
    })
  }
  //标签的选择
  $scope.addHotTab = function (index) {
    console.log(index)
  }
  $scope.getHotTab()
})

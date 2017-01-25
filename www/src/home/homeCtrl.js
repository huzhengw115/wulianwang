angular.module('Home', [])

.controller('HomeCtrl', function ($scope, $ionicSlideBoxDelegate, homeService, $http, $ocLazyLoad, homeSrcService, getDataService) {

  // params定义
  var params = {dateformat: 1}

  // 获取轮播图片
  var homeTitlePic = function () {
    $scope.ads = homeService.homeBanner
    $ionicSlideBoxDelegate.$getByHandle('home-pic').update()
    $ionicSlideBoxDelegate.$getByHandle('home-pic').loop(true)
    console.log($scope.ads)
  }

  // 列表资讯的获取
  var homeListItem = function () {
    getDataService.getNewsItem(params).then(function (homeItem) {
      $scope.homeItem = homeItem
      console.log('$scope.homeItem: ', $scope.homeItem)
    })
  }

  // 资讯等页面的名称获取
  $scope.homeSrc = homeSrcService.homeSrc

  $scope.doRefresh = function () {
    homeTitlePic()
    homeListItem()
    $scope.$broadcast('scroll.refreshComplete')
  }

  $scope.doRefresh()
})

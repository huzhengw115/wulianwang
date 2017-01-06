angular.module('Home', [])

.controller('HomeCtrl', function ($scope, $ionicSlideBoxDelegate, homeService, $http, $ocLazyLoad, homeSrcService, getDataService) {
  // 获取轮播图片
  var homeTitlePic = function () {
    homeService.homeTitlePic().then(function (homeTitle) {
      $scope.ads = []
      $ionicSlideBoxDelegate.$getByHandle('home-pic').update()
      $scope.ads = homeTitle
      // console.log($scope.ads)
    })
  }

  // 列表资讯的获取
  var homeListItem = function () {
    getDataService.getNewsListItem().then(function (homeItem) {
      $scope.homeItem = homeItem
      // console.log('length: ',$scope.homeItem.length)
    })
  }

  // 资讯等页面的名称获取
  var homeSrc = function () {
    $scope.homeSrc = homeSrcService.homeSrc
    // console.log($scope.homeSrc)
  }
  
  // 类型的样式
  $scope.goods = {'color': '#f00','border': '1px solid #f00'}
  $scope.programme = {'color': '#123456','border': '1px solid #123456'}
  $scope.waiter = {'color': '#33ba66','border': '1px solid #33ba66'}
  $scope.meets = {'color': '#5ff010','border': '1px solid #5ff010'}
  $scope.information = {'color': '#00a0ff','border': '1px solid #00a0ff'}

  $scope.doRefresh = function () {
    // LoaderService.show()
    homeTitlePic()
    homeListItem()
    homeSrc()
    $scope.$broadcast('scroll.refreshComplete')
    // $timeout(function () {
    //   LoaderService.hide()
    // }, 1000)
  }

  $scope.doRefresh()
})

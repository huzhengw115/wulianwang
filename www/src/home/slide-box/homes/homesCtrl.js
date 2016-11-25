angular.module('Homes', [])

.controller('HomesCtrl', function ($scope, homeService, $ionicSlideBoxDelegate, LoaderService, $timeout) {
  // 获取轮播图片
  var homeTitlePic = function () {
    homeService.homeTitlePic().then(function (homeTitle) {
      $scope.ads = []
      $ionicSlideBoxDelegate.$getByHandle('homes-pic').update()
      $scope.ads = homeTitle
      console.log($scope.ads)
    })
  }

  var homeListItem = function () {
    homeService.homeListItem().then(function (homeItem) {
      $scope.homeItem = homeItem
      console.log('length: ',$scope.homeItem.length)
    })
  }
  //类型的样式
  $scope.goods = {'color': '#f00','border': '1px solid #f00'}
  $scope.programme = {'color': '#123456','border': '1px solid #123456'}
  $scope.waiter = {'color': '#33ba66','border': '1px solid #33ba66'}
  $scope.meets = {'color': '#5ff010','border': '1px solid #5ff010'}
  $scope.information = {'color': '#00a0ff','border': '1px solid #00a0ff'}

  $scope.doRefresh = function () {
    // LoaderService.show()
    homeTitlePic()
    homeListItem()
    $scope.$broadcast('scroll.refreshComplete')
    // $timeout(function () {
    //   LoaderService.hide()
    // }, 1000)
  }

  $scope.doRefresh()
})

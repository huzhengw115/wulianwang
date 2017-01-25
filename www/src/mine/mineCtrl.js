angular.module('Mine', [])

.controller('MineCtrl', function ($scope, Local, $ionicPopup, $location, mineService) {
  // 首先检测是否登录
  var loginState = Local.get("loginState")
  console.log('loginState:', loginState)
  // 0为登录，其他就是没有登录
  if (loginState != 0) {
    $scope.isLogin = false
  } else {
    $scope.isLogin = true
    $scope.name = Local.get("mobile")
  }

  $scope.goMine = function (index) {
    if ($scope.isLogin == false) {
      $ionicPopup.alert({
        template: '请先登录'
      })
    } else {
      $location.path(mineService.mineUrl[index])
      console.log(mineService.mineUrl[index])
    }
  }

  $scope.goLogin = function () {
    if ($scope.isLogin == false) {
      $location.path("/tab/login")
    } else {
      console.log('已登录')
    }
  }

  $scope.goLogout = function () {
    mineService.goLogout().then(function (data) {
      location.reload(true)
    })
  }

})

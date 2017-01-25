angular.module('Login', [])

.controller('LoginCtrl', function ($scope, loginService, $location) {

  $scope.goLogin = function (mobile, password) {
    // 首先判断手机号码是否正确
    if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(mobile))) {
      console.log('请输入正确的手机号码')
    } else {
      // 判断密码的长度
      if (password == undefined || password.length < 6) {
        console.log('请输入正确的密码')
      } else {
        var caption = '登录成功，正在跳转'
        loginService.goLogin(mobile, password, caption).then(function (data) {
          $location.path("/tab/mine")
        })
        console.log('please wait a moment')
      }
    }
  }

})

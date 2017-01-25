angular.module('Apply', [])
.controller('ApplyDetailCtrl', function($scope, Local, WeixinShare, getDataService, $stateParams, swipeService, $ionicPopup, loginDetailService) {
  // 检测登录状态
  var loginState = Local.get("loginState")
  console.log('loginState:', loginState)
  var isPopup = false

  var applyId = $stateParams.applyId
  console.log(applyId)
  getDataService.getApplyData(applyId).then(function (data) {
  	$scope.applyData = data
  	$scope.tags = data.tags
  	console.log('$scope.applyData:', $scope.applyData)
  })
  .finally(function () {
    swipeService.photoswipe('main')
    swipeService.clearHref('main')
    if ($scope.applyData.isfocus == 1) {
      $scope.isFollow = true
    }
    // 分享
    WeixinShare.wxShare($scope.pageData.title, 'img/WLWlogo.png')
  })

  $scope.goFollow = function () {
    // 首先判断是否登录
    if (loginState == 0) {
      // 传值
      var params = {id: applyId, catid: 98}
      $scope.isFollow = !$scope.isFollow
      getDataService.waiterFollow(myFollowId).then(function (data) {
        console.log('success')
      })
    } else {
      console.log('请先登录')
      isPopup = true
      $scope.myPopup = $ionicPopup.show({
        // title: '<p style="color: #00a0ff !important;">请先登录</p>',
        templateUrl: 'src/userTemlate/login.html',
        scope: $scope
      })
    }
  }

  // 关闭弹出窗口
  $scope.goCancel = function () {
    $scope.mobileFalse = false
    $scope.passwordFalse = false
    isPopup = false
    console.log('关闭')
    $scope.myPopup.close()
  }

  // 登录
  $scope.goLogin = function (mobile, password) {
    if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(mobile))) {
      console.log('请输入正确的手机号码')
      $scope.mobileFalse = true
    } else {
      $scope.mobileFalse = false
      // 判断密码的长度
      if (password == undefined || password.length < 6) {
        console.log('请输入正确的密码')
        $scope.passwordFalse = true
      } else {
        $scope.passwordFalse = false
        var caption = '登录成功，正在跳转'
        loginDetailService.goLogin(mobile, password, caption).then(function (data) {
          $scope.myPopup.close()
          loginState = 0
          $scope.goFollow()
          isPopup = false
        })
        console.log('please wait a moment')
      }
    }
  }

  // 监听页面销毁事件，用来关闭弹出框
  $scope.$on("$destroy", function() {
    //清除配置,不然scroll会重复请求
    console.log('页面跳转啦！！！')
    // 判断是否弹出来了
    if (isPopup == true) {
      $scope.myPopup.close()
    }
  })

})
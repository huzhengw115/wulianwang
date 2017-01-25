angular.module('Goods', [])

.controller('GoodsDetailCtrl', function ($scope, Local, WeixinShare, $stateParams, getDataService, swipeService, $ionicPopup, loginDetailService) {
  
  // 获取ID值
  var pageId = $stateParams.goodsId
  console.log("本页面的ID值是：", pageId)
  // 检测登录状态
  var loginState = Local.get("loginState")
  console.log('loginState:', loginState)
  var isPopup = false

  // 详情页面的数据获取
  getDataService.getGoodsDetail(pageId).then(function (data) {
    $scope.goodsDetailData = data
    $scope.tags = data.tags
    console.log('$scope.goodsDetailData:', $scope.goodsDetailData)
  })
  .finally(function () {
    // 图片的插件，将页面中的main标签这种的图片选中
    swipeService.photoswipe('main')
    // 去掉页面当中不必要的链接
    swipeService.clearHref('main')

    var params = {
      tagid: $scope.tags[0].id,
      id: $scope.goodsDetailData.id,
      limitnum: 3,
      dateformat: 1
    }
    console.log('params:', params)
    // 热门推荐的数据获取
    getDataService.getGoodsItem(params).then(function (data) {
      $scope.goodsDetailHotData = data
      console.log('$scope.goodsDetailHotData:', $scope.goodsDetailHotData)
    })
    console.log('关注：', $scope.goodsDetailData.isfocus)
    if ($scope.goodsDetailData.isfocus == 1) {
      $scope.isFollow = true
    }
    // 分享
    WeixinShare.wxShare($scope.goodsDetailData.title)
  })

  $scope.goFollow = function () {
    // 首先判断是否登录
    if (loginState == 0) {
      // 传值
      var myFollowId = {id: pageId}
      $scope.isFollow = !$scope.isFollow
      getDataService.goodsFollow(myFollowId).then(function (data) {
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

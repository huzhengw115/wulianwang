angular.module('Programme', [])

.controller('ProgrammeDetailCtrl', function ($timeout, Local, WeixinShare, $scope, programmeService, $stateParams, getDataService, $ionicPopup, swipeService, loginDetailService) {
  $scope.projectData = []
  $scope.openButton = true
  $scope.tableTitle = programmeService.tableTitle[0]
  // 检测登录状态
  var loginState = Local.get("loginState")
  console.log('loginState:', loginState)
  var isPopup = false

  //获取ID
  var programmeId = $stateParams.programmeId
  console.log('本页面的ID值是：', programmeId)

  //读取数据
  var getProjectData = function () {
    //页面加载前的动画
    //LoaderService.show()
    //调用获取数据的方法
    getDataService.getProgrammeDetail(programmeId).then(function (data) {
      $scope.detailData = data
      $scope.tags = $scope.detailData.tags
      console.log('$scope.detailData.tags:',$scope.detailData.tags)
      console.log('$scope.detailData:',$scope.detailData)
      //图片插件
      //swipeService.photoswipe()
      //分享
      //WeixinShare.wxShare($scope.newsData.title, $scope.picture, '#/tab/special/' + newsId, 'desc')
    })
    .finally(function () {
      swipeService.photoswipe('main')
      swipeService.clearHref('main')
      var params = {
        id: programmeId,
        limitnum: 3,
        dateformat: 1,
        tagid: $scope.tags[0].id
      }
      console.log('params:', params)
      // 热门推荐数据获取
      getDataService.getProgrammeItem(params).then(function (data) {
        $scope.projectHotData = data
      })
      if ($scope.detailData.isfocus == 1) {
        $scope.isFollow = true
      }
      // 分享
      WeixinShare.wxShare($scope.detailData.title)
    })
  }

  $scope.goFollow = function () {
    // 首先判断是否登录
    if (loginState == 0) {
      // 传值
      var myFollowId = {id: programmeId}
      $scope.isFollow = !$scope.isFollow
      getDataService.programmeFollow(myFollowId).then(function (data) {
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

  //点击表格时放大表格中的内容
  $scope.showTable = function (title,data) {
    console.log(data)
    if(data.length > 9) {
      $scope.isShow = true
      $scope.titleShow = title
      $scope.tableShow = data
      console.log($scope.tableShow)
      //放大的表格是ng-if控制，所以控制html先出现画面再加载动画
      $timeout(function() {
        $scope.isTableShow = !$scope.isTableShow
      }, 0)
    }
  }

  //点击放大后表格来关闭它
  $scope.hideTable = function () {
    $scope.isShow = false
    $scope.isTableShow = !$scope.isTableShow
  }

  //点击表格下方的开关来控制表格的伸缩
  $scope.toBeLong = function () {
    $scope.projectTable = !$scope.projectTable
    $scope.openButton = !$scope.openButton
    $scope.closeButton = !$scope.closeButton
  }

  getProjectData()

})
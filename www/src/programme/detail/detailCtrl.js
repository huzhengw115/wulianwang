angular.module('Programme', [])

.controller('ProgrammeDetailCtrl', function ($timeout, $scope, programmeService, $stateParams) {
  $scope.projectData = []
  $scope.openButton = true
  $scope.tableTitle = programmeService.tableTitle[0]

  //读取数据
  var getProjectData = function () {
    //获取ID
    var programmeId = $stateParams.programmeId
    console.log('本页面的ID值是：', programmeId)
    //页面加载前的动画
    //LoaderService.show()
    //调用获取数据的方法
    programmeService.getDetailData().then(function (detailData) {
      $scope.detailData = detailData
      $scope.tags = detailData.tags
      console.log('$scope.detailData.tags:',$scope.detailData.tags)
      console.log('$scope.detailData:',$scope.detailData)
      //图片插件
      //swipeService.photoswipe()
      //分享
      //WeixinShare.wxShare($scope.newsData.title, $scope.picture, '#/tab/special/' + newsId, 'desc')
    })
    .finally(function () {
      //关闭加载动画
      //LoaderService.hide()
    })
  }

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
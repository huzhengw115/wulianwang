angular.module('MyRead', [])

.controller('MyReadCtrl', function ($scope, myReadService, $ionicSlideBoxDelegate, $document, $ionicScrollDelegate, getDataService) {
  
  // 设置关键字
  var params = {keyword : '', id: 0}
  // 一开始关闭上拉
  $scope.More = false
  // 首先默认设置搜索的类型为资讯
  $scope.classIndex = 0
  // 第一的时候没有宽度存在下面的方法可能出现错误
  var firstId = 0

  // 获取订阅的标签
  myReadService.getMyTab().then(function (data) {
    $scope.myTab = data
    $ionicSlideBoxDelegate.update()
    console.log('myTab:', $scope.myTab)
    // $scope.slectIndex = 0
    $scope.activeSlide(0)
  })

  // 点击上方的tab时触发
  $scope.activeSlide = function (index) {
    $scope.slectIndex = index
    $ionicSlideBoxDelegate.slide(0)
    if(firstId == 0) {
      // 第一次是资讯
      params.keyword = $scope.myTab[0].title
      // 之后都用下面的方法
      firstId = 1
      getFindData()
    } else {
      // 获取屏幕的宽度
      var screenWidth = screen.width
      // 选中的tab的id值
      var tabId = "tab-default-" + index
      // tab到屏幕左端的距离
      var scrollLeft = $document[0].getElementById(tabId).offsetLeft
      console.log('tab到屏幕左端的距离:', scrollLeft)
      // tab本身的宽度
      var tabWidth = $document[0].getElementById(tabId).offsetWidth
      console.log('tab本身的宽度:', tabWidth)

      // 距离左端小于等于屏幕的一半，不动，距离大于屏幕的一半，移动距离减去屏幕一半的值
      if(scrollLeft <= screenWidth / 2) {
        $ionicScrollDelegate.scrollTo(0, 0, true)
      } else {
        $ionicScrollDelegate.scrollTo(scrollLeft - screenWidth / 2 + tabWidth / 2, 0, true)
      }

      // 取到选中的标签，并将其赋值给params
      params.keyword = $scope.myTab[index].title
      console.log('选中的标签：', params.keyword)
      getFindData()
    }
  }

  // 点击上面的类型转换下面的搜索结果
  $scope.myReadFindclass = function (index) {
    $scope.classIndex = index
    var findClass = ['资讯', '方案', '商机']
    console.log('搜索的类型：', findClass[index])
    getFindData(params, index)
    // 使用什么模板
    $scope.classIndex = index
  }

  // 上拉加载
  $scope.loadMore = function () {
    var dataLength = $scope.findData.length - 1
    params.id = $scope.findData[dataLength].id
    getDataService.getNewsListItem(params, $scope.classIndex).then(function (data) {
      Array.prototype.push.apply($scope.findData, data)
      console.log('上拉:', $scope.findData)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
      if(data.length < 15) {
        $scope.More = false
      }
    })
  }

  // 数据的获取
  function getFindData () {
    // 根据选中的标签进行搜索
    getDataService.getNewsListItem(params, $scope.classIndex).then(function (data) {
      $scope.findData = data
      console.log('搜索到的结果：', $scope.findData)
    })
    .finally(function () {
      if($scope.findData.length < 15) {
        $scope.More = false
        console.log('到底是什么：', $scope.More)
      } else {
        $scope.More = true
        console.log('到底是什么：', $scope.More)
      }
    })
  }

})

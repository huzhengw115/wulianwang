angular.module('MyRead', [])

.controller('MyReadCtrl', function ($scope, $timeout, myReadService, $ionicSlideBoxDelegate, $document, $ionicScrollDelegate, getDataService) {
  
  // 设置关键字
  var params = {keyword : '', id: 0}
  // 一开始关闭上拉
  $scope.More = false
  // 首先默认设置搜索的类型为资讯
  $scope.classIndex = 0

  // 获取订阅的标签
  myReadService.getMyTab().then(function (data) {
    $scope.myTab = data
    $ionicSlideBoxDelegate.update()
    console.log('myTab:', $scope.myTab)
    // $scope.slectIndex = 0
    $scope.activeSlide(0)
  })

  // 点击上方的tab时触发
  $scope.activeSlide = function (index) {// 点击时候触发
    $scope.slectIndex = index
    $ionicSlideBoxDelegate.slide(index)
    var firstId = 0
    if(firstId == 0) {
      params.keyword = $scope.myTab[0].title
      getFindData()
      firstId = 1
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

  // 滑动时候触发
  $scope.slideChanged = function (index) {

    // 最开始要知道选中了什么标签，根据index在data中进行遍历
    // 首先是获取到所有的订阅标签，然后根据标签去进行搜索
    // 搜索的时候共三个页面：资讯、方案、商机，分成三次进行搜索

    // 控制上面的tab变化
    $scope.slectIndex = index
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

  // 上拉加载
  $scope.loadMore = function () {
    var dataLength = $scope.findData.length - 1
    params.id = $scope.findData[dataLength].id
    getDataService.getNewsListItem(params, $scope.classIndex).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.findData, data)
      console.log('上拉:', $scope.findData)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // 数据的获取
  function getFindData () {
    // 根据选中的标签进行搜索
    getDataService.getNewsListItem(params, $scope.classIndex).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      $scope.findData = data
      console.log('搜索到的结果：', $scope.findData)
    })
    .finally(function () {
      $timeout(function () {
        $scope.More = true
      }, 500)
    })
  }

})

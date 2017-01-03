angular.module('MyRead', [])

.controller('MyReadCtrl', function ($scope, myReadService, $ionicSlideBoxDelegate, $document, $ionicScrollDelegate) {
  // 获取订阅的标签
  myReadService.getMyTab().then(function (data) {
    $scope.myTab = data
    $ionicSlideBoxDelegate.update()
    console.log('myTab:', $scope.myTab)
  })

  // 点击时候触发
  $scope.activeSlide = function (index) {//点击时候触发
    $scope.slectIndex = index
    $ionicSlideBoxDelegate.slide(index)
  }

  // 滑动时候触发
  $scope.slideChanged = function (index) {
    $scope.slectIndex = index
    // console.log(index)
    // 获取屏幕的宽度
    var screenWidth = screen.width
    // id值
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
  }


  //$scope.slectIndex = 0
  $scope.activeSlide(0)
})

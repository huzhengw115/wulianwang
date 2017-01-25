angular.module('MyInter', [])

.controller('MyInterCtrl', function ($scope, homeViewUrl, $ionicSlideBoxDelegate, $ocLazyLoad) {
  
  var myInterView = homeViewUrl.myInterView
  var myInterFile = homeViewUrl.myInterFile

  $scope.slideChanged = function (index) {
    $scope.slectIndex = index
    $ocLazyLoad.load(myInterFile[index]).then( function() {
      switch (index) {
        case 0:
          {
            $scope.information = myInterView[index]
          }
          break
        case 1:
          {
            $scope.programme = myInterView[index]
          }
          break
        case 2:
          {
            $scope.goods = myInterView[index]
          }
          break
        case 3:
          {
            $scope.waiter = myInterView[index]
          }
          break
        default:
          break
      }
    })
    $scope.slideIndex = index
  }

  // 点击上面的tabs切换，响应下面的滑块滑动
  $scope.myInterSlide = function (index) {
    $ionicSlideBoxDelegate.slide(index)
    console.log(index)
  }

  $scope.slideChanged(0)

})

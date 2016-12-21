angular.module('Information', [])

.controller('InformationCtrl', function ($scope, homeViewUrl, informationService, $ionicSlideBoxDelegate, $ocLazyLoad) {
  
  //滑动框初始设定(不能设定初始值，因为初始设定之后ctrl和css不能引入)
  //$scope.slideIndex = 0;
  //取到视图、js、css
  var informationView = homeViewUrl.informationView
  var informationFile = homeViewUrl.informationFile
  //slide-box的标题获取informationTitle
  $scope.informationTitle = informationService.informationTitle
  console.log('informationTitle:', $scope.informationTitle)

  //滑动下面的滑块，响应上面的tabs切换
  $scope.slideChanged = function (index) {
    $ocLazyLoad.load(informationFile[index]).then( function() {
      //根据不同的模板名字加载不同的视图
      switch (index) {
        case 0:
          {
            $scope.information = informationView[index]
          }
          break
        case 1:
          {
            $scope.policy = informationView[index]
          }
          break
        case 2:
          {
            $scope.idea = informationView[index]
          }
          break
        case 3:
          {
            $scope.special = informationView[index]
          }
          break
        case 4:
          {
            $scope.shop = informationView[index]
          }
          break
        default:
          break
      }
    })
    $scope.slideIndex = index
  }

  //点击上面的tabs切换，响应下面的滑块滑动
  $scope.informationSlide = function (index) {  
    $ionicSlideBoxDelegate.slide(index)
    console.log(index)
  }

  //定义初始值为0
  $scope.slideChanged(0)

})

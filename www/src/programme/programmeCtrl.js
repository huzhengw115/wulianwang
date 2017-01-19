angular.module('Programme', [])

.controller('ProgrammeCtrl', function ($scope, homeViewUrl, $ionicSlideBoxDelegate, $ocLazyLoad) {
  
  //滑动框初始设定(不能设定初始值，因为初始设定之后ctrl和css不能引入)
  //$scope.slideIndex = 0;
  //取到视图等文件
  var programmeView = homeViewUrl.programmeView
  var programmeFile = homeViewUrl.programmeFile

  //slide-box的标题获取informationTitle
  //$scope.informationTitle = informationService.informationTitle
  //console.log('informationTitle:', $scope.informationTitle)

  //滑动下面的滑块，响应上面的tabs切换
  $scope.slideChanged = function (index) {
    $scope.slectIndex = index
    $ocLazyLoad.load(programmeFile[index]).then( function() {
      //根据不同的模板名字加载不同的视图
      switch (index) {
        case 0:
          {
            $scope.new = programmeView[index]
          }
          break
        case 1:
          {
            $scope.hot = programmeView[index]
          }
          break
        case 2:
          {
            $scope.ele = programmeView[index]
          }
          break
        default:
          break
      }
    })
    $scope.slideIndex = index
  }

  //点击上面的tabs切换，响应下面的滑块滑动
  $scope.programmeSlide = function (index) {  
    $ionicSlideBoxDelegate.slide(index)
    console.log(index)
  }

  //定义初始值为0
  $scope.slideChanged(0)

})

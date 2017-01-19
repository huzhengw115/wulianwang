angular.module('Information', [])

.controller('InformationCtrl', function ($scope, homeViewUrl, $ionicSlideBoxDelegate, $ocLazyLoad) {
  
  // 滑动框初始设定(不能设定初始值，因为初始设定之后ctrl和css不能引入)
  // $scope.slideIndex = 0;
  // 取到视图、js、css
  var informationView = homeViewUrl.informationView
  var informationFile = homeViewUrl.informationFile

  // 滑动下面的滑块，响应上面的tabs切换
  $scope.slideChanged = function (index) {
    // 选中上面的标题
    $scope.slectIndex = index
    $ocLazyLoad.load(informationFile[index]).then( function() {
      // 根据不同的模板名字加载不同的视图
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
            $scope.shop = informationView[index]
          }
          break
        default:
          break
      }
    })
    $scope.slideIndex = index
  }

  // 点击上面的tabs切换，响应下面的滑块滑动
  $scope.informationSlide = function (index) {
    $ionicSlideBoxDelegate.slide(index)
    console.log(index)
  }

  // 点击叉叉清空搜索框
  $scope.clearSearch = function () {
    $scope.keyWord = ''
  }

  // 根据关键字进行搜索
  $scope.toSearch = function (data) {
    // 首先判断搜索的关键字是否为空
    if (data == undefined) {
      console.log('搜索的关键字为空')
    } else {
      // 向子级控制器传递搜索的关键字
      $scope.$broadcast('to-child', data)
    }
  }

  // 向子级传递fix定位的按钮显示与否，0不显示，1显示
  $scope.displayButton = function (number) {
    $scope.$broadcast('display', number)
  }

  // 定义初始值为0
  $scope.slideChanged(0)

})

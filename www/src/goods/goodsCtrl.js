angular.module('Goods', [])

.controller('GoodsCtrl', function ($scope, homeViewUrl, $ionicSlideBoxDelegate, $ocLazyLoad) {
  
  //滑动框初始设定(不能设定初始值，因为初始设定之后ctrl和css不能引入)
  //$scope.slideIndex = 0;
  //取到视图等文件
  var goodsView = homeViewUrl.goodsView
  var goodsFile = homeViewUrl.goodsFile

  //slide-box的标题获取informationTitle
  //$scope.informationTitle = informationService.informationTitle
  //console.log('informationTitle:', $scope.informationTitle)

  //滑动下面的滑块，响应上面的tabs切换
  $scope.slideChanged = function (index) {
    $ocLazyLoad.load(goodsFile[index]).then( function() {
      //根据不同的模板名字加载不同的视图
      switch (index) {
        case 0:
          {
            $scope.all = goodsView[index]
          }
          break
        case 1:
          {
            $scope.new = goodsView[index]
          }
          break
        case 2:
          {
            $scope.hot = goodsView[index]
          }
          break
        case 3:
          {
            $scope.ele = goodsView[index]
          }
          break
        default:
          break
      }
    })
    $scope.slideIndex = index
  }

  //点击上面的tabs切换，响应下面的滑块滑动
  $scope.goodsSlide = function (index) {  
    $ionicSlideBoxDelegate.slide(index)
    console.log(index)
  }

  //定义初始值为0
  $scope.slideChanged(0)

})

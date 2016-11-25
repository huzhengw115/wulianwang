angular.module('Home', [])

.controller('HomeCtrl', function ($scope, $ionicSlideBoxDelegate, homeService, $http, $ocLazyLoad, homeViewUrl) {
  // 设置slide-box的index值为0
  // $scope.slideIndex = 0;
  // 设置资讯页二级栏目的模板序号为第一项
  $scope.informationTab = 0
  // 设置方案页二级栏目的模板序号为第一项
  $scope.programmeTab = 0
  // 设置商机页二级栏目的模板序号为第一项
  $scope.goodsTab = 0
  // 设置资讯页二级栏目相应的视图
  var informationView = homeViewUrl.informationView
  // 设置方案页二级栏目相应的视图
  var programmeView = homeViewUrl.programmeView
  // 设置商机页二级栏目相应的视图
  var goodsView = homeViewUrl.goodsView
  // 设置slide-bo从0-5的相应视图url
  var homeTemplate = homeViewUrl.homeTemplate
  // $scope.homes = homeTemplate[0];
  // 设置首页slide-tab的初始值
  // $scope.information = homeTemplate[0];
  // 监听二级栏目切换
  $scope.$on('to-parent', function (event, data) {
    if (data < 5) {
      $scope.informationTab = data
          // console.log("二级栏目：", $scope.informationTab);
      $scope.slideChanged(1)
      console.log('资讯二级栏目', $scope.informationTab)
    } else if (data >= 5 && data < 9) {
      $scope.programmeTab = (data - 5)
          // console.log("二级栏目：", $scope.informationTab);
      $scope.slideChanged(2)
      console.log('方案二级栏目', $scope.programmeTab)
    } else {
      $scope.goodsTab = (data - 9)
      $scope.slideChanged(3)
      console.log('商机二级栏目', $scope.goodsTab)
    }
  })
  // 滑动页面加载相应的controller和css
  $scope.slideChanged = function (index) {
    switch (index) {
      case 0:
        {
          $ocLazyLoad.load([homeViewUrl.homesFile]).then(function () {
            $scope.homes = homeTemplate[index]
            $scope.slideIndex = index
            console.log('index: ', index)
          })
        }
        break
      case 1:
        {
          $ocLazyLoad.load('src/home/slide-box/information/tabSelect/tabSelect.css')
          var informationFile = homeViewUrl.informationFile
          $ocLazyLoad.load(informationFile[$scope.informationTab]).then(function () {
            $scope.information = informationView[$scope.informationTab]
            $scope.slideIndex = index
          })
        }
        break
      case 2:
        {
          var programmeFile = homeViewUrl.programmeFile
          $ocLazyLoad.load(programmeFile[$scope.programmeTab]).then(function () {
            $scope.programme = programmeView[$scope.programmeTab]
            $scope.slideIndex = index
          })
        }
        break
      case 3:
        {
          var goodsFile = homeViewUrl.goodsFile
          $ocLazyLoad.load(goodsFile[$scope.goodsTab]).then(function () {
            $scope.goods = goodsView[$scope.goodsTab]
            $scope.slideIndex = index
          })
        }
        break
      case 4:
        {
          $ocLazyLoad.load(homeViewUrl.meetsFile).then(function () {
            $scope.meets = homeTemplate[index]
            $scope.slideIndex = index
            console.log('index: ', index)
          })
        }
        break
      case 5:
        {
          $ocLazyLoad.load(homeViewUrl.waiterFile).then(function () {
            $scope.waiter = homeTemplate[index]
            $scope.slideIndex = index
            console.log('index: ', index)
          })
        }
        break
      default:
        break
    }
  }
  // 点击上面的tab进行页面的切换
  $scope.activeSlide = function (index) {
    $ionicSlideBoxDelegate.slide(index)
  }
  // 第一次加载的时候出现问题，加载不了homes.html，解决不了之后强行加上了这行代码
  $scope.slideChanged(0)
})

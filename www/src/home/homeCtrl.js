angular.module('Home', [])

.controller('HomeCtrl', function ($scope, $ionicSlideBoxDelegate, homeService, $http, $ocLazyLoad) {
    // 设置slide-box的index值为0
    // $scope.slideIndex = 0;
    // 设置二级栏目的模板序号
  $scope.informationTab = 0
  $scope.programmeTab = 0
  $scope.goodsTab = 0

    // 设置资讯页二级栏目相应的视图
  var informationView = ['src/home/slide-box/information/hots/hots.html',
      'src/home/slide-box/information/policy/policy.html',
      'src/home/slide-box/information/idea/idea.html',
      'src/home/slide-box/information/special/special.html',
      'src/home/slide-box/information/shop/shop.html'
    ]

    // 设置方案页二级栏目相应的视图
  var programmeView = ['src/home/slide-box/programme/allProgramme/allProgramme.html',
      'src/home/slide-box/programme/newProgramme/newProgramme.html',
      'src/home/slide-box/programme/hotProgramme/hotProgramme.html',
      'src/home/slide-box/programme/eleProgramme/eleProgramme.html'
    ]

    // 设置商机页二级栏目相应的视图
  var goodsView = ['src/home/slide-box/goods/tender/tender.html',
      'src/home/slide-box/goods/investment/investment.html',
      'src/home/slide-box/goods/bids/bids.html'
    ]

    // 设置slide-bo从0-5的相应视图url
  var homeTemplate = ['src/home/slide-box/homes/homes.html',
        'src/home/slide-box/information/hots/hots.html',
        'src/home/slide-box/programme/hotProgramme/hotProgramme.html',
        'src/home/slide-box/goods/tender/tender.html',
        'src/home/slide-box/meets/meets.html',
        'src/home/slide-box/waiter/waiter.html'
      ]
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
          $ocLazyLoad.load(['src/home/slide-box/homes/homesCtrl.js', 'src/home/slide-box/homes/homes.css']).then(function () {
            $scope.homes = homeTemplate[index]
            $scope.slideIndex = index
            console.log('index: ', index)
          })
        }
        break
      case 1:
        {
          $ocLazyLoad.load('src/home/slide-box/information/tabSelect/tabSelect.css')
          switch ($scope.informationTab) {
            case 0:
              {
                $ocLazyLoad.load(['src/home/slide-box/information/hots/hotsCtrl.js', 'src/home/slide-box/information/hots/hots.css', 'src/home/slide-box/information/optionSelect/optionSelectCtrl.js']).then(function () {
                  $scope.information = informationView[$scope.informationTab]
                  $scope.slideIndex = index
                      // console.log(homeTemplate[index])
                })
              }
              break
            case 1:
              {
                $ocLazyLoad.load(['src/home/slide-box/information/policy/policyCtrl.js', 'src/home/slide-box/information/policy/policy.css']).then(function () {
                  $scope.information = informationView[$scope.informationTab]
                  $scope.slideIndex = index
                })
              }
              break
            case 2:
              {
                $ocLazyLoad.load(['src/home/slide-box/information/idea/ideaCtrl.js', 'src/home/slide-box/information/idea/idea.css']).then(function () {
                  $scope.information = informationView[$scope.informationTab]
                  $scope.slideIndex = index
                })
              }
              break
            case 3:
              {
                $ocLazyLoad.load(['src/home/slide-box/information/special/specialCtrl.js', 'src/home/slide-box/information/special/special.css']).then(function () {
                  $scope.information = informationView[$scope.informationTab]
                  $scope.slideIndex = index
                })
              }
              break
            case 4:
              {
                $ocLazyLoad.load(['src/home/slide-box/information/shop/shopCtrl.js', 'src/home/slide-box/information/shop/shop.css']).then(function () {
                  $scope.information = informationView[$scope.informationTab]
                  $scope.slideIndex = index
                })
              }
              break
            default:
              break
          }
          console.log('index: ', index)
        }
        break
      case 2:
        {
          switch ($scope.programmeTab) {
            case 0:
              {
                $ocLazyLoad.load(['src/home/slide-box/programme/allProgramme/allProgrammeCtrl.js', 'src/home/slide-box/programme/allProgramme/allProgramme.css']).then(function () {
                  $scope.programme = programmeView[$scope.programmeTab]
                  $scope.slideIndex = index
                      // console.log(homeTemplate[index])
                })
              }
              break
            case 1:
              {
                $ocLazyLoad.load(['src/home/slide-box/programme/newProgramme/newProgrammeCtrl.js', 'src/home/slide-box/programme/newProgramme/newProgramme.css']).then(function () {
                  $scope.programme = programmeView[$scope.programmeTab]
                  $scope.slideIndex = index
                })
              }
              break
            case 2:
              {
                $ocLazyLoad.load(['src/home/slide-box/programme/hotProgramme/hotProgrammeCtrl.js', 'src/home/slide-box/programme/hotProgramme/hotProgramme.css']).then(function () {
                  $scope.programme = programmeView[$scope.programmeTab]
                  $scope.slideIndex = index
                })
              }
              break
            case 3:
              {
                $ocLazyLoad.load(['src/home/slide-box/programme/eleProgramme/eleProgrammeCtrl.js', 'src/home/slide-box//programme/eleProgramme/eleProgramme.css']).then(function () {
                  $scope.programme = programmeView[$scope.programmeTab]
                  $scope.slideIndex = index
                })
              }
              break
            default:
              break
          }
          console.log('index: ', index)
        }
        break
      case 3:
        {
          switch ($scope.goodsTab) {
            case 0:
              {
                $ocLazyLoad.load(['src/home/slide-box/goods/tender/tenderCtrl.js', 'src/home/slide-box/goods/tender/tender.css']).then(function () {
                  $scope.goods = goodsView[$scope.goodsTab]
                  $scope.slideIndex = index
                      // console.log(homeTemplate[index])
                })
              }
              break
            case 1:
              {
                $ocLazyLoad.load(['src/home/slide-box/goods/investment/investmentCtrl.js', 'src/home/slide-box/goods/investment/investment.css']).then(function () {
                  $scope.goods = goodsView[$scope.goodsTab]
                  $scope.slideIndex = index
                })
              }
              break
            case 2:
              {
                $ocLazyLoad.load(['src/home/slide-box/goods/bids/bidsCtrl.js', 'src/home/slide-box/goods/bids/bids.css']).then(function () {
                  $scope.goods = goodsView[$scope.goodsTab]
                  $scope.slideIndex = index
                })
              }
              break
            default:
              break
          }
          console.log('index: ', index)
        }
        break
      case 4:
        {
          $ocLazyLoad.load(['src/home/slide-box/meets/meetsCtrl.js', 'src/home/slide-box/meets/meets.css']).then(function () {
            $scope.meets = homeTemplate[index]
            $scope.slideIndex = index
            console.log('index: ', index)
          })
        }
        break
      case 5:
        {
          $ocLazyLoad.load(['src/home/slide-box/waiter/waiterCtrl.js', 'src/home/slide-box/waiter/waiter.css']).then(function () {
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
  $scope.slideChanged(1)
})

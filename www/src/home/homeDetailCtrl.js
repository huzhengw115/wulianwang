angular.module('Home', [])

.controller('HomeDetailCtrl', function ($scope, $stateParams, $ocLazyLoad, homeViewUrl) {
  //获取首页点击的链接的id
  var homeId = Number($stateParams.homeId)
  console.log('homeId:', homeId)
  // 设置首页从0-7的相应视图url
  var homeTemplate = homeViewUrl.homeTemplate
  // 设置资讯页二级栏目的模板序号为第一项
  $scope.informationTab = 0
  // 设置方案页二级栏目的模板序号为第一项
  $scope.programmeTab = 0
  // 设置商机页二级栏目的模板序号为第一项
  $scope.goodsTab = 0
  // 设置资讯页二级栏目的视图
  var informationView = homeViewUrl.informationView
  // 设置方案页二级栏目的视图
  var programmeView = homeViewUrl.programmeView
  // 设置商机页二级栏目的视图
  var goodsView = homeViewUrl.goodsView
  // 监听二级栏目切换(0-4为资讯页，5-8为方案页，9-11位为商机页)
  $scope.$on('to-parent', function (event, data) {
    console.log('data:',data)
    if (data < 5) {
      $scope.informationTab = data
      console.log("二级栏目：", $scope.informationTab);
      $scope.homeFileChanged(0)
      console.log('资讯二级栏目', $scope.informationTab)
    } else if (data >= 5 && data < 9) {
      $scope.programmeTab = (data - 5)
          // console.log("二级栏目：", $scope.informationTab);
      $scope.homeFileChanged(1)
      console.log('方案二级栏目', $scope.programmeTab)
    } else {
      $scope.goodsTab = (data - 9)
      $scope.homeFileChanged(2)
      console.log('商机二级栏目', $scope.goodsTab)
    }
  })

  //根据ID值来加载相应的模板
  $scope.homeFileChanged = function (index) {
  	console.log('index: ',index)
  	switch (index) {
  		case 0:
  			{
  				//加载tabSelect的css
  				$ocLazyLoad.load(['src/information/optionSelect/optionSelect.css','src/information/tabSelect/tabSelect.css','src/information/informationService.js']).then(function () {
            //资讯页相应的ctrl和css
            var informationFile = homeViewUrl.informationFile
            //首先根据二级栏目的选项加载相应的ctrl和css
            $ocLazyLoad.load(informationFile[$scope.informationTab]).then(function () {
              //在加载完ctrl和css之后再加载视图
              $scope.homeDetail = informationView[$scope.informationTab]
            })
          })
  			}
  			break
  		case 1:
  			{
          $ocLazyLoad.load(['src/programme/programmeService.js','src/programme/tabSelect/tabSelect.css']).then(function () {
            var programmeFile = homeViewUrl.programmeFile
            $ocLazyLoad.load(programmeFile[$scope.programmeTab]).then(function () {
              $scope.homeDetail = programmeView[$scope.programmeTab]
            })
          })
  			}
  			break
  		case 2:
  			{
          $ocLazyLoad.load(['src/goods/goodsService.js','src/goods/tabSelect/tabSelect.css']).then(function () {
            var goodsFile = homeViewUrl.goodsFile
            $ocLazyLoad.load(goodsFile[$scope.goodsTab]).then(function () {
              $scope.homeDetail = goodsView[$scope.goodsTab]
            })
          })
  			}
  			break
  		case 3:
  			{
          $ocLazyLoad.load(['src/home/homeService.js','src/meets/meetsService.js']).then(function () {
            $ocLazyLoad.load(homeViewUrl.meetsFile).then(function () {
              $scope.homeDetail = homeTemplate[index]
            })
          })
  			}
  			break
  		case 4:
  			{
          $ocLazyLoad.load(['src/home/homeService.js','src/waiter/waiterService.js']).then(function () {
            $ocLazyLoad.load(homeViewUrl.waiterFile).then(function () {
              $scope.homeDetail = homeTemplate[index]
            })
          })
  			}
  			break
  		case 5:
  			{
  				
  			}
  			break
  		case 6:
  			{
  				console.log('推荐')
  			}
  			break
  		case 7:
  			{
  				$ocLazyLoad.load(homeViewUrl.findFile).then(function () {
            $scope.homeDetail = homeTemplate[index]
          })
  			}
  			break
  		default:
        break
  	}
  }

  $scope.homeFileChanged(homeId)
})

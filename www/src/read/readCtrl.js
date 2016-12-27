angular.module('Read', [])

.controller('ReadCtrl', function ($scope, readService) {

  // 设置关键字
  $scope.keyTab = ''
  // 设置推荐‘换一批’按钮的初始状态为静
  $scope.isHotUpdata = false
  // 设置搜索‘换一批’按钮的初始状态为静
  $scope.isSearchUpdata = false
  // 定义我的订阅
  // $scope.readMyTab = []
  // 定义删除标签的id
  var removeId

  // 我的标签的获取
  $scope.getMyTab = function () {
    readService.getMyTab().then(function (myTab) {
      $scope.readMyTab = myTab
      console.log('$scope.readMyTab:', $scope.readMyTab)
    })
  }

  // 推荐标签的获取
  $scope.getHotTab = function () {
    readService.getHotTab().then(function (hotTab) {
      $scope.readHotTab = hotTab
      console.log('hotTab:', hotTab)
    })
    .finally(function () {
      checkTab($scope.readHotTab)
    })
  }

  // 搜索标签的获取
  $scope.toSearch = function () {
    $scope.showSearch = true
    readService.getSearchTab().then(function (searchTab) {
      $scope.readSearchTab = searchTab
      console.log('readSearchTab:', $scope.readSearchTab)
    })
    .finally(function () {
      checkTab($scope.readSearchTab)
    })
  }

  // 检查标签是否被订阅
  var checkTab = function (tab) {
    for(i = 0; i < tab.length; i++) {
      for(m = 0; m < $scope.readMyTab.length; m++) {
        if(tab[i].title == $scope.readMyTab[m].title) {
          tab[i].show = "1"
          break
        } else {
          tab[i].show = "0"
        }
      }
    }
  }

  // input内容变动时执行的函数
  $scope.tabChange = function() {
    // 为空时
    if(!$scope.keyTab.length) {
      $scope.showSearch = false
      checkTab($scope.readHotTab)
    }
  }

  // 清除按钮清除input中的内容
  $scope.clearSearch = function () {
    $scope.keyTab = ''
    $scope.showSearch = false
    checkTab($scope.readHotTab)
  }

  // 推荐搜索标签的选择
  $scope.addTab = function (data,tab) {
    var index = data.id
    var number = data.show

    // 1为选中，0为未选中
    if(number != 1) {
      console.log('id:', index)
      // 1为推荐，0为搜索
      if(tab == 1) {
        $scope.readSearchTab[index].show = "1"
        $scope.readMyTab.push($scope.readSearchTab[index])
      } else {
        $scope.readHotTab[index].show = "1"
        $scope.readMyTab.push($scope.readHotTab[index])
      }
    } else {
      console.log('已选中')
    }
  }

  // 选中我的标签，准备删除用
  $scope.selectTab = function (data) {
    // 给选中的标签一个特殊的样式
    $scope.selectClass = data.id
    removeId = data.id
  }

  // 删除标签
  $scope.removeTab = function () {
    console.log('删除的id：', removeId)
  }

  // 推荐标签换一批
  $scope.updateHotTab = function () {
    // 旋转开始
    $scope.isHotUpdata = true
    // 取得数据之后使旋转停止
    // $scope.isUpdata = false
  }

  // 搜索标签换一批
  $scope.updataSearchTab = function () {
    // 旋转开始
    $scope.isSearchUpdata = true
  }

  // 页面开始时首先加载的标签
  $scope.getMyTab()
  $scope.getHotTab()
})

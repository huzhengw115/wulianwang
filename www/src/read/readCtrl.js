angular.module('Read', [])

.controller('ReadCtrl', function ($scope, readService) {

  // 设置关键字
  $scope.keyTab = ''
  // 设置 推荐 ‘换一批’按钮的初始状态为静
  $scope.isHotUpdata = false
  // 设置 搜索 ‘换一批’按钮的初始状态为静
  $scope.isSearchUpdata = false
  // 定义我的订阅
  // $scope.readMyTab = []
  // 定义删除标签的id
  var removeId
  // 定义删除标签的遍历id
  var removeIndex
  var params = {keyword: '', id: 0}

  // 我的标签的获取
  $scope.getMyTab = function () {
    readService.getMyTab().then(function (myTab) {
      $scope.readMyTab = myTab
      console.log('$scope.readMyTab:', $scope.readMyTab)
    })
  }

  // 推荐标签的获取
  $scope.getHotTab = function () {
    params.keyword = ''
    readService.getTabItem(params).then(function (hotTab) {
      $scope.readHotTab = hotTab
      console.log('hotTab:', hotTab)
      // 取得数据之后使旋转停止
      $scope.isHotUpdata = false
    })
    .finally(function () {
      checkTab($scope.readHotTab)
    })
  }

  // 搜索标签的获取
  $scope.toSearch = function (keyTab) {
    console.log(keyTab)
    $scope.showSearch = true
    params.keyword = keyTab
    readService.getTabItem(params).then(function (searchTab) {
      $scope.readSearchTab = searchTab
      console.log('readSearchTab:', $scope.readSearchTab)
    })
    .finally(function () {
      checkTab($scope.readSearchTab)
    })
  }

  // 检查标签是否被订阅
  function checkTab (tab) {
    console.log($scope.readMyTab.length)
    for(i = 0; i < tab.length; i++) {
      for(m = 0; m < $scope.readMyTab.length; m++) {
        if(tab[i].id == $scope.readMyTab[m].id) {
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
  $scope.addTab = function (data, tab, order) {
    var index = {tid: data.id}
    var number = data.show
    console.log('order:', order)

    // 1为选中，0为未选中
    if(number != 1) {
      console.log('id:', index)
      // 0为推荐，1为搜索
      if (tab == 0) {
        readService.goMyTab(index).then(function (data) {
          console.log('success')
        })
        $scope.readHotTab[order].show = 1
        $scope.readMyTab.push(data)
      } else {
        readService.goMyTab(index).then(function (data) {
          console.log('success')
        })
        $scope.readSearchTab[order].show = 1
        $scope.readMyTab.push(data)
      }
    } else {
      console.log('已选中')
    }
  }

  // 选中我的标签，准备删除用
  $scope.selectTab = function (data, index) {
    // 给选中的标签一个特殊的样式
    $scope.selectClass = data.id
    removeId = data.id
    removeIndex = index
    console.log('选中的标签：', removeId)
  }

  // 删除标签
  $scope.removeTab = function () {
    console.log('删除的id：', removeId)
    var index = {tid: removeId}
    readService.delMyTab(index).then(function (data) {
      console.log('success')
    })
    .finally(function () {
      $scope.readMyTab.splice(removeIndex, 1)
      // 让上面暗下去的标签亮起来
      inspectTab()
    })
  }

  // 删除标签上面的tab亮起来
  function inspectTab () {
    // keyTab.length && showSearch
    console.log($scope.keyTab.length)
    if ($scope.keyTab.length && $scope.showSearch) {
      console.log('现在是搜索时间')
      for(var m = 0; m < $scope.readSearchTab.length; m++) {
        if ($scope.readSearchTab[m].id == removeId) {
          $scope.readSearchTab[m].show = 0
        }
      }
    } else {
      console.log('现在是推荐时间')
      for(var m = 0; m < $scope.readHotTab.length; m++) {
        if ($scope.readHotTab[m].id == removeId) {
          $scope.readHotTab[m].show = 0
        }
      }
    }
  }

  // 推荐标签换一批
  $scope.updateHotTab = function () {
    params.id ++
    // 旋转开始
    $scope.isHotUpdata = true
    $scope.getHotTab()
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

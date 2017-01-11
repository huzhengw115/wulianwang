angular.module('HotProgramme', [])
.controller('HotProgrammeCtrl', function($scope, programmeService, getDataService) {
  
  // 定义筛选项的初始值
  $scope.hotProgrammeIndex = 0
  $scope.More = false
  // 定义params
  var params = {keyword: '', id: 0, catid: 1}

  // 筛选项的点击事件
  $scope.hotProgrammeSelect = function(index) {
    $scope.hotProgrammeIndex = index
    // 选中的标签
    params.keyword = $scope.hotProgrammeTab[index].tab
    $scope.doRefresh()
    console.log('选中的标签：', $scope.hotProgrammeTab[index].tab)
  }

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.hotProgrammeItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.hotProgrammeItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getProgrammeItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.hotProgrammeItem, data)
      console.log('上拉:', $scope.hotProgrammeItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // 下拉刷新
  $scope.doRefresh = function () {
    getDataService.getProgrammeItem(params).then( function(data) {
      $scope.hotProgrammeItem = data
      console.log('下拉:', $scope.hotProgrammeItem)
    })
    .finally(function() {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      if($scope.newProgrammeItem < 15) {
        $scope.More = false
      } else {
        $scope.More = true
      }
    })
  }

  $scope.doRefresh()
  $scope.hotProgrammeTab = programmeService.programmeItem
})

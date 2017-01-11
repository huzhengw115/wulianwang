angular.module('NewProgramme', [])
.controller('NewProgrammeCtrl', function($scope, programmeService, getDataService) {
  
  // 定义筛选项的初始值
  $scope.newProgrammeIndex = 0
  $scope.More = false
  // 定义params
  var params = {keyword: '', id: 0, catid: 0}

  // 筛选项的点击事件
  $scope.newProgrammeSelect = function(index) {
    $scope.newProgrammeIndex = index
    // 选中的标签
    params.keyword = $scope.newProgrammeTab[index].tab
    $scope.doRefresh()
    console.log('选中的标签：', $scope.newProgrammeTab[index].tab)
  }

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.newProgrammeItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.newProgrammeItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getProgrammeItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.newProgrammeItem, data)
      console.log('上拉:', $scope.newProgrammeItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  //下拉刷新
  $scope.doRefresh = function () {
    getDataService.getProgrammeItem(params).then( function(data) {
      $scope.newProgrammeItem = data
      console.log('下拉:', $scope.newProgrammeItem)
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
  $scope.newProgrammeTab = programmeService.programmeItem
})

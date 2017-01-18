angular.module('Find', [])

.controller('FindCtrl', function ($scope, $ionicScrollDelegate, findService, getDataService) {
  
  // 首先默认设置搜索的类型为资讯
  $scope.classIndex = 0
  var classNumber = 0
  // 设置关键字
  var params = {keyword : '', id: 0, dateformat: 1}
  // 设置类型选择框隐藏的变量
  $scope.isClassShow = false
  // 页面加载初始上拉加载为空
  $scope.More = false
  // 设置开始的时候搜索框为空
  $scope.keyword = ''
  // 设置类型数组
  $scope.classItem = [{'id': 0,'class': '资讯'},{'id': 1,'class': '方案'},{'id': 2,'class': '商机'},{'id': 3,'class': '活动'}]
  // 设置页面最开始时的类型
  $scope.selectItem = $scope.classItem[0].class

  // 弹出类型选择框
  $scope.classSelect = function () {
    $scope.isClassShow = !$scope.isClassShow
  }

  // 关键字的类型选择（资讯、方案、商机、活动）
  $scope.classSelectItem = function (index) {
    $scope.isClassShow = !$scope.isClassShow
    $scope.selectItem = $scope.classItem[index].class
    // 先选中搜索的类型，然后在按下按钮的时候进行搜索类型的转换
    classNumber = index
    $scope.More = false
    console.log('$scope.classIndex:', $scope.classIndex)
  }

  // 搜索按钮
  $scope.toSearch = function (data) {
    $scope.classIndex = classNumber
    $scope.More = false
    $scope.searchData = true
    params.id = 0

    // 首先要判断input框中是否存在值，不存在数据就不进行搜索
    if($scope.keyword != '') {
      params.keyword = data
      console.log('params:', params)
      getDataService.getNewsListItem(params, $scope.classIndex).then(function (data) {
        $scope.findData = data
        console.log('搜索到的结果：', $scope.findData)
      })
      .finally(function () {
        if ($scope.findData == undefined || $scope.findData.length < 15) {
          $scope.More = false
        } else {
          $scope.More = true
        }
      })
    }
  }

  // 上拉加载
  $scope.loadMore = function () {
    var dataLength = $scope.findData.length - 1
    params.id = $scope.findData[dataLength].id
    getDataService.getNewsListItem(params, $scope.classIndex).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.findData, data)
      console.log('上拉:', $scope.findData)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // input内容变动时执行的函数
  $scope.searchChange = function() {
    $scope.More = false
    console.log('$scope.keyword:', $scope.keyword)
    if(!$scope.keyword.length) {
      $scope.more = false
      $scope.searchData = false
      $ionicScrollDelegate.scrollTop()
    } else {
      $scope.more = true
    }
  }

  // 清除按钮清除input中的内容
  $scope.clearSearch = function () {
    $scope.keyword = ''
    $scope.More = false
    $scope.searchData = false
    $ionicScrollDelegate.scrollTop()
  }

  // 热门历史搜索
  $scope.toFind = function (index) {
    $scope.keyword = String(index)
    $scope.toSearch()
  }
})

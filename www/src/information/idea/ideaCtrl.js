angular.module('Idea', [])

.controller('IdeaCtrl', function ($scope, informationService, LoaderService, getDataService) {
  // 二级栏目的首选项
  $scope.slideNumber = 3
  // 上拉加载的控制
  $scope.More = false
  // 设置请求传输的数据
  var params = {keyword: '', id: 0}
  // 接收子级控制器（筛选项）反馈的数据
  $scope.$on('to-parent', function (event, data) {
    console.log('反馈的标签：', data)
    // 首先接收到反馈回来的数据，将数据放入params中
    params = {keyword: data, id: 0}
    // 然后进行下拉刷新操作，将列表数据集刷新
    $scope.doRefresh()
  })

  $scope.selectOpened = false
  // 二级栏目的选择
  $scope.selectView = function (tabNumber) {
    // console.log('tabNumber:',tabNumber)
    $scope.slideNumber = tabNumber
    $scope.$emit('to-parent', tabNumber)
  }

  // 上拉加载
  $scope.loadMore = function () {
    // 首先获取到数据的长度
    var dataLength = $scope.ideaItem.length - 1
    console.log("dataLength:", dataLength)
    // 获取到数据最后一个的id值
    params.id = $scope.ideaItem[dataLength].id
    console.log('params.id:', params.id)
    // 将id值传进去作为下次请求的开始值
    getDataService.getNewsListItem(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.ideaItem, data)
      console.log('上拉:', $scope.ideaItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  // 下拉刷新
  $scope.doRefresh = function () {
    // LoaderService.show();
    getDataService.getNewsListItem(params).then(function (data) {
      $scope.ideaItem = data
      console.log('下拉:', $scope.ideaItem)
    })
    .finally(function () {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete')
      $scope.More = true
    })
  }

  // 页面开始时数据通过下拉刷新加载
  $scope.doRefresh()
  
})

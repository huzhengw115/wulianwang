angular.module('MyPublish', [])

.controller('MyPublishCtrl', function ($scope, getDataService) {
  var params = {id: 0, dateformat: 1, center_type: 'publish'}
  
  $scope.doRefresh = function () {
    params.id = 0
    getDataService.getProgrammeItem(params).then(function (data) {
      $scope.publishData = data
      console.log('我的发布：', data)
    })
    .finally(function () {
      $scope.$broadcast('scroll.refreshComplete')
      if($scope.publishData == undefined) {
        $scope.More = false
        $scope.space = true
      } else if ($scope.publishData.length < 15) { 
        $scope.More = false
      } else {
        $scope.More = true
      }
    })
  }

  $scope.loadMore = function () {
    var dataLength = $scope.publishData.length - 1
    params.id = $scope.publishData[dataLength].id
    getDataService.getProgrammeItem(params).then(function (data) {
      Array.prototype.push.apply($scope.publishData, data)
      console.log('上拉:', $scope.publishData)
      if(data.length < 15) {
        $scope.More = false
      }
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  $scope.doRefresh()

})

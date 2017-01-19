angular.module('Meets', [])
.controller('MeetsCtrl', function($scope, $timeout, getDataService) {

  $scope.More = false
  var params = {id: 0}

  $scope.doRefresh = function () {
    params.id = 0
    getDataService.getMeetsData(params).then( function (data) {
      $scope.meetsListItem = data
      console.log('下拉:', $scope.meetsListItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.refreshComplete')
      $scope.More = true
    })
  }

  $scope.loadMore = function () {
    var dataLength = $scope.meetsListItem.length - 1
    console.log("dataLength:", dataLength)
    params.id = $scope.meetsListItem[dataLength].id
    console.log('params.id:', params.id)
    getDataService.getMeetsData(params).then(function (data) {
      if(data.length < 15) {
        $scope.More = false
      }
      Array.prototype.push.apply($scope.meetsListItem, data)
      console.log('上拉:', $scope.meetsListItem)
    })
    .finally(function () {
      $scope.$broadcast('scroll.infiniteScrollComplete')
    })
  }

  $scope.doRefresh()

})

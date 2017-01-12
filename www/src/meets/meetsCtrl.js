angular.module('Meets', [])
.controller('MeetsCtrl', function($scope, meetsService, $timeout, getDataService) {

  var getMeetsListItem = function() {
    getDataService.getMeetsData().then( function(data) {
      $scope.meetsListItem = data
      console.log($scope.meetsListItem)
    })
  }

  $scope.doRefresh = function () {
    getMeetsListItem()
    $scope.$broadcast('scroll.refreshComplete')
  }

  $scope.doRefresh()

})

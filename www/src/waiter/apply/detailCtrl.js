angular.module('Apply', [])
.controller('ApplyDetailCtrl', function($scope, getDataService, $stateParams, swipeService) {

  var applyId = $stateParams.applyId
  console.log(applyId)
  getDataService.getApplyData(applyId).then(function (data) {
  	$scope.applyData = data
  	$scope.tags = data.tags
  	console.log('$scope.applyData:', $scope.applyData)
  })
  .finally(function () {
    swipeService.photoswipe('main')
    swipeService.clearHref('main')
  })

})
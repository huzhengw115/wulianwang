angular.module('Election', [])

.controller('ElectionCtrl', function ($scope) {
  $scope.boolSelect = function (fade) {
    if (fade == true) {
      $scope.bool = true
      console.log($scope.bool)
    } else {
      $scope.bool = false
      console.log($scope.bool)
    }
  }
})

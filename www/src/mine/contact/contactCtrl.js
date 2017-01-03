angular.module('Contact', [])

.controller('ContactCtrl', function ($scope, $ionicSlideBoxDelegate) {

  // 点击时候触发
  $scope.contactSlide = function (index) {//点击时候触发
    $scope.slectIndex = index
    $ionicSlideBoxDelegate.slide(index)
  }

  // 滑动时候触发
  $scope.slideChanged = function (index) {
    $scope.slectIndex = index
  }

  $scope.slectIndex = 0

})

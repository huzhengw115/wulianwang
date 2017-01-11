angular.module('Register', [])

.controller('RegisterCtrl', function ($scope, $interval) {

  $scope.codeTime = "获取验证码"
  var timer = undefined
  $scope.getTelp = function () {
    $scope.time = 60
    $scope.codeTime = $scope.time+"s"
    var timer = $interval(function () {
      $scope.time = $scope.time - 1
      $scope.codeTime = $scope.time + "s"
      if ($scope.time <= 0) {  
        $scope.codeTime = "重新获取"
        $interval.cancel(timer)
      }
    }, 1000)
  }

})

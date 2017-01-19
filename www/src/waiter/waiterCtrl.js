angular.module('Waiter', [])
.controller('WaiterCtrl', function($scope, getDataService) {

  var params = {limitnum: 6, dateformat: 1}

  getDataService.getWaiterDetail(params).then( function(data) {
    $scope.adsItem = data
    for(var index = 0; index < data.length; ++index) {
      if (data[index].desc.format == 43) {
        $scope.adsItem[index].format = 'JPG'
      } else {
        $scope.adsItem[index].format = 'GIF'
      }
    }
    console.log($scope.adsItem)
  })

  getDataService.getWaiterItem(params).then( function(data) {
    $scope.decItem = data
    console.log($scope.decItem)
  })

})

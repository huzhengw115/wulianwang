angular.module('Waiter', [])
.controller('WaiterCtrl', function($scope, waiterService) {

    var getAskListItem = function() {
    	waiterService.getAskListItem().then( function(AskListItem) {
    		$scope.AskListItem = AskListItem
    	})
    }
    getAskListItem()
})
angular.module('Waiter', [])

.service('waiterService', function($http, $q) {


	//数据的获取
	var getWaiterListItem = function() {
		var waiterListItem = [];
		var deferred = $q.defer();

		$http.get('json/data.json')
		.success(function(data) {
			waiterListItem = data.datas;
			deferred.resolve(waiterListItem);
		})
		.error(function(err) {
			console.log('读取数据失败');
			deferred.reject();
		})
		return deferred.promise;
	}

	//咨询服务数据
	var getAskListItem = function() {
		var AskListItem = [];
		var deferred = $q.defer();

		$http.get('json/waiter.json')
		.success(function(data) {
			AskListItem = data.datas;
			deferred.resolve(AskListItem);
		})
		.error(function(err) {
			console.log('读取数据失败');
			deferred.reject();
		})
		return deferred.promise;
	}

	return {
		getWaiterListItem: getWaiterListItem,
		getAskListItem: getAskListItem
	}

})
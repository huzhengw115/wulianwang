angular.module('Meets', [])

.service('meetsService', function($http, $q) {


	//数据的获取
	var getMeetsListItem = function() {
		var meetsListItem = [];
		var deferred = $q.defer();

		$http.get('json/data.json')
		.success(function(data) {
			meetsListItem = data.datas;
			deferred.resolve(meetsListItem);
		})
		.error(function(err) {
			console.log('读取首页轮播图失败');
			deferred.reject();
		})
		return deferred.promise;
	}

	return {
		getMeetsListItem: getMeetsListItem
	}

})
angular.module('Programme', [])

.service('programmeService', function($http, $q) {

	var programmeItem = [{
		"id": 0,
		"tab": "智能电网"
	}, {
		"id": 1,
		"tab": "智能交通"
	}, {
		"id": 2,
		"tab": "智能物流"
	}, {
		"id": 3,
		"tab": "智能家居"
	}, {
		"id": 4,
		"tab": "智慧环保"
	}, {
		"id": 5,
		"tab": "智能工业"
	}, {
		"id": 6,
		"tab": "智慧医疗"
	}, {
		"id": 7,
		"tab": "智慧农业"
	}, {
		"id": 8,
		"tab": "智慧金融"
	}, {
		"id": 9,
		"tab": "智慧国防"
	}, {
		"id": 10,
		"tab": "其他"
	}];

	//获取
	var getProgrammeListItem = function() {
		var programmeListItem = [];
		var deferred = $q.defer();

		$http.get('json/data.json')
		.success(function(data) {
			programmeListItem = data.datas;
			deferred.resolve(programmeListItem);
			//console.log(programmeListItem);
		})
		.error(function(err) {
			console.log('读取数据失败');
			deferred.reject();
		})
		return deferred.promise;
	}

	return {
		programmeItem: programmeItem,
		getProgrammeListItem: getProgrammeListItem
	}
})
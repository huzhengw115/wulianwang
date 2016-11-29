angular.module('Information', [])

.service('informationService', function($http, $q) {
	var hotsThings = [{
		"id": 0,
		"tab": "全部"
	}, {
		"id": 1,
		"tab": "车联网"
	}, {
		"id": 2,
		"tab": "智能交通"
	}, {
		"id": 3,
		"tab": "智慧医疗"
	}, {
		"id": 4,
		"tab": "工业4.0"
	}, {
		"id": 5,
		"tab": "智慧农业"
	}, {
		"id": 6,
		"tab": "5G"
	}, {
		"id": 7,
		"tab": "RFID"
	}, {
		"id": 8,
		"tab": "传感器"
	},{
		"id": 9,
		"tab": "全部"
	}, {
		"id": 10,
		"tab": "AR/VR"
	}, {
		"id": 11,
		"tab": "无人机"
	}, {
		"id": 12,
		"tab": "无人车"
	}, {
		"id": 13,
		"tab": "GPS"
	}, {
		"id": 14,
		"tab": "嵌入式"
	}, {
		"id": 15,
		"tab": "生物识别"
	}, {
		"id": 16,
		"tab": "智能家居"
	}, {
		"id": 17,
		"tab": "智能安防"
	}];
	var hotsDoing = [
	{
		"id": 0,
		"tab": "全部"
	}, {
		"id": 1,
		"tab": "AR/VR"
	}, {
		"id": 2,
		"tab": "无人机"
	}, {
		"id": 3,
		"tab": "无人车"
	}, {
		"id": 4,
		"tab": "GPS"
	}, {
		"id": 5,
		"tab": "嵌入式"
	}, {
		"id": 6,
		"tab": "生物识别"
	}, {
		"id": 7,
		"tab": "智能家居"
	}, {
		"id": 8,
		"tab": "智能安防"
	}];

	//热点获取
	var getHotsLiatData = function() {
		var hotsListData = [];
		var deferred = $q.defer();

		$http.get('json/data.json')
		.success(function(data) {
			hotsListData = data.datas;
			deferred.resolve(hotsListData);
		})
		.error(function(err) {
			console.log('读取热点资讯失败');
			deferred.reject();
		})
		return deferred.promise;
	}

	return {
		hotsThings: hotsThings,
		hotsDoing: hotsDoing,
		getHotsLiatData: getHotsLiatData
	}
})
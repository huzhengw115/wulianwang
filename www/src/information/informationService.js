angular.module('Information', [])

.service('informationService', function ($http, $q, Restangular) {
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
  }]
  var informationTitle = [{
    "id": 0,
    "title": "热门"
  },{
    "id": 1,
    "title": "政策"
  },{
    "id": 2,
    "title": "观点"
  },{
    "id": 3,
    "title": "专题"
  },{
    "id": 4,
    "title": "服务"
  }]

  return {
    hotsThings: hotsThings,
    informationTitle: informationTitle
  }
})
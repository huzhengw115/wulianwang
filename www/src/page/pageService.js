angular.module('Home', [])

.service('pageService', function ($http, $q) {
  // 详情页数据的获取
  var getDetailData = function (index) {
    console.log('index:',index)
    var detailData = []
    var deferred = $q.defer()

    $http.get('json/homeList.json')
      .success(function (data) {
        detailData = data.homeList[index]
        deferred.resolve(detailData)
      })
      .error(function (err) {
        console.log('读取详情页数据失败')
        deferred.reject()
      })
    return deferred.promise
  }
  //详情页的热点
  var getDetailHotData = function () {
    var detailHotData = []
    var deferred = $q.defer()

    $http.get('json/detailHot.json')
      .success(function (data) {
        detailHotData = data.data
        deferred.resolve(detailHotData)
      })
      .error(function (err) {
        console.log('读取热点数据失败')
        deferred.reject()
      })
    return deferred.promise
  }

  return {
    getDetailData: getDetailData,
    getDetailHotData: getDetailHotData
  }
})

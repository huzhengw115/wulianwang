angular.module('Detail', [])

.service('detailService', function ($http, $q) {
  //详情页面的数据获取
  var getPageData = function () {
    var pageData = []
    var deferred = $q.defer()

    $http.get('json/information.json')
    .success(function (data) {
      pageData = data.information[0]
      deferred.resolve(pageData)
    })
    .error(function (err) {
      console.log('读取详情页面数据失败:',err)
      deferred.reject()
    })
    return deferred.promise
  }

  // 页面下方热门推荐的数据获取
  var getPageHotData = function () {
    var pageHotData = []
    var deferred = $q.defer()

    $http.get('json/pageHot.json')
    .success(function (data) {
      pageHotData = data.data
      deferred.resolve(pageHotData)
    })
    .error(function (err) {
      console.log('读取详情页面数据失败:',err)
      deferred.reject()
    })
    return deferred.promise
  }

  return {
    getPageData: getPageData,
    getPageHotData: getPageHotData
  }
})
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

  return {
    getPageData: getPageData
  }
})
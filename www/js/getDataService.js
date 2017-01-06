angular.module('getDataService', [])

.service('getDataService', function ($http, $q, Restangular) {

  // http://www.im2m.com.cn/api/news/news_list/keyword/%E8%8B%B9%E6%9E%9C
  // getDataService.getNewsListItem().then(function (homeItem) {
  //   $scope.homeItem = homeItem
  // })
  // 首页、资讯页热门列表数据获取
  function getNewsListItem (params) {
    return _getData('news/news_list/keyword', params)
  }

  function _getData (url, params) {
    var deferred = $q.defer()

    Restangular.setJsonp(true)
    Restangular.one(url).get(params).then(function (data) {
      getData = data.list
      // console.log('请求到的数据: ', getData)
      deferred.resolve(getData)
    }, function (err) {
      deferred.reject(err)
    })

    return deferred.promise
  }

  return {
    getNewsListItem: getNewsListItem
  }
})
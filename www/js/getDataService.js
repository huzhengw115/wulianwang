angular.module('getDataService', [])

.service('getDataService', function ($http, $q, Restangular) {

  // 资讯 http://www.im2m.com.cn/api/news/news_list/keyword/%E8%8B%B9%E6%9E%9C

  // 进行搜索操作时列表数据获取，index代表取得是什么值
  function getNewsListItem (params, index) {
    switch(index)
    {
    case 0:
      console.log('现在是零')
      break
    case 1:
      console.log('现在是一')
      break
    case 2:
      console.log('现在是二')
      break
    default:
      console.log('现在是妖妖灵')
    }
    return _getData('news/news_list/keyword', params)
  }

  function getNewsItem (params) {
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
    getNewsListItem: getNewsListItem,
    getNewsItem: getNewsItem
  }
})
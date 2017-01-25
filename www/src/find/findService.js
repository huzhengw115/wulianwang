angular.module('Find', [])
.service('findService', function ($q, Restangular) {
  // 热门搜索 news/get_search_key

  // 进行搜索操作时列表数据获取，index代表取得是什么值
  function getFindItem (params, index) {
    switch(index)
    {
    case 0:
      console.log('资讯')
      return _getData('news/get_list/keyword', params)
      break
    case 1:
      console.log('方案')
      return _getData('solutions/get_list/keyword', params)
      break
    case 2:
      console.log('商机')
      return _getData('business/get_list/keyword', params)
      break
    case 3:
      console.log('活动')
      return getMeetsData(params)
      break
    default:
      console.log('无')
    }
    return console.log('结束')
  }

  // 热门搜素的获取
  function getSearchData (params) {
    return _getSearch('news/get_search_key', params)
  }

  function _getSearch (url, params) {
    var getData = []
    var deferred = $q.defer()

    Restangular.setJsonp(true)
    Restangular.one(url).get(params).then(function (data) {
      console.log('取到的数据：', data)
      getData = data
      deferred.resolve(getData)
    }, function (err) {
      deferred.reject(err)
    })

    return deferred.promise
  }

  function _getData (url, params) {
    var getData = []
    var deferred = $q.defer()

    Restangular.setJsonp(true)
    Restangular.one(url).get(params).then(function (data) {
      console.log('取到的数据：', data)
      getData = data.list
      deferred.resolve(getData)
    }, function (err) {
      deferred.reject(err)
    })

    return deferred.promise
  }

  function getMeetsData (params) {
    var meetsData = []
    console.log(params)
    var url = 'http://www.51banhui.com/api/meet/meet_list'
    var deferred = $q.defer()
    if (params) {
      params.callback = 'JSON_CALLBACK'
    } else {
      params = {
        callback: 'JSON_CALLBACK'
      }
    }

    $http.jsonp(url, {params: params}).success(function (data) {
      if (data && 'errcode' in data) {
        if (data.errcode == 0) {
          meetsData = data.list
          deferred.resolve(meetsData)
        } else {
          deferred.reject(meetsData)
        }
      } else {
        meetsData = data.list
        console.log('success: ', meetsData)
        deferred.resolve(meetsData)
      }
    }).error(function (data, status, header, config) {
      console.log('err:', data)
      deferred.reject(data)
    })
    return deferred.promise
  }

  return {
    getFindItem: getFindItem,
    getSearchData: getSearchData
  }

})
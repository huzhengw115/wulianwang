angular.module('getDataService', [])

.service('getDataService', function ($http, $q, Restangular) {

  // 资讯 http://www.im2m.com.cn/api/news/get_list/keyword/%E8%8B%B9%E6%9E%9C
  // 方案 /api/solutions/get_list
  // 首页的轮播图片 /api/index/index

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
    return _getData('news/get_list/keyword', params)
  }

  // 首页轮播图片
  function getPicItem (params) {
    return _getData('index/index', params)
  }

  // 资讯
  function getNewsItem (params) {
    return _getData('news/get_list/keyword', params)
  }

  // 方案
  function getProgrammeItem (params) {
    return _getData('solutions/get_list/keyword', params)
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

  function getMeetsData (params) {
    var url = 'http://www.51banhui.com/api/meet/meet_hot'
    var deferred = $q.defer()
    // var url = SERVICE_API_URL + '?callback=JSON_CALLBACK';
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
          deferred.resolve(data)
        } else {
          deferred.reject(data)
        }
      } else {
        console.log('success: ', data)
        deferred.resolve(data)
      }
    }).error(function (data, status, header, config) {
      console.log('err:', data)
      deferred.reject(data)
    })
    return deferred.promise
  }

  return {
    getNewsListItem: getNewsListItem,
    getNewsItem: getNewsItem,
    getProgrammeItem: getProgrammeItem,
    getPicItem: getPicItem,
    getMeetsData: getMeetsData
  }
})
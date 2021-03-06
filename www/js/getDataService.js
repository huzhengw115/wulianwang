angular.module('getDataService', [])

.service('getDataService', function ($http, $q, Restangular) {

  // 资讯 http://www.im2m.com.cn/api/news/get_list/keyword/%E8%8B%B9%E6%9E%9C
  // 方案 solutions/get_list
  // 详情 news/detail/id/
  // 首页的轮播图片 index/index
  // 标签的数据 tags/get_list
  // 广告 service/get_list/catid/97
  // 申报 service/get_list/catid/98
  // 关注 news/fucus

  // 资讯
  function getNewsItem (params) {
    return _getData('news/get_list/keyword', params)
  }

  // 资讯的详情页面
  function getNewsDetail (id) {
    var url = 'news/detail/id/'
    url += id
    return _getDatail(url)
  }

  // 方案
  function getProgrammeItem (params) {
    return _getData('solutions/get_list/keyword', params)
  }

  // 方案的详情页面
  function getProgrammeDetail (id) {
    var url = 'solutions/detail/id/'
    url += id
    return _getDatail(url)
  }

  // 商机
  function getGoodsItem (params) {
    return _getData('business/get_list/keyword', params)
  }

  // 商机的详情页面
  function getGoodsDetail (id) {
    var url = 'business/detail/id/'
    url += id
    return _getDatail(url)
  }

  // 广告服务
  function getWaiterDetail (params) {
    return _getData('service/get_list/catid/97', params)
  }

  // 申报服务
  function getWaiterItem (params) {
    return _getData('service/get_list/catid/98', params)
  }

  // 申报服务的详情页面
  function getApplyData (id) {
    var url = 'service/detail/id/'
    url += id
    return _getDatail(url)
  }

  // 标签
  function getTabItem (params) {
    return _getDatail('tags/get_list', params)
  }

  // 我的订阅
  function getMyTab (params) {
    return _getDatail('tags/get_user_tags', params)
  }

  // 资讯关注
  function newsFollow (params) {
    return _getMyFollow('news/fucus', params)
  }

  // 方案关注
  function programmeFollow (params) {
    return _getMyFollow('solutions/fucus', params)
  }

  // 商机关注
  function goodsFollow (params) {
    return _getMyFollow('business/fucus', params)
  }

  // 服务关注
  function waiterFollow (params) {
    return _getMyFollow('service/fucus', params)
  }

  // 各个数据的获取
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

  // 各个详情页面的数据获取
  // 本来可以和上面的和在一起的，但是因为搜索中存在活动这项，data.list必须在getData中实现
  function _getDatail (url, params) {
    var getData = []
    var deferred = $q.defer()

    Restangular.setJsonp(true)
    Restangular.one(url).get(params).then(function (data) {
      getData = data
      deferred.resolve(getData)
    }, function (err) {
      deferred.reject(err)
    })

    return deferred.promise
  }

  // 首页轮播图片
  function getPicItem (params) {
    var deferred = $q.defer()

    Restangular.setJsonp(true)
    Restangular.one('index/index').get(params).then(function (data) {
      getData = data
      deferred.resolve(getData)
    }, function (err) {
      deferred.reject(err)
      console.log('err:', err)
    })

    return deferred.promise
  
  }

  function _getMyFollow (url, params) {
    var deferred = $q.defer()
    console.log(params)

    Restangular.one(url).get(params).then(function (data) {
      deferred.resolve(data)
      console.log('success:', data)
    }, function (err) {
      deferred.reject(err)
      console.log('err:', err)
    })
    return deferred.promise
  }

  // 活动列表的获取
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
    getNewsItem: getNewsItem,
    getProgrammeItem: getProgrammeItem,
    getPicItem: getPicItem,
    getMeetsData: getMeetsData,
    getGoodsItem: getGoodsItem,
    getNewsDetail: getNewsDetail,
    getTabItem: getTabItem,
    getProgrammeDetail: getProgrammeDetail,
    getGoodsDetail: getGoodsDetail,
    getWaiterDetail: getWaiterDetail,
    getWaiterItem: getWaiterItem,
    getApplyData: getApplyData,
    getMyTab: getMyTab,
    newsFollow: newsFollow,
    programmeFollow: programmeFollow,
    goodsFollow: goodsFollow,
    waiterFollow: waiterFollow
  }
})
angular.module('Read', [])

.service('readService', function ($http, $q, Restangular) {

  // 我的标签 tags/get_user_tags
  // 添加标签 tags/add_user_tags
  // 删除标签 tags/delete_user_tags
  // 关注 news/fucus

  // 标签
  function getTabItem (params) {
    return _getDatail('tags/get_list', params)
  }

  // 我的订阅
  function getMyTab (params) {
    return _getDatail('tags/get_user_tags', params)
  }

  // 订阅标签
  function goMyTab (params) {
    return _getDatail('tags/add_user_tags', params)
  }

  // 删除标签
  function delMyTab (params) {
    return _getDatail('tags/delete_user_tags', params)
  }

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


  return {
    getTabItem: getTabItem,
    getMyTab: getMyTab,
    goMyTab: goMyTab,
    delMyTab: delMyTab
  }
})

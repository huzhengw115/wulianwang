angular.module('Read', [])

.service('readService', function ($http, $q) {
  //热门标签的获取
  var getHotTab = function () {
    var hotTab = []
    var deferred = $q.defer()
    $http.get('json/hotTab.json')
    .success(function (data) {
      hotTab = data.tab
      //console.log(hotTab)
      deferred.resolve(hotTab)
    })
    .error(function () {
      console.log('获取热门标签失败')
      deferred.reject()
    })
    return deferred.promise
  }

  //搜索标签的获取
  var getSearchTab = function () {
    var searchTab = []
    var deferred = $q.defer()
    $http.get('json/hotTab.json')
    .success(function (data) {
      searchTab = data.search
      //console.log(searchTab)
      deferred.resolve(searchTab)
    })
    .error(function () {
      console.log('获取搜索标签失败')
      deferred.reject()
    })
    return deferred.promise
  }

  //我的标签的获取
  var getMyTab = function () {
    var myTab = []
    var deferred = $q.defer()
    $http.get('json/hotTab.json')
    .success(function (data) {
      myTab = data.my
      //console.log(myTab)
      deferred.resolve(myTab)
    })
    .error(function () {
      console.log('获取我的标签失败')
      deferred.reject()
    })
    return deferred.promise
  }

  return {
    getHotTab: getHotTab,
    getSearchTab: getSearchTab,
    getMyTab: getMyTab
  }
})

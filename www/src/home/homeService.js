angular.module('Home', [])

.service('homeService', function ($http, $q) {
  // 首页轮播图的获取
  var homeTitlePic = function () {
    var homeTitle = []
    var deferred = $q.defer()

    $http.get('json/homeTitle.json')
      .success(function (data) {
        homeTitle = data.pic
        deferred.resolve(homeTitle)
      })
      .error(function (err) {
        console.log('读取首页轮播图失败')
        deferred.reject()
      })
    return deferred.promise
  }

  // homeItem列表数据获取
  var homeListItem = function () {
    var homeItem = []
    var deferred = $q.defer()

    $http.get('json/information.json')
      .success(function (data) {
        homeItem = data.information
        console.log(homeItem)
        deferred.resolve(homeItem)
      })
      .error(function (err) {
        console.log('读取首页列表数据失败')
        deferred.reject()
      })
    return deferred.promise
  }

  // 热点获取
  var getHotsLiatData = function () {
    var hotsListData = []
    var deferred = $q.defer()

    $http.get('json/data.json')
      .success(function (data) {
        hotsListData = data.datas
        deferred.resolve(hotsListData)
      })
      .error(function (err) {
        console.log('读取热点资讯失败')
        deferred.reject()
      })
    return deferred.promise
  }

  return {
    homeTitlePic: homeTitlePic,
    homeListItem: homeListItem,
    getHotsLiatData: getHotsLiatData
  }
})

angular.module('MyRead', [])

.service('myReadService', function ($http, $q) {
  // 我的订阅的标签的读取
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
    getMyTab: getMyTab
  }
})

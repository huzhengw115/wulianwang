angular.module('Login', [])

.service('loginService', function ($q, Restangular) {

  // 登陆：http://www.im2m.com.cn/api/member/login

  function goLogin (params) {
    return _getData('member/login', params)
  }

  function _getData (url, params) {
    var deferred = $q.defer()
    console.log(params)

    Restangular.all(url).post(params).then(function (data) {
      deferred.resolve(data)
      console.log('success:', data)
    }, function (err) {
      deferred.reject(err)
      console.log('err:', err)
    })
    return deferred.promise
  }

})

angular.module('Login', [])

.service('loginService', function ($q, Restangular, $ionicLoading, $timeout, Local) {

  // 登陆：http://www.im2m.com.cn/api/member/login

  function goLogin (mobile, password, caption) {
    // 提示正在跳转
    $ionicLoading.show({
      title: caption
    })

    var deferred = $q.defer()
    var url = 'member/login/'
    url += 'mobile/'
    url += mobile
    url += '/password/'
    url += password

    // 将show隐藏
    $timeout(function() {
      $ionicLoading.hide()
    }, 1000)

    Restangular.all(url).post().then(function (data) {
      Local.set("loginState", data.errcode)
      Local.set("uid", data.uid)
      Local.set("mobile", mobile)
      deferred.resolve(data)
      console.log('success:', data)
    }, function (err) {
      deferred.reject(err)
      console.log('err:', err)
    })
    return deferred.promise
  }

  return {
    goLogin: goLogin
  }

})

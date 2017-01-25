angular.module('Detail', [])

.service('loginDetailService', function (Local, $q, $ionicLoading, $timeout, Restangular) {

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
    // 其实我也知道我的代码存在问题，但是我不知道怎么改了
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
/*
 *  ┏┓　　　┏┓ 
 *┏┛┻━━━┛┻┓ 
 *┃　　　　　　　┃ 　 
 *┃　　　━　　　┃ 
 *┃　┳┛　┗┳　┃ 
 *┃　　　　　　　┃ 
 *┃　　　┻　　　┃ 
 *┃　　　　　　　┃ 
 *┗━┓　　　┏━┛ 
 *　　┃　　　┃神兽保佑 
 *　　┃　　　┃代码无BUG！
 *　　┃　　　┗━━━┓ 
 *　　┃　　　　　　　┣┓ 
 *　　┃　　　　　　　┏┛ 
 *　　┗┓┓┏━┳┓┏┛ 
 *　　　┃┫┫　┃┫┫ 
 *　　　┗┻┛　┗┻┛  
 *　　　 
 */
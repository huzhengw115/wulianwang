angular.module('Mine', [])

.service('mineService', function ($q, Restangular, Local) {
  mineUrl = ["/tab/myPublish", "/tab/myInter", "/tab/myRead", "3"]
  
  function goLogout () {
    var deferred = $q.defer()
    var url = 'member/logout'
    Restangular.all(url).post().then(function (data) {
      Local.set("loginState", '')
      Local.set("uid", '')
      Local.set("mobile", '')
      deferred.resolve(data)
      console.log('success:', data)
    }, function (err) {
      deferred.reject(err)
      console.log('err:', err)
    })
    return deferred.promise
  }

  return {
  	mineUrl: mineUrl,
  	goLogout: goLogout
  }
})

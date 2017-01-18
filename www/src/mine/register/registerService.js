angular.module('Register', [])

.service('registerService', function ($q, Restangular) {

  // 注册：http://www.im2m.com.cn/api/member/register
  // 验证码：member/sendMobileCode
  // 发送验证码
  function SendCode (number) {
    var params = {mobile: number}
    console.log('电话号码：', number)
    return _getData('member/sendMobileCode', params)
  }

  // 进行注册
  function goRegister (params) {
    return _getData('member/register', params)
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

  return {
    SendCode: SendCode,
    goRegister: goRegister
  }
})

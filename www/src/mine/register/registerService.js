angular.module('Register', [])

.service('registerService', function ($q, Restangular, loginService) {

  // 所有的post提交都存在问题，现在的处理方式是不合理的
  // 注册：http://www.im2m.com.cn/api/member/register
  // 验证码：member/sendMobileCode
  // 发送验证码
  function SendCode (number) {
    // var params = {mobile: number}
    console.log('电话号码：', number)
    return _getData('member/sendMobileCode', number)
  }

  // 进行注册
  function goRegister (params) {
    return _getRegister('member/register', params)
  }

  function _getData (url, params) {
    var deferred = $q.defer()
    console.log(params)
    var src = url
    src += '/mobile/'
    src += params

    Restangular.all(src).post().then(function (data) {
      deferred.resolve(data)
      console.log('success:', data)
    }, function (err) {
      deferred.reject(err)
      console.log('err:', err)
    })
    return deferred.promise
  }

  function _getRegister (url, params) {
    var deferred = $q.defer()
    console.log(params)
    var src = url
    src += '/mobile/'
    src += params.mobile
    src += '/code/'
    src += params.code
    src += '/password/'
    src += params.password

    Restangular.all(src).post().then(function (data) {
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

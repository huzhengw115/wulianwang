angular.module('Register', [])

.controller('RegisterCtrl', function ($scope, $interval, registerService, $ionicPopup) {

  // 手机号：mobile，密码：password，验证码：code
  $scope.codeTime = "获取验证码"
  var timer = undefined
  // 定义按钮禁止事件
  var buttonStop = true
  // 定义一个用于判断是否获取验证码的变量
  var isCode = false
  // 存储手机号码
  var mobileNumber = 0

  // 获取验证码的按钮
  $scope.getTelp = function (mobile) {

    // 将接收到的手机号码存储
    mobileNumber = mobile
    // 首先判断手机号码是否填写正确
    if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(mobile))) {
      console.log('请输入正确的手机号码')
      $ionicPopup.alert({
        template: '请输入正确的手机号码'
      })
    } else {
      // 然后判断按钮是否被禁止
      if (buttonStop == true) {

        // 向填写的手机发送验证码
        registerService.SendCode(mobile).then(function (data) {
          console.log('正在获取')
          $ionicPopup.alert({
            template: '验证码已经发送，请注意查收'
          })
          // 已经获取验证码
          isCode = true
          // 将按钮禁止掉
          buttonStop = false
          // 设置获取的时间
          $scope.time = 60
          // 按钮上面显示的倒计时
          $scope.codeTime = $scope.time+"s"
          // 倒计时的循环函数
          var timer = $interval(function () {
            $scope.time = $scope.time - 1
            $scope.codeTime = $scope.time + "s"
            if ($scope.time <= 0) {  
              $scope.codeTime = "重新获取"
              buttonStop = true
              $interval.cancel(timer)
            }
          }, 1000)
        },function (err) {
          console.log('err:', err)
          $ionicPopup.alert({
            template: '错误，请重试'
          })
        })
      } else {
        console.log('please wait')
        $ionicPopup.alert({
          template: '错误，请重试'
        })
      }
    }
  }

  $scope.goRegister = function (mobile, code, password) {
    // 接收到三个数据之后要对三个数据进行判断
    // 首先判断是否获取验证码
    if (isCode == false) {
      console.log('请先获取验证码')
      $ionicPopup.alert({
        template: '请先获取验证码'
      })
    } else {
      // 再判断手机号码是否变动
      if (mobileNumber != mobile) {
        console.log('请填写正确的手机号码')
        $ionicPopup.alert({
          template: '请填写正确的手机号码'
        })
      } else {
        // 然后判断验证码是否为6位
        if (code == undefined || code.length != 6) {
          console.log('请输入正确的验证码')
          $ionicPopup.alert({
            template: '请输入正确的验证码'
          })
        } else {
          // 最后判断密码在6位以上
          if (password == undefined || password.length < 6) {
            console.log('请输入6位以上的密码')
            $ionicPopup.alert({
              template: '请输入6位以上的密码'
            })
          } else {
            // 将数据传输到后台验证，判断是否可行
            var params = {
              mobile: mobile,
              password: password,
              code: code
            }
            registerService.goRegister(params).then(function (data) {
              var caption = '注册成功，正在登录'
              loginService.goLogin(params, caption).then(function (text) {
                $location.path("/tab/mine")
              })
            })
            console.log('please wait a moment')
          }
        }
      }
    }
  }

})

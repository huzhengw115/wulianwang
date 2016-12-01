// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.routes', 'oc.lazyLoad', 'ionicPicker', 'constantService'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      cordova.plugins.Keyboard.disableScroll(true)
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault()
    }
  })
})

.directive('hideTabs', function ($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function () {
                scope.$watch(attributes.hideTabs, function (value){
                    $rootScope.hideTabs = value
                })
            })
            scope.$on('$ionicView.beforeLeave', function () {
                $rootScope.hideTabs = false
            })
        }
    }
})

.service('swipeService', function ($document) {
  var photoswipe = function () {
    var items = []
    var pswpElement = document.querySelectorAll('.pswp')[0]
    var options = {
      index: 0,
      shareEl: false,
      tapToClose: true  
    }
    function imgOnload(img, index) {
      return function () {
        // console.log("imgOnload: [index, img]", index, img);
        // 只有实际图片宽度大于250时，才需要放大图片，否则可能时图标或者无需放大的图片。
        if (img.naturalWidth > 250) {
          var item = {
            src: img.src,
            w: img.naturalWidth,
            h: img.naturalHeight
          }
          items.push(item)
          angular.element(img).bind("click", bindImg(index))
        }
      }
    }
    function bindImg(index) {
      return function () {
        console.log("bindImg: [index, items]", index, items)
        options.index = index
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options)
        gallery.init()
        gallery.goTo(index)
      }
    }
    var databigpic = angular.element($document.find("main"))
    databigpic.ready(function () {
      var imgs = databigpic.find("img")
      console.log('imgs:',imgs)
      for(var index = 0; index < imgs.length; ++index) {
        var img = imgs[index]
        if(img.naturalWidth == 0 && img.naturalHeight == 0) {
          // 绑定图片加载完成事件，加载完以后才能获取图片Size
          angular.element(img).bind("load", imgOnload(img, index))
        } else {
          imgOnload(img, index)();
        }
      }
    })
  }
  return{
    photoswipe: photoswipe
  }
})

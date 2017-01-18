// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.routes', 'oc.lazyLoad', 'constantService', 'restangular', 'getDataService'])

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

.config(function (RestangularProvider) {
  RestangularProvider.setBaseUrl('http://www.im2m.com.cn/api')
  // http://www.im2m.com.cn/api/news/news_list/keyword/%E8%8B%B9%E6%9E%9C
  // RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({cache: true})

  RestangularProvider.setJsonp = true
  RestangularProvider.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'})

  // RestangularProvider.requestParams.get = {callback: 'JSON_CALLBACK'};
})
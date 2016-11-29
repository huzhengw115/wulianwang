angular.module('starter.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'src/home/home.html',
        controller: 'HomeCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/home/homeService.js']).then(function () {
          return $ocLazyLoad.load(['src/home/homeCtrl.js', 'src/home/home.css'])
        })
      }]
    }
  })

  .state('tab.home-detail', {
      url: '/home/:homeId',
      views: {
        'tab-home': {
          templateUrl: 'src/home/homeDetail.html',
          controller: 'HomeDetailCtrl'
        }
      },
      resolve: {
       loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load(['src/information/informationService.js','src/programme/programmeService.js','src/goods/goodsService.js','src/meets/meetsService.js','src/waiter/waiterService.js']).then(function () {
            return $ocLazyLoad.load('src/home/homeDetailCtrl.js')
         })
        }]
      }
    })

  .state('tab.mine', {
    url: '/mine',
    views: {
      'tab-mine': {
        templateUrl: 'src/mine/mine.html',
        controller: 'MineCtrl'
      }
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/mine/mineCtrl.js'])
      }]
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home')
})

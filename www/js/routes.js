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
         return $ocLazyLoad.load(['src/home/homeService.js','src/information/informationService.js','src/programme/programmeService.js','src/goods/goodsService.js','src/meets/meetsService.js','src/waiter/waiterService.js']).then(function () {
            return $ocLazyLoad.load('src/home/homeDetailCtrl.js')
         })
        }]
      }
    })

  .state('tab.detail-page', {
      url: '/detail/:detailPageId',
      views: {
        'tab-home': {
          templateUrl: 'src/page/detail/detailPage.html',
          controller: 'DetailPageCtrl'
        }
      },
      resolve: {
       loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load('src/page/pageService.js').then(function () {
            return $ocLazyLoad.load(['src/page/detail/detailPage.css','src/page/detail/detailPageCtrl.js'])
         })
        }]
      }
    })

  .state('tab.programme-page', {
      url: '/programme/:programmePageId',
      views: {
        'tab-home': {
          templateUrl: 'src/page/programme/programmePage.html',
          controller: 'ProgrammePageCtrl'
        }
      },
      resolve: {
       loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load('src/page/pageService.js').then(function () {
            return $ocLazyLoad.load(['src/page/programme/programmePageCtrl.js','src/page/programme/programmePage.css'])
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
        return $ocLazyLoad.load(['src/mine/mineService.js']).then(function () {
          return $ocLazyLoad.load(['src/mine/mine.css','src/mine/mineCtrl.js'])
        })
      }]
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home')
})

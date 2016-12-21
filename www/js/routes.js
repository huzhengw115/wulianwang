angular.module('starter.routes', [])

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom')
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

  .state('tab.information', {
    url: '/information',
    views: {
      'tab-home': {
        templateUrl: 'src/information/information.html',
        controller: 'InformationCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/information/informationService.js', 'src/information/optionSelect/optionSelect.css']).then(function () {
          return $ocLazyLoad.load(['src/information/informationCtrl.js', 'src/information/information.css', 'src/information/optionSelect/optionSelectCtrl.js'])
        })
      }]
    }
  })

  .state('tab.programme', {
    url: '/programme',
    views: {
      'tab-home': {
        templateUrl: 'src/programme/programme.html',
        controller: 'ProgrammeCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/programme/programmeService.js']).then(function () {
          return $ocLazyLoad.load(['src/programme/programmeCtrl.js', 'src/programme/programme.css'])
        })
      }]
    }
  })

  .state('tab.goods', {
    url: '/goods',
    views: {
      'tab-home': {
        templateUrl: 'src/goods/goods.html',
        controller: 'GoodsCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/goods/goodsService.js']).then(function () {
          return $ocLazyLoad.load(['src/goods/goodsCtrl.js', 'src/goods/goods.css'])
        })
      }]
    }
  })

  .state('tab.meets', {
    url: '/meets',
    views: {
      'tab-home': {
        templateUrl: 'src/meets/meets.html',
        controller: 'MeetsCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/meets/meetsService.js']).then(function () {
          return $ocLazyLoad.load(['src/meets/meetsCtrl.js', 'src/meets/meets.css'])
        })
      }]
    }
  })

  .state('tab.waiter', {
    url: '/waiter',
    views: {
      'tab-home': {
        templateUrl: 'src/waiter/waiter.html',
        controller: 'WaiterCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/waiter/waiterService.js']).then(function () {
          return $ocLazyLoad.load(['src/waiter/waiterCtrl.js', 'src/waiter/waiter.css'])
        })
      }]
    }
  })

  .state('tab.read', {
    url: '/read',
    views: {
      'tab-home': {
        templateUrl: 'src/read/read.html',
        controller: 'ReadCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/read/readService.js']).then(function () {
          return $ocLazyLoad.load(['src/read/readCtrl.js', 'src/read/read.css'])
        })
      }]
    }
  })

  .state('tab.find', {
    url: '/find',
    views: {
      'tab-home': {
        templateUrl: 'src/find/find.html',
        controller: 'FindCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/find/findService.js']).then(function () {
          return $ocLazyLoad.load(['src/find/findCtrl.js', 'src/find/find.css'])
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
         return $ocLazyLoad.load(['src/home/homeService.js']).then(function () {
            return $ocLazyLoad.load(['src/home/homeDetailCtrl.js','src/home/homeDetail.css'])
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

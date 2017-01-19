angular.module('starter.routes', [])

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom')
  $ionicConfigProvider.tabs.style("standard");
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
        return $ocLazyLoad.load(['src/home/homeCtrl.js', 'src/home/home.css'])
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
        return $ocLazyLoad.load(['src/information/informationCtrl.js', 'src/information/information.css'])
      }]
    }
  })

  .state('tab.information-page', {
    url: '/information/page/:pageId',
    views: {
      'tab-home': {
        templateUrl: 'src/information/detail/page.html',
        controller: 'PageCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/information/detail/detailCtrl.js','src/information/detail/detail.css'])
      }]
    }
  })

  .state('tab.information-special', {
    url: '/information/special/:specialId',
    views: {
      'tab-home': {
        templateUrl: 'src/information/detail/special.html',
        controller: 'SpecialPageCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/information/detail/detailCtrl.js','src/information/detail/detail.css'])
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
        return $ocLazyLoad.load(['src/programme/programmeCtrl.js', 'src/programme/programme.css'])
      }]
    }
  })

  .state('tab.programmeDetail', {
    url: '/programme/:programmeId',
    views: {
      'tab-home': {
        templateUrl: 'src/programme/detail/detail.html',
        controller: 'ProgrammeDetailCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/programme/detail/detailCtrl.js', 'src/programme/detail/detail.css'])
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
        return $ocLazyLoad.load(['src/goods/goodsCtrl.js', 'src/goods/goods.css'])
      }]
    }
  })

  .state('tab.goodsDetail', {
    url: '/goods/:goodsId',
    views: {
      'tab-home': {
        templateUrl: 'src/goods/detail/detail.html',
        controller: 'GoodsDetailCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/goods/detail/detailCtrl.js', 'src/goods/detail/detail.css'])
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
        return $ocLazyLoad.load(['src/meets/meetsCtrl.js', 'src/meets/meets.css'])
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
        return $ocLazyLoad.load(['src/waiter/waiterCtrl.js', 'src/waiter/waiter.css'])
      }]
    }
  })

  .state('tab.consult', {
    url: '/consult',
    views: {
      'tab-home': {
        templateUrl: 'src/waiter/consult/consult.html'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('src/waiter/consult/consult.css')
      }]
    }
  })

  .state('tab.apply', {
    url: '/apply',
    views: {
      'tab-home': {
        templateUrl: 'src/waiter/apply/apply.html',
        controller: 'ApplyCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/waiter/apply/apply.css', 'src/waiter/apply/applyCtrl.js'])
      }]
    }
  })

  .state('tab.applyDetail', {
    url: '/apply/:applyId',
    views: {
      'tab-home': {
        templateUrl: 'src/waiter/apply/detail.html',
        controller: 'ApplyDetailCtrl'
      }
    },
    resolve: {
      loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/waiter/apply/detail.css', 'src/waiter/apply/detailCtrl.js'])
      }]
    }
  })

  .state('tab.more', {
    url: '/more',
    views: {
      'tab-home': {
        templateUrl: 'src/home/more.html'
      }
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
        return $ocLazyLoad.load(['src/find/findCtrl.js', 'src/find/find.css'])
      }]
    }
  })

  .state('tab.read', {
    url: '/read',
    views: {
      'tab-read': {
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

  .state('tab.myRead', {
    url: '/myRead',
    views: {
      'tab-mine': {
        templateUrl: 'src/mine/myRead/myRead.html',
        controller: 'MyReadCtrl'
      }
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/mine/myRead/myReadService.js']).then(function () {
          return $ocLazyLoad.load(['src/mine/myRead/myRead.css','src/mine/myRead/myReadCtrl.js'])
        })
      }]
    }
  })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-mine': {
        templateUrl: 'src/mine/about/about.html'
      }
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/mine/about/about.css'])
      }]
    }
  })

  .state('tab.contact', {
    url: '/contact',
    views: {
      'tab-mine': {
        templateUrl: 'src/mine/contact/contact.html',
        controller: 'ContactCtrl'
      }
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['src/mine/contact/contact.css','src/mine/contact/contactCtrl.js'])
      }]
    }
  })

  .state('tab.login', {
    url: '/login',
    views: {
      'tab-mine': {
        templateUrl: 'src/mine/login/login.html',
        controller: 'LoginCtrl'
      }
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('src/mine/login/loginService.js').then(function () {
          return $ocLazyLoad.load(['src/mine/login/login.css','src/mine/login/loginCtrl.js'])
        })
      }]
    }
  })

  .state('tab.register', {
    url: '/register',
    views: {
      'tab-mine': {
        templateUrl: 'src/mine/register/register.html',
        controller: 'RegisterCtrl'
      }
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('src/mine/register/registerService.js').then(function () {
          return $ocLazyLoad.load(['src/mine/register/register.css','src/mine/register/registerCtrl.js'])
        })
      }]
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home')
})

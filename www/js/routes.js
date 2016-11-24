angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

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
                loadMyFiles: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load(['src/home/homeService.js','src/home/slide-box/information/informationService.js','src/home/slide-box/programme/programmeService.js','src/home/slide-box/goods/goodsService.js','src/home/slide-box/meets/meetsService.js','src/home/slide-box/waiter/waiterService.js']).then( function() {
                      return $ocLazyLoad.load(['src/home/homeCtrl.js','src/home/home.css','src/home/slide-box/homes/homesCtrl.js','src/home/slide-box/homes/homes.css'])
                    })
                }]
            }
    })

  .state('tab.election', {
      url: '/election',
      views: {
        'tab-election': {
          templateUrl: 'src/election/election.html',
          controller: 'ElectionCtrl'
        }
      },
      resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load(['src/election/electionCtrl.js'])
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
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load(['src/read/readCtrl.js'])
                }]
            }
    })

    .state('tab.category', {
      url: '/category',
      views: {
        'tab-category': {
          templateUrl: 'src/category/category.html',
          controller: 'CategoryCtrl'
        }
      },
      resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load(['src/category/categoryCtrl.js'])
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
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load(['src/mine/mineCtrl.js'])
                }]
            }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

})
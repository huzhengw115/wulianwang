angular.module('starter.services', [])
.service('commentService', function () {
  
})
.factory('LoaderService', function($rootScope, $ionicLoading) {
  return {
    show : function() {
      $rootScope.loading = $ionicLoading.show({
        //content: '<i class="icon-ion-dog"></i>',
        template: '<i>加载中...</i>',
        animation: 'fade-in',
        showBackdrop: true,
        minWidth: 200,
        showDelay: 10
      });
    },
    hide : function(){
      $ionicLoading.hide();
    }
  }
})

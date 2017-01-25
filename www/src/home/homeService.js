angular.module('Home', [])

.service('homeService', function () {
  // 首页轮播图的获取
  var homeBanner = [{
    "id": 0,
    "src": "img/home-banner/app-banner-one.jpg"
  },{
    "id": 1,
    "src": "img/home-banner/app-banner-two.jpg"
  },{
    "id": 2,
    "src": "img/home-banner/app-banner-three.jpg"
  }]

  return {
    homeBanner: homeBanner
  }
})

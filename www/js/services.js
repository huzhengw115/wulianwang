angular.module('starter.services', [])
.factory('LoaderService', function ($rootScope, $ionicLoading) {
  return {
    show: function () {
      $rootScope.loading = $ionicLoading.show({
        // content: '<i class="icon-ion-dog"></i>',
        template: '<i>加载中...</i>',
        animation: 'fade-in',
        showBackdrop: true,
        minWidth: 200,
         showDelay: 10
      })
    },
    hide: function () {
      $ionicLoading.hide()
    }
  }
})

.service('swipeService', function ($document) {

  var photoswipe = function (tab) {
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
    var databigpic = angular.element($document.find(tab))
    databigpic.ready(function () {
      var imgs = databigpic.find("img")
      console.log('imgs:',imgs)
      for(var index = 0; index < imgs.length; ++index) {
        var img = imgs[index]
        if(img.naturalWidth == 0 && img.naturalHeight == 0) {
          // 绑定图片加载完成事件，加载完以后才能获取图片Size
          angular.element(img).bind("load", imgOnload(img, index))
        } else {
          imgOnload(img, index)()
        }
      }
    })
  }

  function clearHref (tab) {
    // 将页面中的a标签点击事件都禁止掉
    var hrefClcik = angular.element($document.find(tab))
    hrefClcik.ready(function () {
      var hrefs = hrefClcik.find("a")
      console.log('hrefs:', hrefs)
      for(var index = 0; index < hrefs.length; ++index) {
        var label = hrefs[index]
        // label.href = ''// 这种方法href为空了，但是APP的默认路径为首页，并不能行
        label.style.cssText = "pointer-events:none"
      }
    })
    console.log('禁止掉了')
  }

  return{
    photoswipe: photoswipe,
    clearHref: clearHref
  }

})

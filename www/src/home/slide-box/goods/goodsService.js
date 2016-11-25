angular.module('Goods', [])

.service('goodsService', function ($http, $q) {
  // 获取
  var getGoodsListItem = function () {
    var goodsListItem = []
    var deferred = $q.defer()

    $http.get('json/data.json')
      .success(function (data) {
        goodsListItem = data.datas
        deferred.resolve(goodsListItem)
        // console.log(goodsListItem);
      })
      .error(function (err) {
        console.log('读取数据失败')
        deferred.reject()
      })
    return deferred.promise
  }

  return {
    getGoodsListItem: getGoodsListItem
  }
})

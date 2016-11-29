angular.module('Tender', [])

.controller('TenderCtrl', function ($scope, $timeout, goodsService) {
  // 二级栏目的首选项
  $scope.slideGoodsNumber = 9

  // 二级栏目的选择
  $scope.selectGoodsView = function (tabNumber) {
    $scope.slideGoodsNumber = tabNumber
    $scope.$emit('to-parent', tabNumber)
  }

  $scope.doRefresh = function () {
    goodsService.getGoodsListItem().then(function (goodsListItem) {
      $scope.tenderListItem = goodsListItem
      console.log('下拉:', $scope.tenderListItem)
    })
      .finally(function () {
        // 停止广播ion-refresher
        $scope.$broadcast('scroll.refreshComplete')
      })
    $timeout(function () {
      // $scope.More = true;
    }, 1000)
  }

  $scope.doRefresh()
})
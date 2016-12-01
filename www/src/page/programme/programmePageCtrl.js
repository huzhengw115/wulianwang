angular.module('Home', [])

.controller('ProgrammePageCtrl', function ($scope, pageService, $stateParams, swipeService) {
  //获得详情页的id值
  var programmePageId = $stateParams.programmePageId
  console.log('programmePageId:',programmePageId)
  //获取详情页的数据
  var getProgrammeData = function (programmeId) {
    pageService.getProgrammeData(programmeId).then(function (programmeData) {
      $scope.programmeData = programmeData
      console.log('programmeData:',programmeData)
      swipeService.photoswipe()
    })
  }
  //获取热点的数据
  var getProgrammeHotData = function () {
    pageService.getProgrammeHotData().then(function (programmeHotData) {
      $scope.programmeHotData = programmeHotData
      console.log('programmeHotData:',programmeHotData)
    })
  }
  // getProgrammeData(programmeId)
  // getProgrammeHotData()
})

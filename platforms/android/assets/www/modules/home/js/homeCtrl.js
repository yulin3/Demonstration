/**
 * Created by yulin on 7/12/2015.
 */
define(["../module"], function (module) {
  module.controller("homeCtrl", ["$scope", function ($scope) {

    $scope.aa = function() {
      $scope.globalParam.backStatus = true;
      window.location.href = "#/homeList";
    }


    }])
})

/**
 * Created by yulin on 7/12/2015.
 */
define(["../module"], function (module) {
  module.controller("homeCtrl", ["$scope", function ($scope) {

    $scope.aa = function() {
      $scope.globalParam.backStatus = true;
      window.location.href = "#/homeList";
    }


    $scope.mainListData = [
      {
        img : "./img/house.jpeg",
        title : "金玉蓝湾",
        title2 : "1号楼",
        title3 : "整租",
        title4 : "主卧",
        distance : "8.8km",
        area : "广东省",
        area2 : "福田区",
        btn : "免中介费",
        price : "2100元/月"
      },
      {
        img : "./img/house1.jpg",
        title : "婉居婷",
        title2 : "1号楼",
        title3 : "整租",
        title4 : "主卧",
        distance : "5.8km",
        area : "广东省",
        area2 : "罗湖区",
        btn : "免中介费",
        price : "2700元/月"
      },
      {
        img : "./img/house2.jpg",
        title : "半月山庄",
        title2 : "1号楼",
        title3 : "整租",
        title4 : "主卧",
        distance : "8.8km",
        area : "广东省",
        area2 : "龙岗区",
        btn : "免中介费",
        price : "1600元/月"
      },
      {
        img : "./img/house3.jpg",
        title : "君美心家园",
        title2 : "1号楼",
        title3 : "整租",
        title4 : "主卧",
        distance : "3.8km",
        area : "广东省",
        area2 : "南山区",
        btn : "免中介费",
        price : "1800元/月"
      },
      {
        img : "./img/house4.jpg",
        title : "留仙居",
        title2 : "1号楼",
        title3 : "整租",
        title4 : "主卧",
        distance : "2.8km",
        area : "广东省",
        area2 : "福田区",
        btn : "免中介费",
        price : "3100元/月"
      }
    ]


    }])
})

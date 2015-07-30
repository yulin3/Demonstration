/**
 * Created by yulin on 7/12/2015.
 */
define([
  'ionic',
  'home/nameSpace',
  'function/nameSpace',
  'mine/nameSpace',
  'cordova'
], function () {
  'use strict';
  return angular.module('app', ['ionic', 'app.home', 'app.function', 'app.mine'], function ($compileProvider, $sceProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|cdvfile|data):/);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|cdvfile|data):/);
    $sceProvider.enabled(false);
  })
    .run(['$ionicPlatform', function ($ionicPlatform) {
        //$ionicPlatform.ready(function () {
        //    if (window.cordova && window.cordova.plugins.Keyboard) {
        //        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //    }
        //    if (window.StatusBar) {
        //        StatusBar.styleDefault();
        //    }
        //});
    }])
    .controller("bodyCtrl", ["$scope", "$rootScope", "$ionicHistory", function($scope, $rootScope, $ionicHistory) {
      $scope.globalParam = {
        "backStatus": false
      };
      $scope.goBack = function() {
        var localParam = $ionicHistory.backView().stateId;
        if (localParam == "tab.home" || localParam == "tab.mine" ) {
          $scope.globalParam.backStatus = false;
        };
        $ionicHistory.goBack();
      };

    }])

    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {//配置路由
      $stateProvider
        .state('tab', {
          url: "/tab",
          abstract: true,
          templateUrl: "./modules/tabs.html"
        })
      /**********************首页模块*****************************************/
        .state('tab.home', {
          url: '/home',
          views: {
            'tab-home': {
              templateUrl: './modules/home/html/home.html',
              controller: 'homeCtrl'
            }
          }
        })
      /**********************功能模块*****************************************/
        .state('tab.function', {
          url: '/function',
          views: {
            'tab-function': {
              templateUrl: './modules/function/html/function.html',
              controller: 'functionCtrl'
            }
          }
        })
      /**********************我的模块*****************************************/
        .state('tab.mine', {
          url: '/mine',
          views: {
            'tab-mine': {
              templateUrl: './modules/mine/html/mine.html',
              controller: 'mineCtrl'
            }
          }
        })

        //子页面路由
        .state('homeList', {
          url: '/homeList',
          templateUrl: './modules/home/html/homeList.html',
          controller: 'homeCtrl'
        })

      $urlRouterProvider.otherwise('tab/home');
      /**************************************************************************************************/

      //配置android显示样式
      $ionicConfigProvider.tabs.position('bottom')//ios 默认在底部、android默认在顶部
      $ionicConfigProvider.navBar.alignTitle('center'); //ios 默认居中、android默认左边

    }]);
});

/**
 * Created by yulin on 7/12/2015.
 */
require.config({
  paths: {
    'ionic': '../lib/ionic/js/ionic.bundle',
    'jquery': '../lib/jquery/dist/jquery',
    'indexeddb': '../lib/IndexedDBShim/dist/IndexedDBShim',//解决indexdDB数据库的平台兼容问题
    'cordova': '../cordova'
  },
  shim: {
    'ionic': {
      deps: ['jquery']
    }
  }
});

require(['../modules/app'], function () {
  'use strict';
  angular.bootstrap(document, ['app']);
});
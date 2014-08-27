angular.module('ausadhi', ['ionic', 'ngCordova', 'ausadhi.controllers', 'ausadhi.factories'])

.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/medicines');

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/layout.html',
    controller: 'AppCtrl'
  })

  .state('app.medicines', {
    url: '/medicines',
    views: {
      'tabs-medicines' :{
        templateUrl: 'templates/medicines.html',
        controller: 'MedicinesCtrl'
      }
    }
  })

  .state('app.medicine', {
    url: '/medicine/:medicineId',
    views: {
      'tabs-medicines' :{
        templateUrl: 'templates/medicine.html',
        controller: 'MedicineCtrl'
      }
    }
  })

  .state('app.pictures', {
    url: '/pictures',
    views: {
      'tabs-pictures' :{
        templateUrl: 'templates/pictures.html',
        controller: 'PicturesCtrl'
      }
    }
  })

  .state('app.about', {
    url: '/about',
    views: {
      'tabs-about' :{
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      }
    }
  })

}]);


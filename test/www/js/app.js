// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic','ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {      

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      // abstract: true,
      params: {data: null},
      templateUrl: 'templates/menu.html',
      controller: 'ContentCtrl'
    })

    .state('app.events', {
        url: '/events',
        views: {
            'menuContent': {
                  templateUrl: 'templates/events.html',
                  controller: 'ContentCtrl'
            }
          }
      })

    .state('app.event-details', {
        url: '/events/:eventId',
        views: {
            'menuContent': {
                  templateUrl: 'templates/event-details.html',
                  controller: 'ContentCtrl'
            }
          }
    })

    .state('app.my-events', {
        url: '/my-events',
        views: {
            'menuContent': {
                  templateUrl: 'templates/my-events.html',
                  controller: 'ContentCtrl'
            }
          }
      })

    .state('app.chat', {
        url: '/chat',
        views: {
            'menuContent': {
                  templateUrl: 'templates/chat.html'
                  // controller: 'ChatCtrl'
            }
          }
      })

    .state('app.map', {
        url: '/map',
        views: {
            'menuContent': {
                  templateUrl: 'templates/map.html',
                  controller: 'MapCtrl'
            }
          }
      })

    .state('app.settings', {
        url: '/settings',
        views: {
            'menuContent': {
                  templateUrl: 'templates/settings.html',
                  controller: 'ContentCtrl'
            }
          }
      })

     .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

    .state('app.more', {
        url: '/more',
        views: {
            'menuContent': {
                  templateUrl: 'templates/more.html',
                  controller: 'ContentCtrl'
            }
          }
      })

  // if none of the above states are matched, use this as the fallback
 $urlRouterProvider.otherwise('/login');
})


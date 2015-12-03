// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
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
  $urlRouterProvider.otherwise('/app/events');
})

.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading){

    ionic.Platform.ready(function(){
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    });

    var pos = {
                enableHighAccuracy: true
            };

          $cordovaGeolocation.getCurrentPosition(pos).then(function(pos) {
            var lat = pos.coords.latitude;
            var long = pos.coords.longitude;

                $scope.position = new google.maps.LatLng(lat, long);
                console.log(JSON.stringify($scope.position));
                var mapOptions = {
                    zoom: 15,
                    center: $scope.position,
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                }
              
                var map = new google.maps.Map(document.getElementById('map'), mapOptions); 
                $scope.map = map;  
                $ionicLoading.hide();           

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: $scope.position,
                    tite: 'Football'
                });

                marker.setMap(map);
            }, 
            function(error) {  
                  $ionicLoading.hide();                  
                  alert('Unable to get location: ' + error.message);
              }, pos);

        })
})

.controller('ContentCtrl', function($scope, $log, $ionicSideMenuDelegate, $ionicModal, Events, $stateParams, $location, $http){
  
  // var headers = {
  //       'Access-Control-Allow-Origin' : '*',
  //       'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     };

      

  // //console.log(headers);
  // // $http.get("http://api.deezer.com/artist/27")
  // //.then(function (response) {$scope.names = response.data; alert(JSON.stringify($scope.names));});
  // $http({method: 'GET', url: 'http://api.deezer.com/artist/27', headers: headers
  // });

$http({method: 'GET', url: 'http://djangounchained-dechochernev.c9users.io/api/v1/events/?format=json'})
      .success(function(data, status, headers, config){
        $scope.ads = data;
        alert(JSON.stringify($scope.ads));
      })
      .error(function(data, status, headers, config){
        $log.warn(data);
      })


  $ionicSideMenuDelegate.canDragContent(true);
  $scope.toggleNav = function(){
    $ionicSideMenuDelegate.toggleLeft();
  }

  $ionicModal.fromTemplateUrl('templates/new-event.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createEvent = function(event){
    $scope.modal.show();
  }

  $scope.closeModal = function(){
    $scope.modal.hide();
  }

  $scope.events = Events.all();
  $scope.event = Events.get($stateParams.eventId);

  $scope.myEvents = [
    {
      id: 3,
      title: 'Football123',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
      distance: '3',
      image: 'http://placehold.it/100x100'
    }
  ];

  $scope.removeEvent = function(index){
    $scope.myEvents.splice($scope.events[index],1);
  }

  $scope.addEvent = function(index){
      $scope.myEvents.push($scope.events[index]);  
    console.log($scope.myEvents);
  }
})

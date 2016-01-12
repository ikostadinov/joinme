app.controller('ContentCtrl', function($scope, $log, $ionicLoading, $cordovaGeolocation, $cordovaCamera, $ionicSideMenuDelegate, $ionicModal, EventsService, $stateParams, $location, $http){
angular.element(document.querySelector('#map2')).css({'border':'3px solid blue'});
  // $scope.nickname = $stateParams.data.nickname;
  // $scope.displayPicture = $stateParams.data.displayPicture;
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
// $http({method: 'GET', url: 'http://djangounchained-dechochernev.c9users.io/api/v1/events/?format=json'})
//       .success(function(data, status, headers, config){
//         $scope.ads = data;
//         alert(JSON.stringify($scope.ads));
//       })
//       .error(function(data, status, headers, config){
//         $log.warn(data);
//       })
// var pos = {
//                 enableHighAccuracy: true
//             };
//           $cordovaGeolocation.getCurrentPosition(pos).then(function(pos) {
//             var lat = pos.coords.latitude;
//             var long = pos.coords.longitude;
//                 $scope.position = new google.maps.LatLng(lat, long);
//                 console.log(JSON.stringify($scope.position));
//                 var mapOptions = {
//                     zoom: 15,
//                     center: $scope.position,
//                     mapTypeId: google.maps.MapTypeId.TERRAIN
//                 }
              
//                 var map = new google.maps.Map(document.getElementById("map2"), mapOptions); 
//                 console.log(map);
//                 $scope.map = map;  
//                 $ionicLoading.hide();   
// //BEGIN
// //                 var input = /** @type {HTMLInputElement} */(
// //       document.getElementById('pac-input'));
// //   // Create the autocomplete helper, and associate it with
// //   // an HTML text input box.
// //   var autocomplete = new google.maps.places.Autocomplete(input);
// //   autocomplete.bindTo('bounds', map);
// // google.maps.event.addListener(autocomplete, 'place_changed', function() {
// //     //infowindow.close();
// //     var place = autocomplete.getPlace();
// //     if (!place.geometry) {
// //       return;
// //     }
// //     if (place.geometry.viewport) {
// //       map.fitBounds(place.geometry.viewport);
// //     } else {
// //       map.setCenter(place.geometry.location);
// //       map.setZoom(17);
// //     }
// //     // Set the position of the marker using the place ID and location.
// //     marker.setPlace(/** @type {!google.maps.Place} */ ({
// //       placeId: place.place_id,
// //       location: place.geometry.location
// //     }));
// //     marker.setVisible(true);
// //     //infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
// //         //'Place ID: ' + place.place_id + '<br>' +
// //        // place.formatted_address + '</div>');
// //     //infowindow.open(map, marker);
// //   });        
// //END
//                 var marker = new google.maps.Marker({
//                     map: $scope.map,
//                     position: $scope.position,
//                     tite: 'Football'
//                 });
//                 marker.setMap(map);
//             }, 
//             function(error) {  
//                   $ionicLoading.hide();                  
//                   alert('Unable to get location: ' + error.message);
//               }, pos);
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
  var marker = null;
  var addressComponents = null;
  var galin = null;

  $scope.createEvent = function(event){
    $scope.modal.show();
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
              
                var map = new google.maps.Map(document.getElementById("map"), mapOptions); 
                console.log(map);
                $scope.map = map;  
                $ionicLoading.hide();
                 map.addListener('click', function(event){
                  var lat = event.latLng.lat();
                  var lng = event.latLng.lng();
                  // marker = new google.maps.Marker({
                  //     map: $scope.map,
                  //     position: new google.maps.LatLng(lat, lng)
                  // });

                  // marker.setPosition(event.latLng);
                  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
                     $scope.geocoder.geocode({'location': event.latLng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                      addressComponents = results[0].address_components;
                      galin = results[0].geometry.location;
                      // alert(galin);
                      if (results[1]) {
                        marker.setPosition(event.latLng);
                        input.value = results[0].formatted_address;
                        // infowindow.setContent(results[1].formatted_address);
                        // infowindow.open(map, marker);
                      } else {
                        window.alert('No results found');
                      }
                    } else {
                      window.alert('Geocoder failed due to: ' + status);
                    }
                  });
                  // input.value = event.latLng;

                  // if($scope.map.marker) $scope.map.marker.setMap(null);
                  // if($scope.map.marker) delete $scope.map.marker;
                  // $scope.map.marker = new google.maps.Marker({
                  //   map: $scope.map,
                  //     position: new google.maps.LatLng(lat, lng)
                  // })
                  // marker.setMap(null);
                  }) 
                $scope.geocoder = new google.maps.Geocoder();
                $scope.geocodeLatLng = function(geocoder, map) {
                  var input = document.getElementById('pac-input');
                  // var latlngStr = input.split(',', 2);
                  var latlng = $scope.position;
                  $scope.geocoder.geocode({'location': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                      addressComponents = results[0].address_components;
                        var location_obj = {}
                        for(i=0; i<addressComponents.length; i++){
                            if("street_number" in addressComponents[i].types){
                                location_obj.street_number = addressComponents['long_name'];
                            }
                            if("route" in addressComponents[i].types){
                                location_obj.street_name = addressComponents['long_name'];
                            }
                            if(["locality", "political"] in addressComponents[i].types){
                                location_obj.city = addressComponents['long_name'];
                            }

                            if([ "administrative_area_level_1", "political" ]
                                in addressComponents[i].types){
                                location_obj.state = addressComponents['long_name'];
                            }
                            if([ "country", "political" ]
                                in addressComponents[i].types){
                                location_obj.country = addressComponents['long_name'];
                            }
                            if([ "postal_code" ]
                                in addressComponents[i].types){
                                location_obj.post_code = addressComponents['long_name'];
                            }

                        }
                        console.log(location_obj);
                      galin = results[0].geometry.location;
                      // galin = results[0].location;

                      // for(key in addressComponents){
                      //   console.log(addressComponents[key]);
                      // }
                      console.log("address comp:" );
                      if (results[1]) {
                        $scope.map.setZoom(11);
                        var marker = new google.maps.Marker({
                          position: latlng,
                          map: map
                        });
                        input.value = results[0].formatted_address;
                        // infowindow.setContent(results[1].formatted_address);
                        // infowindow.open(map, marker);
                      } else {
                        window.alert('No results found');
                      }
                    } else {
                      window.alert('Geocoder failed due to: ' + status);
                    }
                  });
                }
                $scope.geocodeLatLng();
//BEGIN
                var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
                // input.value= $scope.position;
  // Create the autocomplete helper, and associate it with
  // an HTML text input box.
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
google.maps.event.addListener(autocomplete, 'place_changed', function() {
    //infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    // Set the position of the marker using the place ID and location.
    marker.setPlace(/** @type {!google.maps.Place} */ ({
      placeId: place.place_id,
      location: place.geometry.location
    }));
    marker.setVisible(true);
    //infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        //'Place ID: ' + place.place_id + '<br>' +
       // place.formatted_address + '</div>');
    //infowindow.open(map, marker);
  });        
//END
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
  }
  $scope.closeModal = function(){
    $scope.modal.hide();
  }
  $scope.getEvents = function(){EventsService.getAllEvents().then(function(resp){
      $scope.events = resp.data;
      $scope.event = EventsService.get($stateParams.eventId, $scope.events);
    });
  }
  $scope.getEvents();
  $scope.doRefresh = function(){
    $http.get('http://djangounchained-dechochernev.c9users.io/api/v1/events/')
      .success(function(newEvents){
        $scope.events = newEvents;
      })
      .finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
  }
  $scope.takePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
  // An error occured. Show a message to the user
});
  }
  $scope.choosePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
  // An error occured. Show a message to the user
});
  }
  $scope.myEvents = [
    {
      id: 3,
      title: 'Football123',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
      distance: '3',
      image: 'http://placehold.it/100x100'
    }
  ];
   $scope.disableTap = function(){
    container = document.getElementsByClassName('pac-container');
    // disable ionic data tab
    angular.element(container).attr('data-tap-disabled', 'true');
    // leave input field if google-address-entry is selected
    angular.element(container).on("click", function(){
        document.getElementById('pac-input').blur();
    });
  }
  $scope.checkLocationDet = function(){
                      for(key in addressComponents){
                        console.log(addressComponents[key]);
                      }
                      console.log("galio: " + galin);
}
  $scope.sendData = function(event){
    $http({
      url: 'http://djangounchained-dechochernev.c9users.io/api/event_list/',
      method: 'POST',
      contentType: "application/json",
      data: {
        name: event.name,
        capacity: event.capacity,
        description: event.description,
        status: event.status,
        created: event.created,
        begin_time: event.begin_time,
        end_time: event.end_time,
        location: null
        // {
        //       'name': addressComponents[0],
        //       'street': addressComponents[1],
        //       'postcode': addressComponents[2],
        //       'country': addressComponents[3],
        //       'city':addressComponents[4],
        //       'longitude':addressComponents[5],
        //       'latitude':addressComponents[6],
        //       'state':addressComponents[7]
        //       }
    }
    }).success(function(data) {
        alert(event.name + " created successfully!"); 
              console.log("location: "+data.location);

    });
  }
  $scope.removeEvent = function(index){
    $scope.myEvents.splice($scope.events[index],1);
  }
  $scope.addEvent = function(index){
      $scope.myEvents.push($scope.events[index]);  
    console.log($scope.myEvents);
  }
})
app.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading){






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
                console.log(map);
                $scope.map = map;  
                $ionicLoading.hide();   
//BEGIN
                var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

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

            

        })
angular.element(document.querySelector('#map')).html("NewText");
})

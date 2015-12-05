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

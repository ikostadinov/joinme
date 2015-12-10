app.controller('ContentCtrl', function($scope, $log, $cordovaCamera, $ionicSideMenuDelegate, $ionicModal, EventsService, $stateParams, $location, $http){

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

  $scope.sendData = function(event){
    $http({
      url: 'http://djangounchained-dechochernev.c9users.io/api/test1/',
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
    }
    }).success(function(data) {
        alert(event.name + " created successfully!"); 
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
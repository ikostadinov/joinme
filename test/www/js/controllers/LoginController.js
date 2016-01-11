app.controller('LoginCtrl', function($scope, $state, $cordovaOauth, $http, loginService) {
  
  $scope.signIn = function() {
    $state.go('app.events');
  };

    $scope.user = {};
    $scope.loginWithFacebook = function(){
       $cordovaOauth.facebook("438342559688186", ["public_profile", "email"]).then(function(result) {
            // results
            // alert(result.access_token);
            $http.get('https://graph.facebook.com/v2.5/me?fields=id,name,picture,location,gender&access_token=' + result.access_token).success(function(data, status, header, config){
           // $http.get('https://graph.facebook.com/v2.5/me?fields=id,name,picture,location&access_token=CAACEdEose0cBANMzQSjOylmN61GQG6uCAZBZChkU1AehfBeVGWVp87CQmZAiG3aTQULoKrHuSe3XBJD3CYooJEcyRPyqt9uEsCd8NztPqRLqDisUH0WVIWbABZCSnGJFjDiNcjspQ9cdt99WnCtPsS6x0AOvOVlsM6IO86xIdRiEYd7V4PKIqYEHGxlQJpUZCb5ZB71jKVCy9j15o9biVegelYoTvLPtQZD').success(function(data, status, header, config){
              $scope.user.id = data.id;
              $scope.token = result.access_token;
              $scope.user.fullName = data.name;
              $scope.user.displayPicture = data.picture.data.url;
              $scope.user.gender = data.gender;
              // alert($scope.user.gender);
              // $scope.user.location = data.location.name;
              // alert($scope.user.location);
              // alert(data.location);
              console.log("TOKEN: " + JSON.stringify(result.access_token));
              console.log("location: "+JSON.stringify(data.location));
              console.log(JSON.stringify(data));

              // alert($scope.user.fullName+" "+$scope.user.displayPicture);
              // $state.go('ole', {data: {nickname: $scope.user.fullName, displayPicture: $scope.user.displayPicture, location: $scope.user.location}});
              $state.go('app', {data: {nickname: $scope.user.fullName, displayPicture: $scope.user.displayPicture}});
            })
        }, function(error) {
            alert(error);
        });
        
        // loginService.sendData($scope.user.fullName);
        

        $http.post('http://djangounchained-dechochernev.c9users.io/api/v1/events/', {id: $scope.user.id, access_token: $scope.token, username: $scope.user.fullName}).then(function(res){
          $scope.response = res;
        });


        
    }
  
})
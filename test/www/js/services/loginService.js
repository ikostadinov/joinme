app.factory('loginService', function($http){
	
return {
		sendData: function(userData){
			return $http({
				method: 'POST',
				url: 'http://djangounchained-dechochernev.c9users.io/api/v1/events/',
				data: userData
			});
		}
	}	
});
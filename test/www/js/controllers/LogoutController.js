app.controller('LogoutCtrl', function($scope, $state) {
	$scope.logout = function(){
		$state.go('login');
	}
});
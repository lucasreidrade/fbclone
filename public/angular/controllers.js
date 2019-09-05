myApp.controller('signupFormCtrl', ['$scope','authentication', function($scope,authentication){
    $scope.pswStatus = "";
    $scope.pswMatch = true;

    $scope.validatePassword = function() {
        console.log('inside validate password');
        if($scope.password === $scope.password2)
        {
            $scope.pswStatus = "";
            $scope.pswMatch = true;
        }
        else
        {
            $scope.pswStatus = "Confirmation must match.";
            $scope.pswMatch = false;
        }
    };

    $scope.submit = function() {
        if($scope.password !== $scope.password2){
            return;
        }

        var newUser = {name:$scope.name, email:$scope.email, password:$scope.password };
        var rsp = authentication.register(newUser);
        console.log(rsp);
    };

}])
myApp.controller('loginFormCtrl', ['$scope', function($scope){

}])



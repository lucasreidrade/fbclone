myApp.controller('signupFormCtrl', ['$scope', 'authentication', function ($scope, authentication) {
    $scope.pswStatus = "";
    $scope.pswMatch = true;

    $scope.validatePassword = function () {
        if ($scope.password === $scope.password2) {
            $scope.pswStatus = "";
            $scope.pswMatch = true;
        }
        else {
            $scope.pswStatus = "Confirmation must match.";
            $scope.pswMatch = false;
        }
    };

    $scope.submit = function () {
        if ($scope.password !== $scope.password2) {
            return;
        }

        var newUser = { name: $scope.name, email: $scope.email, password: $scope.password };
        authentication.register(newUser);
    };

}])
myApp.controller('loginFormCtrl', ['$scope', 'authentication', function ($scope, authentication) {
    $scope.submit = function () {

        var user = { email: $scope.email, password: $scope.password };
        authentication.login(user);
    };

}])

myApp.controller('ProfileShowCtrl', ['$scope', '$document', 'userActions', function ($scope, $document, userActions) {

    var init = async function () {

        var viewUser = await userActions.getUserById(userActions.getViewId());
        var currUserId = userActions.getUserId();


        $scope.isUser = (viewUser._id === currUserId);
        $scope.isFollowing = viewUser.followers.includes(currUserId);

        $scope.userName = viewUser.name;
        if (viewUser.image) {
            $scope.imgSrc = viewUser.image.data;
        } else {
            $scope.imgSrc = '../images/profile_placeholder.png';
        }
        if (viewUser.bio) {
            $document[0].getElementById('bio').innerHTML = viewUser.bio.replace(/(?:\r\n|\r|\n)/g, '<br>');
        }
        else {
            $document[0].getElementById('bio').innerHTML = ''
        }
        $scope.$apply();
    }

    init();


    $scope.edit = function () {
        console.log('edit');
        userActions.redirectEditUser();
    }
    $scope.follow = function () {

        console.log('follow');
    }
    $scope.unfollow = function () {

        console.log('unfollow');
    }
}])



myApp.controller('profileFormCtrl', ['$scope', '$document', 'userActions', function ($scope, $document, userActions) {
    $scope.user = {};
    var init = async function () {

        var currUserId = userActions.getUserId();

        $scope.user = await userActions.getUserById(currUserId);

        $document[0].getElementById('name').value = $scope.user.name;

        if ($scope.user.image) {
            $scope.imgSrc = $scope.user.image.data;
        } else {
            $scope.imgSrc = '../images/profile_placeholder.png';
        }
        if ($scope.user.bio) {
            $document[0].getElementById('bio').value = $scope.user.bio;
        }
        else {
            $document[0].getElementById('bio').value = ''
        }
        $scope.$apply();
    };

    init();

    $scope.changePicture = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $scope.user.image = { 'data': e.target.result };
                $scope.imgSrc = e.target.result;

                $scope.$apply();
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    $scope.submit = function () {
        console.log('$scope.user');
        console.log($scope.user);
        userActions.updateUser($scope.user);

    };


}])



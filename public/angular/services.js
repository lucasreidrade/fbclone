
myApp.service('authentication', ['$http', '$window', function ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['myApp-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['myApp-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      //Check if token is expired
      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    var register = function(user) {
      var x = $http.post('/api/register', user);
      console.log(x);
      return x.success(function(data){
        saveToken(data.token);
      });
    };

    var login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    var logout = function() {
      $window.localStorage.removeItem('myApp-token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  }]);
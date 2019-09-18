myApp.service('url', ['$window', '$location', function ($window, $location) {
  var go = function (url, search = {}, hash = '') {
    var absUrl = url + '/';

    for (var k in search) {
      absUrl = absUrl + '?' + k + '=' + search[k] + '&';
    }
    absUrl = absUrl.slice(0, -1);
    if (hash) {
      absUrl = absUrl + "#" + hash;
    }
    $window.location.href = absUrl;
  };

  var search = function () {
    return $location.search();
  };

  var hash = function () {
    return $location.hash();
  };

  return {
    go: go,
    search: search,
    hash: hash
  };
}]);

myApp.service('authentication', ['$http', '$window', 'url', function ($http, $window, url) {
  var getToken = function () {
    return $window.localStorage['myApp-token'];
  }

  var isLoggedIn = function () {
    var token = $window.localStorage['myApp-token'];
    //Check if token is expired
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function () {
    if (isLoggedIn()) {
      var token = $window.localStorage['myApp-token'];
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.id;
    }
  };

  var register = function (user) {
    $http.post('/api/register', user).then(function (res) {
      var token = res.data.token;
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      $window.localStorage['myApp-token'] = token;

      url.go('/profile', { "id": payload.id });
    });
  };

  var login = function (user) {
    $http.post('/api/login', user).then(function (res) {
      var token = res.data.token;
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      $window.localStorage['myApp-token'] = token;

      url.go('/profile', { "id": payload.id });
    });
  };

  var logout = function () {
    $window.localStorage.removeItem('myApp-token');
  };

  return {
    getToken: getToken,
    currentUser: currentUser,
    isLoggedIn: isLoggedIn,
    register: register,
    login: login,
    logout: logout
  };
}]);


myApp.service('userActions', ['$http', 'authentication', 'url', function ($http, authentication, url) {

  var getUserId = function () {
    return authentication.currentUser();
  };

  var getViewId = function () {
    return url.search().id;
  };

  var getUserById = async function (userid) {
    var res = await $http.post('/api/getUserById', { "id": userid });
    return res.data.user;
  };

  var redirectEditUser = function () {
    url.go('/profile/edit', { "id": authentication.currentUser() });
  };

  var updateUser = function (user) {
    var token = authentication.getToken();

    $http.post('/api/updateUser', { "user": user }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      url.go('/profile', { "id": authentication.currentUser() });
    })
  };
  return {
    getUserId: getUserId,
    getViewId: getViewId,
    getUserById: getUserById,
    redirectEditUser: redirectEditUser,
    updateUser: updateUser
  };
}]);

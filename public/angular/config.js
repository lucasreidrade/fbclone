
myApp.config(function ($locationProvider) {

  // use the HTML5 mode so that url is pretty with angular redirect
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});
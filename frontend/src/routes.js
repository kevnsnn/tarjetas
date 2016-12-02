/* Enrutamiento */
/* Exportacion enrutamiento */
export default routesConfig;

/** @ngInject */
function routesConfig($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('red')
    .warnPalette('blue');
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/'); /* Ruta por defecto o en caso de fallo */

  /* Ruta componente tarjetas */
  $stateProvider
    .state('home', {
      url: '/',
      component: 'home',
      resolve: {redirectIfAuthenticated: _redirectIfAuthenticated}
    })
    .state('accesos', {
      url: '/accesos',
      component: 'accesos',
      resolve: {redirectIfAuthenticated: _redirectIfAuthenticated}
    })
    .state('socios', {
      url: '/socios',
      component: 'socios',
      resolve: {redirectIfNotAuthenticated: _redirectIfNotAuthenticated}
    })
    .state('tiendas', {
      url: '/tiendas',
      component: 'tiendas',
      resolve: {redirectIfNotAuthenticated: _redirectIfNotAuthenticated}
    })
    .state('empresa', {
      url: '/empresa',
      component: 'empresa',
      resolve: {redirectIfNotAuthenticated: _redirectIfNotAuthenticated}
    });

  function _redirectIfNotAuthenticated($q, $state, $auth) {
    const defer = $q.defer();
    if ($auth.isAuthenticated()) {
      defer.resolve();
      if (localStorage.getItem('type') === 'tienda') {
        $state.go('tiendas');
      } else {
        $state.go('socios');
      }
    } else {
      defer.reject('You are not logged');
      $state.go('accesos');
    }
    return defer.promise;
  }

  function _redirectIfAuthenticated($q, $state, $auth) {
    const defer = $q.defer();
    if ($auth.isAuthenticated()) {
      defer.reject('You are logged');
      if (localStorage.getItem('type') === 'tienda') {
        $state.go('tiendas');
      } else {
        $state.go('socios');
      }
    } else {
      defer.resolve();
    }
    return defer.promise;
  }

  $authProvider.loginUrl = 'http://localhost:8000/api/login';
}

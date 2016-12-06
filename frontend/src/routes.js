/* Enrutamiento */
/* Exportacion enrutamiento */
export default routesConfig;

/** @ngInject */
function routesConfig($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')     /* Color principal */
    .accentPalette('red')       /* Color acentuador */
    .warnPalette('blue');       /* Color resaltador */
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/'); /* Ruta por defecto o en caso de fallo */

  /* Rutas */
  $stateProvider
    /* Ruta pagina principal */
    .state('home', {
      url: '/',
      component: 'home',
      resolve: {redirectIfAuthenticated: _redirectIfAuthenticated}      /* Autoenrutamiento por verificacion de token */
    })
    /* Ruta pagina de registros y accesos */
    .state('accesos', {
      url: '/accesos',
      component: 'accesos',
      resolve: {redirectIfAuthenticated: _redirectIfAuthenticated}      /* Autoenrutamiento por verificacion de token */
    })
    /* Ruta pagina socios */
    .state('socios', {
      url: '/socios',
      component: 'socios',
      resolve: {redirectIfNotAuthenticated: _redirectIfNotAuthenticated} /* Autoenrutamiento por verificacion de token */
    })
    /* Ruta pagina tiendas */
    .state('tiendas', {
      url: '/tiendas',
      component: 'tiendas',
      resolve: {redirectIfNotAuthenticated: _redirectIfNotAuthenticated}  /* Autoenrutamiento por verificacion de token */
    });

  /* Funcion verificadora de autenticacion: caso usuario no autenticado */
  function _redirectIfNotAuthenticated($q, $state, $auth) {
    const defer = $q.defer(); /* Promesa */

    if ($auth.isAuthenticated()) {
      /* Caso usuario autenticado */
      defer.resolve(); /* Resolver promesa */
      /* Comprobacion tipo de usuario */
      if (localStorage.getItem('type') === 'tienda') {
        $state.go('tiendas'); /* Tipo tienda: redirecciona a ruta de tiendas */
      } else {
        $state.go('socios');  /* Tipo socio: redirecciona a ruta de socios */
      }
    } else {
      /* Caso usuario no autenticado */
      defer.reject('You are not logged'); /* Rechazar promesa */
      $state.go('accesos');               /* Redirecciona a ruta de accesos y registros */
    }
    return defer.promise;
  }

  /* Funcion verificadora de autenticacion: caso usuario autenticado */
  function _redirectIfAuthenticated($q, $state, $auth) {
    const defer = $q.defer(); /* Promesa */

    if ($auth.isAuthenticated()) {
      /* Caso usuario autenticado */
      defer.reject('You are logged'); /* Rechazar promesa */
      if (localStorage.getItem('type') === 'tienda') {
        $state.go('tiendas'); /* Tipo tienda: redirecciona a ruta de tiendas */
      } else {
        $state.go('socios'); /* Tipo socio: redirecciona a ruta de socios */
      }
    } else {
      /* Caso usuario no autenticado */
      defer.resolve(); /* Resolver promesa */
    }
    return defer.promise;
  }

  $authProvider.loginUrl = 'http://localhost:8000/api/login'; /* Ruta proveedora para accesos */
}

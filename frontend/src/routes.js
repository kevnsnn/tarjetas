/* Enrutamiento */
/* Exportacion enrutamiento */
export default routesConfig;

/** @ngInject */
function routesConfig($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
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
      component: 'home'
    })
    .state('accesos', {
      url: '/accesos',
      component: 'accesos'
    })
    .state('socios', {
      url: '/socios',
      component: 'socios'
    })
    .state('tiendas', {
      url: '/tiendas',
      component: 'tiendas'
    })
    .state('empresa', {
      url: '/empresa',
      component: 'empresa'
    });
}

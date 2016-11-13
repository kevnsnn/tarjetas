/* Enrutamiento */
/* Exportacion enrutamiento */
export default routesConfig;

/** @ngInject */
function routesConfig($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('teal')
    .warnPalette('red')
    .backgroundPalette('grey');
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/'); /* Ruta por defecto o en caso de fallo */

  /* Ruta componente tarjetas */
  $stateProvider
    .state('tarjetas', {
      url: '/tarjetas',
      component: 'tarjetas'
    })
    .state('home', {
      url: '/',
      component: 'home'
    });
}

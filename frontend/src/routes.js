/* Enrutamiento */
/* Exportacion enrutamiento */
export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
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

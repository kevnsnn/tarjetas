/* Clase del controlador del componente tarjetas */
class homeController {

  /* ngIngect */
  constructor($http, $log) {
    /* Declaracion de variables y servicios */
    this.$http = $http;
    this.$log = $log;
  }
}

/* Exportacion de componente */
export const home = {
  template: require('./home.html'),
  controller: homeController
};

/* Clase del controlador del componente home */
class homeController {

  /* ngIngect */
  constructor($http, $log) {
    /* Declaracion de variables y servicios */
    this.$http = $http;
    this.$log = $log;
    this.telefono = 910001122;
    this.correo = 'tarjetasIS2@gmail.com';
    this.icon = './images/icon.png';
  }
}

/* Exportacion de componente */
export const home = {
  template: require('./home.html'),
  controller: homeController
};

/* Clase del controlador del componente accesos */
class AccesosController {

  /* ngIngect */
  constructor($http, $log, $state, $mdDialog, $document) {
    /* Declaracion de variables y servicios */
    this.$http = $http;
    this.$log = $log;
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.icon = './images/icon.png';
    this.isRegistro = false;
    this.isSocio = false;
    this.isTienda = false;
  }

  registrar(tipo) {
    this.isRegistro = true;
    if (tipo === 0) {
      this.isSocio = true;
      this.isTienda = false;
    }
    if (tipo === 1) {
      this.isTienda = true;
      this.isSocio = false;
    }
  }

  /* Funcion que se encarga de realizar el post de tarjetas */
  registrarTarjeta() {
    /* Ejecucion de post */
    this.$http.post('http://localhost:8000/api/tarjetas', {nombre: this.nombre, primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido, direccion: this.direccion, telefono: this.telefono, email: this.email})
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Registro')
            .textContent('¡Se ha registrado correctamente!')
            .ok('Listo')
        );
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo del backend', reason);
      });
  }

  /* Funcion que se encarga de realizar el post de tarjetas */
  registrarTienda() {
    /* Ejecucion de post */
    this.$http.post('http://localhost:8000/api/tiendas', {nombreTienda: this.nombreTienda, direccion: this.direccionTienda,
      telefono: this.telefonoTienda})
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo del backend', reason);
      });
  }
}

/* Exportacion de componente */
export const accesos = {
  template: require('./accesos.html'),
  controller: AccesosController
};

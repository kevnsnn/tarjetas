/* Clase del controlador del componente tarjetas */
class tarjetasController {

  /* ngIngect */
  constructor($http, $log) {
    /* Declaracion de variables y servicios */
    this.$http = $http;
    this.$log = $log;
  }

  /* Funcion que se encarga de realizar el post de tarjetas */
  registrarTarjeta() {
    /* Ejecucion de post */
    this.$http.post('http://localhost:8000/api/tarjetas', {nombre: this.nombre, primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido, direccion: this.direccion, telefono: this.telefono, email: this.email})
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
export const tarjetas = {
  template: require('./tarjetas.html'),
  controller: tarjetasController
};

/* Clase del controlador del componente accesos */
class TiendasController {

  /* ngIngect */
  constructor($http, $log, $state, $mdDialog, $document) {
    /* Declaracion de variables y servicios */
    this.$http = $http;
    this.$log = $log;
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.icon = './images/icon.png';
    this.isAction = false;
    this.isRegistro = false;
    this.isHistorial = false;
    this.compras = [];
    this.selected = [];
    this.logOrder = (order => {
      this.$log.debug(`Order: ${order}`);
    });
    this.query = {
      order: '_id',
      limit: 5,
      page: 1
    };
    this.promise = null;
    this.getCompras();
  }

  registrar(tipo) {
    this.isAction = true;
    if (tipo === 0) {
      this.isRegistro = true;
      this.isHistorial = false;
    }
    if (tipo === 1) {
      this.isHistorial = true;
      this.isRegistro = false;
    }
  }

  /* Funcion que se encarga de realizar el post de tarjetas */
  registrarCompra() {
    /* Ejecucion de post */
    this.$http.post('http://localhost:8000/api/compras', {nombreTienda: 'VIPS', numTarjeta: this.numTarjeta,
      importe: this.importe})
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Registro')
            .textContent('¡Compra registrada correctamente!')
            .ok('Listo')
        );
        this.numTarjeta = '';
        this.importe = '';
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo del backend', reason);
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Registro')
            .textContent('¡Número de tarjeta no registrada!')
            .ok('Corregir')
        );
      });
  }

  getCompras() {
    this.$http.get('http://localhost:8000/api/compras')
      .then(res => {
        this.$log.debug('Response from backend', res);
        this.compras = res.data;
      })
      .catch(reason => {
        this.$log.debug('Fail fetching messages from backend', reason);
      });
  }

  success(compras) {
    this.compras = compras;
  }

  get() {
    this.promise = this.$nutrition.compras.get(this.query, this.success).$promise;
  }
}

/* Exportacion de componente */
export const tiendas = {
  template: require('./tiendas.html'),
  controller: TiendasController
};

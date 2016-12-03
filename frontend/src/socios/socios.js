/* Clase del controlador del componente accesos */
class SociosController {

  /* ngIngect */
  constructor($http, $log, $state, $mdDialog, $document, $auth, $window) {
    /* Declaracion de variables y servicios */
    this.$http = $http;
    this.$log = $log;
    this.$state = $state;
    this.$auth = $auth;
    this.user = localStorage.getItem('user');
    this.$mdDialog = $mdDialog;
    this.$window = $window;
    this.isSettings = false;
    this.$document = $document;
    this.icon = './images/icon.png';
    this.isAction = false;
    this.isRegistro = false;
    this.isHistorial = false;
    this.socio = null;
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
    this.getSocio();
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
    this.$http.post('http://localhost:8000/api/compras', {nombreTienda: 'Zara', numTarjeta: this.numTarjeta,
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
        this.getCompras();
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

  getSocio() {
    this.$http.get(`http://localhost:8000/api/tarjetas/${this.user}`)
      .then(res => {
        this.$log.debug('Response from backend', res);
        this.socio = res.data;
        this.nombreTienda = this.tienda.nombreTienda;
        this.direccionTienda = this.tienda.direccion;
        this.telefonoTienda = this.tienda.telefono;
      })
      .catch(reason => {
        this.$log.debug('Fail fetching messages from backend', reason);
      });
  }

  modificarTienda() {
    this.$http.put(`http://localhost:8000/api/tiendas/${this.user}`, {direccion: this.direccionTienda, telefono: this.telefonoTienda})
      .then(res => {
        this.$log.debug('Response from backend', res);
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Modificaciones')
            .textContent('¡Modificaciones realizadas con éxito!')
            .ok('Listo')
        );
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

  settings() {
    this.isSettings = true;
  }

  exit() {
    this.$auth.logout();
    this.$state.go('accesos');
    this.$window.location.reload();
  }

  eliminarCuenta(ev) {
    const confirm = this.$mdDialog.confirm()
      .title('¿Está seguro de que quiere eliminar su cuenta?')
      .textContent('Todos sus datos se eliminarán.')
      .targetEvent(ev)
      .ok('Darme de baja')
      .cancel('Cancelar');

    this.$mdDialog.show(confirm).then(() => {
      this.$http.delete(`http://localhost:8000/api/tiendas/${this.user}`)
      .then(res => {
        this.$log.debug('Response from backend', res);
        const alert = this.$mdDialog.alert()
          .parent(angular.element(this.$document.body))
          .clickOutsideToClose(true)
          .title('Cuenta eliminada correctamente')
          .textContent('¡Esperamos volver a verte pronto!')
          .ok('Listo');

        this.$mdDialog.show(alert).then(() => {
          this.exit();
        });
      })
      .catch(reason => {
        this.$log.debug('Fail fetching messages from backend', reason);
      });
    });
  }
}

/* Exportacion de componente */
export const socios = {
  template: require('./socios.html'),
  controller: SociosController
};

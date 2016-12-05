/* Clase del controlador del componente accesos */
class TiendasController {

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
    this.isRegistro = false;
    this.newCompra = false;
    this.modCompra = false;
    this.isHistorial = false;
    this.tienda = null;
    this.compras = [];
    this.tarjetas = [];
    this.selectedC = [];
    this.selectedH = [];
    this.query = {
      filter: '',
      order: '_id',
      limit: 5,
      page: 1
    };
    this.filter = {
      options: {
        debounce: 500
      }
    };
    this.getTienda();
    this.getCompras();
    this.getTarjetas();
  }

  /* Funcion que se encarga de realizar el post de tarjetas */
  registrarCompra() {
    /* Ejecucion de post */
    this.$http.post('http://localhost:8000/api/compras', {nombreTienda: this.nombreTienda, numTarjeta: this.numTarjeta,
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
        this.importe = '';
        this.newCompra = !this.newCompra;
        this.selectedC = [];
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
    this.$http.get(`http://localhost:8000/api/compras/${this.user}`)
      .then(res => {
        this.$log.debug('Response from backend', res);
        this.compras = res.data;
      })
      .catch(reason => {
        this.$log.debug('Fail fetching messages from backend', reason);
      });
  }

  getTarjetas() {
    this.$http.get('http://localhost:8000/api/tarjetas')
      .then(res => {
        this.$log.debug('Response from backend', res);
        this.tarjetas = res.data;
      })
      .catch(reason => {
        this.$log.debug('Fail fetching messages from backend', reason);
      });
  }

  getTienda() {
    this.$http.get(`http://localhost:8000/api/tiendas/${this.user}`)
      .then(res => {
        this.$log.debug('Response from backend', res);
        this.tienda = res.data;
        this.nombreTienda = this.tienda.nombreTienda;
        this.direccionTienda = this.tienda.direccion;
        this.telefonoTienda = this.tienda.telefono;
      })
      .catch(reason => {
        this.$log.debug('Fail fetching messages from backend', reason);
      });
  }

  modifyTienda() {
    if (this.password) {
      this.modificaciones = {direccion: this.direccionTienda, telefono: this.telefonoTienda, password: this.password};
    } else {
      this.modificaciones = {direccion: this.direccionTienda, telefono: this.telefonoTienda};
    }
    this.$http.put(`http://localhost:8000/api/tiendas/${this.nombreTienda}`, this.modificaciones)
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
    this.password = '';
    this.confirmPassword = '';
  }

  modifyCompra() {
    this.$http.put(`http://localhost:8000/api/compras/${this.selectedH[0]._id}`, {numTarjeta: this.numTarjetaMod, importe: this.importeMod})
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
        this.getCompras();
      })
      .catch(reason => {
        this.$log.debug('Fallo modificando compra del backend', reason);
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Fallo Modificaciones')
            .textContent('¡Número de tarjeta inválido!')
            .ok('Corregir')
        );
      });
    this.password = '';
    this.confirmPassword = '';
  }

  deleteCompra(ev) {
    const confirm = this.$mdDialog.confirm()
      .title('¿Está seguro de que quiere eliminar esta compra?')
      .textContent('Los puntos del socio asociado a esta compra se recalcularán.')
      .targetEvent(ev)
      .ok('Eliminar')
      .cancel('Cancelar');

    this.$mdDialog.show(confirm).then(() => {
      this.$http.delete(`http://localhost:8000/api/compras/${this.selectedH[0]._id}`)
      .then(res => {
        this.$log.debug('Response from backend', res);
        const alert = this.$mdDialog.alert()
          .parent(angular.element(this.$document.body))
          .clickOutsideToClose(true)
          .title('Compra eliminada correctamente')
          .textContent('Puntos recalculados')
          .ok('Listo');

        this.$mdDialog.show(alert).then(() => {
          this.getCompras();
        });
      })
      .catch(reason => {
        this.$log.debug('Fallo eliminando compra del backend', reason);
      });
    });
  }

  deleteCuenta(ev) {
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

  exit() {
    this.$auth.logout();
    this.$state.go('accesos');
    this.$window.location.reload();
  }
}

/* Exportacion de componente */
export const tiendas = {
  template: require('./tiendas.html'),
  controller: TiendasController
};

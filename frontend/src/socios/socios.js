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
    this.selected = [];
    this.query = {
      order: '_id',
      limit: 5,
      page: 1
    };
    this.getTarjeta();
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

  getTarjeta() {
    this.$http.get(`http://localhost:8000/api/tarjetas/${this.user}`)
      .then(res => {
        this.$log.debug('Response from backend', res);
        this.socio = res.data;
        this.nombre = this.socio.nombre;
        this.primerApellido = this.socio.primerApellido;
        this.segundoApellido = this.socio.segundoApellido;
        this.direccion = this.socio.direccion;
        this.telefono = this.socio.telefono;
        this.email = this.socio.email;
        this.numTarjeta = this.socio.numTarjeta;
        this.puntos = this.socio.puntos;
      })
      .catch(reason => {
        this.$log.debug('Fallo obteniendo datos de socio de backend', reason);
      });
  }

  modifyTarjeta() {
    if (this.password) {
      this.modificaciones = {direccion: this.direccion, telefono: this.telefono, password: this.password};
    } else {
      this.modificaciones = {direccion: this.direccion, telefono: this.telefono};
    }
    this.$http.put(`http://localhost:8000/api/tarjetas/${this.numTarjeta}`, this.modificaciones)
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

  deleteCuenta(ev) {
    const confirm = this.$mdDialog.confirm()
      .title('¿Está seguro de que quiere eliminar su cuenta?')
      .textContent('Todos sus datos se eliminarán.')
      .targetEvent(ev)
      .ok('Darme de baja')
      .cancel('Cancelar');

    this.$mdDialog.show(confirm).then(() => {
      this.$http.delete(`http://localhost:8000/api/tarjetas/${this.numTarjeta}`)
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
export const socios = {
  template: require('./socios.html'),
  controller: SociosController
};

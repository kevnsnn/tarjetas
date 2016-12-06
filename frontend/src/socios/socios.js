/* Clase del controlador del componente socios */
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
    this.socio = null;
    this.tiendas = [];
    this.query = {order: '_id', limit: 5, page: 1};
    this.getTarjeta();
    this.getTiendas();
  }

  /* Funcion que obtiene los datos del socio logueado */
  getTarjeta() {
    /* Ejecucion de get con email de socio logueado */
    this.$http.get(`http://localhost:8000/api/tarjetas/${this.user}`)
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        this.socio = res.data; /* Almacenamiento de datos de socio */
        /* Copia de datos para formulario de modificaciones */
        this.nombre = this.socio.nombre;
        this.primerApellido = this.socio.primerApellido;
        this.segundoApellido = this.socio.segundoApellido;
        this.direccion = this.socio.direccion;
        this.telefono = this.socio.telefono;
        this.email = this.socio.email;
        this.numTarjeta = this.socio.numTarjeta;
        this.puntos = this.socio.puntos; /* Para reflejar puntos en toolbar */
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo obteniendo datos de socio de backend', reason);
      });
  }

  /* Funcion que obtiene las tiendas registradas */
  getTiendas() {
    /* Ejecucion de get coleccion */
    this.$http.get(`http://localhost:8000/api/tiendas`)
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        this.tiendas = res.data; /* Almacenamiento de tiendas para tabla */
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo listando tiendas de backend', reason);
      });
  }

  /* Funcion que modifica los datos del socio */
  modifyTarjeta() {
    if (this.password) {
      /* Caso modificacion de contraseña */
      this.modificaciones = {direccion: this.direccion, telefono: this.telefono, password: this.password};
    } else {
      /* Caso que no modifica la contraseña */
      this.modificaciones = {direccion: this.direccion, telefono: this.telefono};
    }

    /* Ejecucion de put con numero de tarjeta del socio y modificaciones */
    this.$http.put(`http://localhost:8000/api/tarjetas/${this.numTarjeta}`, this.modificaciones)
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        /* Dialogo de alerta modificaciones realizadas correctamente */
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
        /* Caso de fallo */
        this.$log.debug('Fallo modificando datos de tarjeta en backend', reason);
      });

    /* Reseteo de inputs de contraseña */
    this.password = '';
    this.confirmPassword = '';
  }

  /* Funcion que elimina la cuenta del socio */
  deleteCuenta(ev) {
    /* Variable de dialogo de confirmacion de eliminacion de cuenta */
    const confirm = this.$mdDialog.confirm()
      .title('¿Está seguro de que quiere eliminar su cuenta?')
      .textContent('Todos sus datos se eliminarán.')
      .targetEvent(ev)
      .ok('Darme de baja')
      .cancel('Cancelar');

    /* Dialogo de confirmacion de eliminacion de cuenta */
    this.$mdDialog.show(confirm).then(() => {
      /* Ejecucion de delete con numero de tarjeta */
      this.$http.delete(`http://localhost:8000/api/tarjetas/${this.numTarjeta}`)
      .then(res => {
        this.$log.debug('Respuesta del backend', res);
        const alert = this.$mdDialog.alert()
          .parent(angular.element(this.$document.body))
          .clickOutsideToClose(true)
          .title('Cuenta eliminada correctamente')
          .textContent('¡Esperamos volver a verte pronto!')
          .ok('Listo');

        /* Dialogo de alerta eliminacion de cuenta correcta */
        this.$mdDialog.show(alert).then(() => {
          this.exit(); /* Deslogueo */
        });
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo eliminando cuenta de tarjeta del backend', reason);
      });
    });
  }

  /* Funcion de deslogueo */
  exit() {
    this.$auth.logout();            /* Eliminacion de token de sesion */
    this.$state.go('accesos');      /* Redireccionamiento a pagina de accesos y registros */
    this.$window.location.reload(); /* Actualizacion de pagina */
  }
}

/* Exportacion de componente */
export const socios = {
  template: require('./socios.html'),
  controller: SociosController
};

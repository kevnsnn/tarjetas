/* Clase del controlador del componente accesos */
class AccesosController {

  /* ngIngect */
  constructor($http, $log, $state, $mdDialog, $document, $auth, $window) {
    /* Declaracion de variables y servicios */
    this.$http = $http;
    this.$log = $log;
    this.$auth = $auth;
    this.$state = $state;
    this.$window = $window;
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.icon = './images/icon.png';
    this.isSocio = false;
    this.isTienda = false;
  }

  /* Funcion que registra un nuevo socio */
  postTarjeta() {
    /* Ejecucion de post con datos de formulario de socios */
    this.$http.post('http://localhost:8000/api/tarjetas', {nombre: this.nombre, primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido, direccion: this.direccion, telefono: this.telefono, email: this.email,
      password: this.passwordS})
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        /* Dialogo de alerta registro de socio correcto */
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Registro')
            .textContent('¡Se ha registrado correctamente!')
            .ok('Listo')
        );

        /* Reseteo de inputs de formulario de socios */
        this.nombre = '';
        this.primerApellido = '';
        this.segundoApellido = '';
        this.direccion = '';
        this.telefono = '';
        this.email = '';
        this.passwordS = '';
        this.confirmPasswordS = '';
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo registrando tarjeta del backend', reason);
        /* Dialogo de alerta registro de socio incorrecto */
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Registro')
            .textContent('¡El email ya está en uso!')
            .ok('Corregir')
        );
      });
  }
  /* Funcion que registra una nueva tienda */
  postTienda() {
    /* Ejecucion de post con datos de formulario de tiendas */
    this.$http.post('http://localhost:8000/api/tiendas', {nombreTienda: this.nombreTienda, direccion: this.direccionTienda,
      telefono: this.telefonoTienda, password: this.passwordT})
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        /* Dialogo de alerta registro de tienda correcto */
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Registro')
            .textContent('¡Se ha registrado correctamente!')
            .ok('Listo')
        );

        /* Reseteo de inputs de formulario de tiendas */
        this.nombreTienda = '';
        this.direccionTienda = '';
        this.telefonoTienda = '';
        this.passwordT = '';
        this.confirmPasswordT = '';
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo del backend', reason);
        /* Dialogo de alerta registro de socio incorrecto */
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Registro')
            .textContent('¡Nombre de tienda ya está en uso!')
            .ok('Corregir')
          );
      });
  }

  /* Funcio que da accesos a usuarios */
  loginUser() {
    /* Peticion de token a partir de credenciales tipo socio del formulario de acceso */
    this.$auth.login({email: this.usuario, password: this.password})
     .then(res => {
       /* Caso de exito usuario tipo socio */
       this.$auth.setToken(res.data);               /* Almacenar token de sesion */
       localStorage.setItem('user', this.usuario);  /* Almacenar nombre de usuario */
       localStorage.setItem('type', 'socio');       /* Almacenar tipo de usuario */
       this.$state.go('socios');                    /* Redireccionaa socios */
     })
     .catch(() => {
       /* Peticion de token a partir de credenciales tipo tienda del formulario de acceso */
       this.$auth.login({nombreTienda: this.usuario, password: this.password})
        .then(res => {
          /* Caso de exito usuario tipo tienda */
          this.$auth.setToken(res.data);              /* Almacenar token de sesion */
          localStorage.setItem('user', this.usuario); /* Almacenar nombre de usuario */
          localStorage.setItem('type', 'tienda');     /* Almacenar tipo de usuario */
          this.$state.go('tiendas');                  /* Redireccionaa tiendas */
        })
        .catch(reason => {
          /* Caso de fallo */
          this.$log.debug('Fallo logueando del backend', reason);
          /* Dialogo de alerta modificaciones de compra incorrectas */
          this.$mdDialog.show(
            this.$mdDialog.alert()
              .parent(angular.element(this.$document.body))
              .clickOutsideToClose(true)
              .title('Credenciales erróneas')
              .textContent('¡Usuario o contraseña inválidos!')
              .ok('Corregir')
          );

          this.password = ''; /* Reseteo de input contraseña */
        });
     });
  }
}

/* Exportacion de componente */
export const accesos = {
  template: require('./accesos.html'),
  controller: AccesosController
};

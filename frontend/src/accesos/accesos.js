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
    this.isRegistro = false;
    this.isSocio = false;
    this.isTienda = false;
  }

  /* Funcion que se encarga de realizar el post de tarjetas */
  registrarTarjeta() {
    /* Ejecucion de post */
    this.$http.post('http://localhost:8000/api/tarjetas', {nombre: this.nombre, primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido, direccion: this.direccion, telefono: this.telefono, email: this.email,
      password: this.passwordS})
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
        this.$log.debug('Fallo del backend', reason);
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

  /* Funcion que se encarga de realizar el post de tarjetas */
  registrarTienda() {
    /* Ejecucion de post */
    this.$http.post('http://localhost:8000/api/tiendas', {nombreTienda: this.nombreTienda, direccion: this.direccionTienda,
      telefono: this.telefonoTienda, password: this.passwordT})
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
        this.nombreTienda = '';
        this.direccionTienda = '';
        this.telefonoTienda = '';
        this.passwordT = '';
        this.confirmPasswordT = '';
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo del backend', reason);
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

  loginUser() {
    this.$log.debug('Logueando');
    this.$auth.login({email: this.usuario, password: this.password})
     .then(res => {
       this.$auth.setToken(res.data);
       localStorage.setItem('user', this.usuario);
       localStorage.setItem('type', 'socio');
       this.$state.go('socios');
     })
     .catch(() => {
       this.$auth.login({nombreTienda: this.usuario, password: this.password})
        .then(res => {
          this.$auth.setToken(res.data);
          localStorage.setItem('user', this.usuario);
          localStorage.setItem('type', 'tienda');
          this.$state.go('tiendas');
        })
        .catch(reason => {
          this.$log.debug('Login: Fail login user from backend', reason);
          this.$window.alert("Incorrect username or password");
          this.usuario = '';
          this.password = '';
        });
     });
  }
}

/* Exportacion de componente */
export const accesos = {
  template: require('./accesos.html'),
  controller: AccesosController
};

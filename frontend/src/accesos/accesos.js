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
        this.nombre = '';
        this.primerApellido = '';
        this.segundoApellido = '';
        this.direccion = '';
        this.telefono = '';
        this.email = '';
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
      telefono: this.telefonoTienda})
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
    this.$auth.login({email: this.username, password: this.password})
     .then(res => {
       this.$log.debug('1');
       this.$auth.setToken(res.data);
       localStorage.setItem('user', this.usuario);
       localStorage.setItem('type', 'socio');
       this.$state.go('socios');
     })
     .catch(() => {
       this.$log.debug('2');
       this.$auth.login({nombreTienda: this.usuario, password: this.password})
        .then(res => {
          this.$log.debug('3');
          this.$auth.setToken(res.data);
          localStorage.setItem('user', this.usuario);
          localStorage.setItem('type', 'tienda');
          this.$state.go('tiendas');
        })
        .catch(reason => {
          this.$log.debug('4');
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

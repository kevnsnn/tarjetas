/* Clase del controlador del componente tiendas */
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
    this.queryR = {filter: '', order: '_id', limit: 5, page: 1};
    this.queryH = {filter: '', order: '_id', limit: 5, page: 1};
    this.getTienda();
    this.getCompras();
    this.getTarjetas();
  }

  /* Funcion que obtiene las compras registradas por la tienda */
  getCompras() {
    /* Ejecucion de get con nombre de tienda */
    this.$http.get(`http://localhost:8000/api/compras/${this.user}`)
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        this.compras = res.data; /* Almacenamiento de compras para tabla */
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo listando compras del backend', reason);
      });
  }

  /* Funcion que obtiene los datos de los socios registrados */
  getTarjetas() {
    /* Ejecucion de get coleccion */
    this.$http.get('http://localhost:8000/api/tarjetas')
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        this.tarjetas = res.data; /* Almacenamiento de socios para tabla */
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo listando tarjetas del backend', reason);
      });
  }

  /* Funcion que obtiene los datos de la tienda logueada */
  getTienda() {
    /* Ejecucion de get con nombre de tienda */
    this.$http.get(`http://localhost:8000/api/tiendas/${this.user}`)
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        this.tienda = res.data;                       /* Almacenamiento de datos de tienda */
        /* Copia de datos para formulario de modificaciones */
        this.nombreTienda = this.tienda.nombreTienda;
        this.direccionTienda = this.tienda.direccion;
        this.telefonoTienda = this.tienda.telefono;
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo buscando datos de tienda del backend', reason);
      });
  }

  /* Funcion que registra nuevas compras */
  postCompra() {
    /* Ejecucion de post con datos de nueva compra */
    this.$http.post('http://localhost:8000/api/compras', {nombreTienda: this.nombreTienda, numTarjeta: this.numTarjeta,
      importe: this.importe})
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        /* Dialogo de alerta registro de compra correcto */
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Registro')
            .textContent('¡Compra registrada correctamente!')
            .ok('Listo')
        );

        this.getCompras();                /* Actualizacion de lista de compras */
        this.importe = '';                /* Reset de input importe */
        this.newCompra = !this.newCompra; /* Salir de ventana de registro de compra */
        this.selectedC = [];              /* Deseleccionar socio */
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo del backend', reason);
        /* Dialogo de alerta registro de compra incorrecto */
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

  /* Funcion que modifica los datos de la tienda logueada */
  modifyTienda() {
    if (this.password) {
      /* Caso modificacion de contraseña */
      this.modificaciones = {direccion: this.direccionTienda, telefono: this.telefonoTienda, password: this.password};
    } else {
      /* Caso que no modifica la contraseña */
      this.modificaciones = {direccion: this.direccionTienda, telefono: this.telefonoTienda};
    }

    /* Ejecucion de put con nombre de la tienda y modificaciones */
    this.$http.put(`http://localhost:8000/api/tiendas/${this.nombreTienda}`, this.modificaciones)
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
        this.$log.debug('Fallo modificando datos de tienda del backend', reason);
        /* Dialogo de alerta modificaciones de tienda incorrecto */
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Modificaciones')
            .textContent('¡No se han podido realizar las modificaciones!')
            .ok('Volver')
        );
      });

    /* Reseteo de inputs de contraseña */
    this.password = '';
    this.confirmPassword = '';
  }

  /* Funcion que modifica los datos de una compra */
  modifyCompra() {
    /* Ejecucion de put con id de compra y modificaciones */
    this.$http.put(`http://localhost:8000/api/compras/${this.selectedH[0]._id}`, {numTarjeta: this.numTarjetaMod, importe: this.importeMod})
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);
        /* Dialogo de alerta modificaciones de compra correctas */
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Modificaciones')
            .textContent('¡Modificaciones realizadas con éxito!')
            .ok('Listo')
        );

        this.getCompras(); /* Actualizacion de lista de compras */
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo modificando compra del backend', reason);
        /* Dialogo de alerta modificaciones de compra incorrectas */
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(this.$document.body))
            .clickOutsideToClose(true)
            .title('Fallo Modificaciones')
            .textContent('¡Número de tarjeta inválido!')
            .ok('Corregir')
        );
      });

    /* Reseteo de inputs de contraseña */
    this.password = '';
    this.confirmPassword = '';
  }

  /* Funcion que elimina una compra */
  deleteCompra(ev) {
    /* Variable de dialogo de confirmacion de borrado de compra */
    const confirm = this.$mdDialog.confirm()
      .title('¿Está seguro de que quiere eliminar esta compra?')
      .textContent('Los puntos del socio asociado a esta compra se recalcularán.')
      .targetEvent(ev)
      .ok('Eliminar')
      .cancel('Cancelar');

    /* Dialogo de alerta confirmacion de borrado de compra */
    this.$mdDialog.show(confirm).then(() => {
      /* Ejecucion de delete con id de compra */
      this.$http.delete(`http://localhost:8000/api/compras/${this.selectedH[0]._id}`)
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);

        /* Variable de dialogo de alerta compra eliminada */
        const alert = this.$mdDialog.alert()
          .parent(angular.element(this.$document.body))
          .clickOutsideToClose(true)
          .title('Compra eliminada correctamente')
          .textContent('Puntos recalculados')
          .ok('Listo');

        /* Dialogo de alerta compra eliminada */
        this.$mdDialog.show(alert).then(() => {
          this.getCompras(); /* Actualizacion de lista de compras */
        });
      })
      .catch(reason => {
        /* Caso de fallo */
        this.$log.debug('Fallo eliminando compra del backend', reason);
      });
    });
  }

  /* Funcion que elimina la cuenta de la tienda */
  deleteTienda(ev) {
    /* Variable de dialogo de confirmacion de eliminacion de cuenta */
    const confirm = this.$mdDialog.confirm()
      .title('¿Está seguro de que quiere eliminar su cuenta?')
      .textContent('Todos sus datos se eliminarán.')
      .targetEvent(ev)
      .ok('Darme de baja')
      .cancel('Cancelar');

    /* Dialogo de confirmacion de eliminacion de cuenta */
    this.$mdDialog.show(confirm).then(() => {
      /* Ejecucion de delete con nombre de tienda */
      this.$http.delete(`http://localhost:8000/api/tiendas/${this.user}`)
      .then(res => {
        /* Caso de exito */
        this.$log.debug('Respuesta del backend', res);

        /* Variable de dialogo de alerta eliminacion de cuenta correcta */
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
        this.$log.debug('Fallo eliminando cuenta de tienda del backend', reason);
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
export const tiendas = {
  template: require('./tiendas.html'),
  controller: TiendasController
};

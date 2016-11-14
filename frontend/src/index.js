/* Archivo punto de acceso */
/* Librerias npm */
import angular from 'angular';
import 'angular-material';
import 'angular-aria';
import 'angular-animate';
import 'angular-material/angular-material.css';
import 'angular-ui-router';
import 'material-design-icons';
/* Librerias locales */
import {home} from './home/home';
import {accesos} from './accesos/accesos';
// import {socios} from './socios/socios';
// import {tiendas} from './tiendas/tiendas';
// import {empresa} from './empresa/empresa';

import routesConfig from './routes';
import './index.less';

/* Exportacion de app angular */
export const app = 'app';

/* Configuracion angular */
angular
  .module(app, ['ui.router', 'ngMaterial']) /* Declaracion de modulos inyectados */
  .config(routesConfig) /* Enrutamiento */
  .component('home', home) /* Componente angular del recurso home */
  .component('accesos', accesos); /* Componente angular del recurso accesos */
  // .component('socios', socios) /* Componente angular del recurso socios */
  // .component('tiendas', tiendas) /* Componente angular del recurso tiendas */
  // .component('empresa', empresa); /* Componente angular del recurso empresa */

/* Punto de acceso */
/* Librerias npm */
import angular from 'angular';
import 'angular-material';
import 'angular-aria';
import 'angular-animate';
import 'angular-material/angular-material.css';
import 'angular-ui-router';
import 'material-design-icons';
import 'angular-material-data-table';
import 'angular-messages';
import 'satellizer';
import 'angular-password';
/* Librerias locales */
import {home} from './home/home';
import {accesos} from './accesos/accesos';
import {socios} from './socios/socios';
import {tiendas} from './tiendas/tiendas';
import routesConfig from './routes';
import './index.less';

export const app = 'app'; /* Exportacion de app angular */

/* Configuracion angular */
angular
  .module(app, ['ui.router', 'ngMaterial', 'md.data.table', 'ngAnimate', 'ngMessages', 'satellizer', 'ngAria', 'ngPassword']) /* Modulos inyectados */
  .config(routesConfig)           /* Enrutamiento */
  .component('home', home)        /* Componente angular del recurso home */
  .component('accesos', accesos)  /* Componente angular del recurso accesos */
  .component('socios', socios)    /* Componente angular del recurso socios */
  .component('tiendas', tiendas); /* Componente angular del recurso tiendas */

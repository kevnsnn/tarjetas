/* Archivo punto de acceso */
/* Librerias npm */
import angular from 'angular';
import 'angular-material';
import 'angular-aria';
import 'angular-animate';
import 'angular-material/angular-material.css';
import 'angular-ui-router';
/* Librerias locales */
import {tarjetas} from './tarjetas/tarjetas';
import {home} from './home/home';
import routesConfig from './routes';
import './index.less';

/* Exportacion de app angular */
export const app = 'app';

/* Configuracion angular */
angular
  .module(app, ['ui.router', 'ngMaterial']) /* Declaracion de modulos inyectados */
  .config(routesConfig) /* Enrutamiento */
  .component('tarjetas', tarjetas) /* Componente angular del recurso tarjetas */
  .component('home', home); /* Componente angular del recurso tarjetas */

/* Librerias npm */
import jwt from 'jwt-simple';
import moment from 'moment';
/* Librerias locales */
import Tarjeta from './tarjetas/tarjetas.model';
import Tienda from './tiendas/tiendas.model';
import config from '../config';

/* Funcion controladora para logueo */
function login(req, res, next) {
  if(req.body.email) {
    /* Caso logueo de socio */
    Tarjeta.findByCredentials(req.body.email, req.body.password) /* Comprobar credenciales de logueo */
      .then(user => {
        if (user) {
          /* Caso de exito: generar y enviar token */
          const payload = {
            sub: user,
            iat: moment().unix(),
            exp: moment().add(3, "hours").unix()
          }
        let token = jwt.encode(payload, config.secret, 'HS256');
        res.status(200).json(token); /* Status: Logueo correcta + codigo: 200 + token */
        } else {
          res.status(401).json({msg: 'Credenciales erroneas'}); /* Caso de fallo: credenciales erroneas */
        }  
      })
      .catch(reason => {
        /* Caso de fallo */
        console.log('Error logueando socio: ', reason);        
        res.status(500).json({ usr: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
      });
  } else {
    /* Caso logueo de tienda */
    Tienda.findByCredentials(req.body.nombreTienda, req.body.password) /* Comprobar credenciales de logueo */
      .then(user => {
        if (user) {
          /* Caso de exito: generar y enviar token */
          const payload = {
            sub: user,
            iat: moment().unix(),
            exp: moment().add(12, "hours").unix(),
          }
        let token = jwt.encode(payload, config.secret, 'HS256');
        res.status(200).json(token); /* Status: Logueo correcta + codigo: 200 + token */
        } else {
          res.status(401).json({msg: 'Credenciales erroneas'}); /* Caso de fallo: credenciales erroneas */
        }  
      })
      .catch(reason => {
        /* Caso de fallo */
        console.log('Error logueando tienda: ', reason);
        res.status(500).json({ usr: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
      });
  }
}

/* Exportacion de funciones controladoras */
export default { login }

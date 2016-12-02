import Tarjeta from './tarjetas/tarjetas.model';
import Tienda from './tiendas/tiendas.model';
import jwt from 'jwt-simple';
import moment from 'moment';
import config from '../config';

function login(req, res, next) {
  if(req.body.email) {
    const datos = new Tarjeta(req.body);
    Tienda.findByCredentials(datos.email, datos.password)
      .then((user) => {
        if (user) {
          const payload = {
            sub: user,
            iat: moment().unix(),
            exp: moment().add(12, "hours").unix(),
          }
        let token = jwt.encode(payload, config.secret, 'HS256');
        res.status(200).json(token);
        } else {
          console.log('Fallo en tarjeta')
          res.status(401).json({msg: 'Fail credentials'});
        }  
      })
      .catch((reason) => {            
        console.log('Error login user: ', reason)
        res.status(500).json({ usr: 'DB blew up!' });
      });
  } else {
    const datos = new Tienda(req.body);
    console.log(`El cuerpo es:`, req.body);
    console.log(`Los datos son: ${datos.nombreTienda} y ${datos.password}`);
    Tienda.findByCredentials(datos.nombreTienda, datos.password)
      .then((user) => {
        if (user) {
          const payload = {
            sub: user,
            iat: moment().unix(),
            exp: moment().add(12, "hours").unix(),
          }
        let token = jwt.encode(payload, config.secret, 'HS256');
        res.status(200).json(token);
        } else {
          console.log('Fallo en tienda')          
          res.status(401).json({msg: 'Fail credentials'});
        }  
      })
      .catch((reason) => {            
        console.log('Error login user: ', reason)
        res.status(500).json({ usr: 'DB blew up!' });
      });
  }
}

/* Exportacion de funciones controladoras */
export default { login }

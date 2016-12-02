import Tarjeta from './tarjetas/tarjetas.model';
import Tienda from './tiendas/tiendas.model';
import jwt from 'jwt-simple';
import moment from 'moment';
import joi from 'joi';
import config from '../config';

let schemaLoginTienda = joi.object().keys({
  nombreTienda: joi.string().min(3).max(20).required(),
  password: joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required()
});

let schemaLoginTarjeta = joi.object().keys({
  email: joi.string().email(),
  password: joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required()
});

function login(req, res, next) {
  joi.validate(req.body, schemaLoginTarjeta, (err, value) => {
    if (err) {
      joi.validate(req.body, schemaLoginTienda, (err, value) => {
        if (err) {
          console.log('Credenciales no validas', err);
          res.status(400).json({msg: 'Not valid credentials'});
        } else {
          console.log('Credenciales validas', value);
          const datos = new Tienda(value);
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
                res.status(401).json({msg: 'Fail credentials'});
              }  
            })
            .catch((reason) => {            
              console.log('Error login user: ', reason)
              res.status(500).json({ usr: 'DB blew up!' });
              });
        }
      });
    } else {
      console.log('Credenciales validas', value);
      const datos = new Tarjeta(value);
      Tarjeta.findByCredentials(datos.email, datos.password)
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
            
          }  
        })
        .catch((reason) => {            
          console.log('Error login user: ', reason)
          res.status(500).json({ usr: 'DB blew up!' });
        });
    }
  });
}

/* Exportacion de funciones controladoras */
export default { login }

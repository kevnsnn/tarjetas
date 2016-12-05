/* Controlador */
/* Librerias locales */
import Tarjeta from './tarjetas.model';

/* get: Control de consulta de datos de todas las tarjetas */
function list (req, res, next) {
  Tarjeta.list() /* Llamada a consulta del modelo */
    .then(tarjetas => {
      /* Caso de exito */
      res.status(200).json(tarjetas); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error listando tarjetas: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* get: Control de consulta de datos de una tarjeta por email */
function findByEmail (req, res, next) {
  Tarjeta.findByEmail(req.params.email) /* Llamada a consulta del modelo */
    .then(tarjeta => {
      /* Caso de exito */
      res.status(200).json(tarjeta); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error buscando tarjeta: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* post: Control registro de datos tarjetas */
function create(req, res, next) {
  const tarjeta = new Tarjeta(req.body); /* Construccion objeto tipo schema Tarjeta a partir de datos del cuerpo */
  
  /* Generacion numero aleatorio para num tarjetas entre 999999999 y 100000 */
  tarjeta.numTarjeta = Math.floor(Math.random() * (999999999 - 100000 + 1)) + 100000;

  tarjeta.save() /* Insercion de datos en DB a partir de objeto tipo schema construido previamente */
    .then(() => {
      /* Caso de exito */
      res.status(201).json({ msg: 'Tarjeta almacenada' }); /* Codigo: 201 + mensaje de exito */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error almacenando tarjeta: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* put: Control actualizaciones de datos tarjetas */
function modify(req, res, next) {
  Tarjeta.update(req.params.numTarjeta, req.body) /* Llamada a consulta del modelo */
    .then(tarjeta => {
      /* Caso de exito */
      if (tarjeta) {
        /* Actualizacion correcta */
        res.status(200).json(tarjeta); /* Codigo: 201 + mensaje de exito */
      } else {
        /* Caso tarjeta no encontrada */
        res.status(404).json({ msg: 'Tarjeta a modificar no encontrada'}) /* Codigo: 404 + mensaje de fallo */
      }    
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error modificando tarjeta: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* delete: Control borrado de datos tarjetas */
function remove(req, res, next) {
  const tarjeta = Tarjeta.findTarjeta(req.params.numTarjeta); /* Busqueda de tarjeta a partir de consulta del modelo */

  tarjeta.remove() /* Eliminacion de tarjeta a partir de objeto tipo schema obtenido de la consulta */
    .then(() => {
      /* Caso de exito */
      res.status(204).json({ msg: 'Tarjeta eliminada'}); /* Codigo: 204 + mensaje de exito */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error eliminando tarjeta: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* Exportacion de funciones controladoras */
export default { list, findByEmail, create, modify, remove }

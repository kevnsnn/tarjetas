/* Controlador */
/* Librerias locales */
import Tarjeta from './tarjetas.model';

/* get: Control de consulta de datos tarjetas */
function list (req, res, next) {
    /* Llamada a consulta del modelo */
    Tarjeta.list()
    .then(tarjetas => {
        /* Caso de exito */
        res.status(200).json(tarjetas); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
        /* Caso de fallo */
        console.log('Error listando tarjetas: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* get: Control de consulta de datos de una tarjeta */
function findByEmail (req, res, next) {
    /* Llamada a consulta del modelo */
    Tarjeta.findByEmail(req.params.email)
    .then(tarjeta => {
        /* Caso de exito */
        res.status(200).json(tarjeta); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
        /* Caso de fallo */
        console.log('Error buscando tarjeta: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* post: Control registro de datos tarjetas */
function create(req, res, next) {
  /* Construccion objeto tipo schema tarjetas a partir de datos del cuerpo */
  const tarjeta = new Tarjeta(req.body);

  /* Generacion numero aleatorio para num tarjetas entre 999999999 y 100000 */
  tarjeta.numTarjeta = Math.floor(Math.random() * (999999999 - 100000 + 1)) + 100000;

  /* Insercion de datos en DB a partir de objeto tipo schema construido previamente */
  tarjeta.save()
    .then(() => {
      /* Caso de exito */
      res.status(201).json({ msg: 'Tarjeta almacenada' }); /* Codigo: 201 + mensaje de exito */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error almacenando tarjeta: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* put: Control actualizaciones de datos tarjetas */
function modify(req, res, next) {
  /* Llamada a consulta del modelo */
  Tarjeta.update(req.params.numTarjeta, req.body)
    .then((tarjeta) => {
      /* Caso de exito */
      if (tarjeta) {
        /* Actualizacion correcta */
        res.status(200).json(tarjeta); /* Codigo: 201 + mensaje de exito */
      } else {
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
  /* Busqueda de datos a borrar a partir de consulta del modelo */
  const tarjeta = Tarjeta.findTarjeta(req.params.numTarjeta);

  /* Eliminacion de datos a partir de objeto tipo schema obtenido de la consulta */
  tarjeta.remove()
    .then(() => {
      /* Caso de exito */
      res.status(204).json({ msg: 'Tarjeta eliminada'}); /* Codigo: 204 + mensaje de exito */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error modificando tarjeta: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* Exportacion de funciones controladoras */
export default { list, findByEmail, create, modify, remove }

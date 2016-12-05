/* Controlador */
/* Librerias locales */
import Tienda from './tiendas.model';

/* get: Control de consulta de datos tiendas */
function list (req, res, next) {
  Tienda.list() /* Llamada a consulta del modelo */
    .then(tiendas => {
      /* Caso de exito */
      res.status(200).json(tiendas); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error listando tiendas: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* get: Control de consulta de datos de una tienda */
function findTienda (req, res, next) {
  Tienda.findTienda(req.params.nombreTienda) /* Llamada a consulta del modelo */
    .then(tienda => {
      /* Caso de exito */
      res.status(200).json(tienda); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error buscando tienda: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
  });
}

/* post: Control registro de datos tiendas */
function create(req, res, next) {
  const tienda = new Tienda(req.body); /* Construccion objeto tipo schema Tienda a partir de datos del cuerpo */

  tienda.save() /* Insercion de datos en DB a partir de objeto tipo schema construido previamente */
    .then(() => {
      /* Caso de exito */
      res.status(201).json({ msg: 'Tienda almacenada' }); /* Codigo: 201 + mensaje de exito */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error almacenando tienda: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* put: Control actualizaciones de datos tiendas */
function modify(req, res, next) {
  Tienda.update(req.params.nombreTienda, req.body) /* Llamada a consulta del modelo */
    .then(tienda => {
      /* Caso de exito */
      if (tienda) {
        /* Caso de actualizacion de datos correcta */
        res.status(200).json(tienda); /* Codigo: 200 + nuevo documento tienda */
      } else {
        /* Caso tienda no encontrada */
        res.status(404).json({ msg: 'Tienda a modificar no encontrada' }); /* Codigo: 404 + mensaje de fallo */
      }
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error modificando tienda: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* delete: Control borrado de datos tiendas */
function remove(req, res, next) {
  const tienda = Tienda.findTienda(req.params.nombreTienda); /* Busqueda tienda a borrar a partir de consulta del modelo */
  
  tienda.remove() /* Eliminacion de tienda a partir de objeto tipo schema obtenido de la consulta */
    .then(() => {
      /* Caso de exito */
      res.status(204).json({ msg: 'Tienda eliminada'}); /* Codigo: 204 + mensaje de exito */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error eliminando tienda: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* Exportacion de funciones controladoras */
export default { list, findTienda, create, modify, remove }
/* Controlador */
/* Librerias locales */
import Tienda from './tiendas.model';

/* get: Control de consulta de datos tiendas */
function list (req, res, next) {
    /* Llamada a consulta del modelo */
    Tienda.list()
    .then(tiendas => {
        /* Caso de exito */
        res.status(200).json(tiendas); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
        /* Caso de fallo */
        console.log('Error listando tiendas: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* get: Control de consulta de datos de una tienda */
function findTienda (req, res, next) {
    /* Llamada a consulta del modelo */
    Tienda.findTienda(req.params.nombreTienda)
    .then(tienda => {
        /* Caso de exito */
        res.status(200).json(tienda); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
        /* Caso de fallo */
        console.log('Error buscando tienda: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* post: Control registro de datos tiendas */
function create(req, res, next) {
  /* Construccion objeto tipo schema tiendas a partir de datos del cuerpo */
  const tienda = new Tienda(req.body);
  /* Insercion de datos en DB a partir de objeto tipo schema construido previamente */
  tienda.save()
    .then(() => {
      /* Caso de exito */
      res.status(201).json({ msg: 'Tienda almacenada' }); /* Codigo: 201 + mensaje de exito */
    })
    .catch((reason) => {
      /* Caso de fallo */
      console.log('Error almacenando tienda: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* put: Control actualizaciones de datos tiendas */
function modify(req, res, next) {
  /* Llamada a consulta del modelo */
  Tienda.update(req.params.nombreTienda, req.body)
    .then((tienda) => {
      /* Caso de exito */
      if (tienda) {
        /* Caso de actualizacion de datos correcta */
        res.status(200).json(tienda); /* Codigo: 201 + mensaje de exito */  
      } else {
        res.status(404).json({ msg: 'Tienda a modificar no encontrada' }); /* Codigo: 404 + mensaje de fallo */
      }
    })
    .catch((reason) => {
      /* Caso de fallo */
      console.log('Error modificando tienda: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* delete: Control borrado de datos tiendas */
function remove(req, res, next) {
  /* Busqueda de datos a borrar a partir de consulta del modelo */
  const tienda = Tienda.findTienda(req.params.nombreTienda);
  /* Eliminacion de datos a partir de objeto tipo schema obtenido de la consulta */
  tienda.remove()
    .then(() => {
      /* Caso de exito */
      res.status(204).json({ msg: 'Tienda eliminada'}); /* Codigo: 204 + mensaje de exito */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error modificando tienda: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* Exportacion de funciones controladoras */
export default { list, findTienda, create, modify, remove }
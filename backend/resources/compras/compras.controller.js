/* Controlador */
/* Librerias locales */
import Compras from './compras.model';

/* get: Control de consulta de datos compras */
function list (req, res, next) {
    /* Llamada a consulta del modelo */
    Compras.list()
    .then(compras => {
        /* Caso de exito */
        res.status(200).json(compras); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
        /* Caso de fallo */
        console.log('Error listando compras: ', reason)
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* post: Control registro de datos compra */
function create(req, res, next) {
  /* Construccion objeto tipo schema compras a partir de datos del cuerpo */
  const compra = new Compras(req.body);
  /* Insercion de datos en DB a partir de objeto tipo schema construido previamente */
  compra.save()
    .then(() => {
      /* Caso de exito */
      res.status(201).json({ msg: 'Compra almacenada' }); /* Codigo: 201 + mensaje de exito */
    })
    .catch((reason) => {
      /* Caso de fallo */
      console.log('Error almacenando compra: ', reason)
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* put: Control actualizaciones de datos compra */
function modify(req, res, next) {
  /* Llamada a consulta del modelo */
  Compras.update(req.params.idTienda, req.params.numTarjeta, req.params.fecha, 
    req.params.hora, req.body)
    .then(() => {
      /* Caso de exito */
      res.status(201).json({ msg: 'Compra modificada' }); /* Codigo: 201 + mensaje de exito */
    })
    .catch((reason) => {
      /* Caso de fallo */
      console.log('Error modificando compra: ', reason)
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* delete: Control borrado de datos tarjetas */
function remove(req, res, next) {
  /* Busqueda de datos a borrar a partir de consulta del modelo */
  const compra = compra.findCompra(req.params.idTienda, req.params.numTarjeta, req.params.fecha, 
    req.params.hora);
  /* Eliminacion de datos a partir de objeto tipo schema obtenido de la consulta */
  compra.remove()
    .then(() => {
      /* Caso de exito */
      res.status(204).json({ msg: 'Compra eliminada'}); /* Codigo: 204 + mensaje de exito */
    })
    .catch((reason) => {
      /* Caso de fallo */
      console.log('Error eliminando compra: ', reason)
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* Exportacion de funciones controladoras */
export default { list, create, modify, remove }
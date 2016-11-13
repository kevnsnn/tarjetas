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
        console.log('Error listando tarjetas: ', reason)
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
    .catch((reason) => {
      /* Caso de fallo */
      console.log('Error almacenando tarjeta: ', reason)
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* put: Control actualizaciones de datos tarjetas */
function modify(req, res, next) {
  /* Llamada a consulta del modelo */
  Tarjeta.update(req.params.numTarjeta, req.body)
    .then(() => {
      /* Caso de exito */
      res.status(201).json({ msg: 'Tarjeta modificada' }); /* Codigo: 201 + mensaje de exito */
    })
    .catch((reason) => {
      /* Caso de fallo */
      console.log('Error modificando tarjeta: ', reason)
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
    .catch((reason) => {
      /* Caso de fallo */
      console.log('Error modificando tarjeta: ', reason)
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* Funcion que verifica datos de tiendas y tarjetas */
function verify(numTarjeta) {
  let result = false;
  
  /* Verificar si num de tarjeta registrado */
  Tarjetas.findTarjeta(numTarjeta)
    .then(tarjeta => {
      /* Caso de exito */
      /* Comprobacion de resultado */
      if(tarjeta) { result = true; }
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error verificando tarjeta: ', reason)
    });
    
    return result;
}

/* Exportacion de funciones controladoras */
export default { list, create, modify, remove, verify }
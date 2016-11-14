/* Controlador */
/* Librerias locales */
import Premio from './premios.model';

/* post: crear */
function create (req, res, next) {
    /* Construccion objeto tipo schema tarjetas a partir de datos del cuerpo */
    const premio = new Premio(req.body);
    /* Insercion de premios en DB a partir de objeto tipo schema construido previamente */
    premio.save()
        .then(() => {
        /* Caso de exito */
        res.status(201).json({ msg: 'Premio guardado' }); /* Codigo: 201 + mensaje de exito */
        })
        .catch((reason) => {
        /* Caso de fallo */
        console.log('Error guardando premio: ', reason)
        res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* put: actualizar */
function modify(req, res, next) {
  /* Llamada a consulta del modelo */
  Premio.update(req.params.idPremio, req.body)
    .then(() => {
      /* Caso de exito */
      res.status(201).json({ msg: 'Premio modificado' }); /* Codigo: 201 + mensaje de exito */
    })
    .catch((reason) => {
      /* Caso de fallo */
      console.log('Error modificando premio: ', reason)
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* get: listar */
function list (req, res, next) {
    /* Llamada a consulta del modelo */
    Premio.list()
    .then(premio => {
        /* Caso de exito */
        res.status(200).json(premio); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
        /* Caso de fallo */
        console.log('Error listando premios: ', reason)
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* delete: borrado */
function remove(req, res, next) {
  /* Busqueda de datos a borrar a partir de consulta del modelo */
  const premio = Premio.findPremio(req.params.idPremio)
  /* Eliminacion de datos a partir de objeto tipo schema obtenido de la consulta */
  premio.remove()
    .then(() => {
      /* Caso de exito */
      res.status(204).json({ msg: 'Premio eliminado'}); /* Codigo: 204 + mensaje de exito */
    })
    .catch((reason) => {
      /* Caso de fallo */
      console.log('Error borrando premio: ', reason)
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}


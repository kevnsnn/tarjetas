/* Controlador */
/* Librerias locales */
import Compra from './compras.model';
import Tarjeta from '../tarjetas/tarjetas.model';
// import Tienda from '../tiendas/tiendas.model';

/* Funcion de calculo de puntos */
function calculate(importe) {
let result = 0;

/* Comprobacion de si importe minimo */
if (importe >= 0.5) {
  result = Math.ceil(importe/1.5);
}

return result;
}

/* Funcion de acumulacion de puntos */
function accumulate(numTarjeta) {
  /* Obtencion de compras */
  Compra.list()
  .then(compras => {
      /* Caso de exito */
      let puntos = 0;

      /* Iteracion de compras para calulo y acumulacion de puntos */
      for(let i = 0; i < compras.length; i++) {
        puntos += calculate(compras[i].importe);
      }

      /* Actualizar puntos */
      Tarjeta.update(numTarjeta, {puntos: puntos})
  })
  .catch(reason => {
      /* Caso de fallo */
      console.log('Error listando compras: ', reason)
    res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
  });
}

/* get: Control de consulta de datos compras */
function list (req, res, next) {
    /* Llamada a consulta del modelo */
    Compra.list()
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
  let isVerified = false;
  /* Construccion objeto tipo schema compras a partir de datos del cuerpo */
  const compra = new Compra(req.body);
  
  /* Datos de compra a verificar */
  const idTienda = compra.idTienda;
  const numTarjeta = compra.numTarjeta;

  /* Verificacion de datos */
  // isVerified = Tienda.verify(idTienda);
  isVerified = Tarjeta.verify(numTarjeta);

  if(isVerified) {
    /* Insercion de datos en DB a partir de objeto tipo schema construido previamente */
    compra.save()
      .then(compra => {
        /* Caso de exito */
        res.status(201).json({ msg: 'Compra almacenada' }); /* Codigo: 201 + mensaje de exito */

        /* Acumulacion de puntos */
        accumulate(compra.numTarjeta);
      })
      .catch((reason) => {
        /* Caso de fallo */
        console.log('Error almacenando compra: ', reason)
        res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
      });
  } else {
      res.status(401).json({ msg: 'Credenciales erroneas' }); /* Codigo: 401 + mensaje de fallo*/
  }
}

/* put: Control actualizaciones de datos compra */
function modify(req, res, next) {
  /* Llamada a consulta del modelo */
  Compra.update(req.params.idTienda, req.params.numTarjeta, req.params.fecha, 
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
  const compra = Compra.findCompra(req.params.idTienda, req.params.numTarjeta, req.params.fecha, 
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
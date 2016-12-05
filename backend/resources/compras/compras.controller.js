/* Controlador */
/* Librerias locales */
import Compra from './compras.model';
import Tarjeta from '../tarjetas/tarjetas.model';
import Tienda from '../tiendas/tiendas.model';

/* Funcion que verifica datos de tiendas */
function verifyTienda(nombreTienda) {
  return Tienda.findTienda(nombreTienda) /* Busqueda de tienda */
    .then(tienda => {
      /* Caso de exito */
      /* Comprobacion de resultado */
      if (tienda) {
        return true;  /* Verificacion correcta */
      } else {
        return false; /* Verificacion incorrecta */
      }
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error verificando tienda: ', reason);
      return false; /* Verificacion incorrecta por problema en DB buscando tienda */
    });
}

/* Funcion que verifica datos de tarjetas */
function verifyTarjeta(numTarjeta) {
  return Tarjeta.findTarjeta(numTarjeta) /* Busqueda de tarjeta */
    .then(tarjeta => {
      /* Caso de exito */
      /* Comprobacion de resultado */
      if (tarjeta) {
        return true;  /* Verificacion correcta */
      } else {
        return false; /* Verificacion incorrecta */
      }
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error verificando tarjeta: ', reason);
      return false; /* Verificacion incorrecta por problema en DB buscando tarjeta */
    });
}

/* Funcion de acumulacion de puntos */
function accumulate(numTarjeta) {
  return Compra.listByNumTarjeta(numTarjeta) /* Obtencion de compras por numTarjeta */
    .then(compras => {
      /* Caso de exito */
      let puntos = 0; /* Acumulador de puntos */
      let dec = 0;    /* Parte decimal de importe */

      /* Iteracion de compras para calculo y acumulacion de puntos */
      for(let i = 0; i < compras.length; i++) {
        puntos += Math.floor(compras[i].importe); /* Acumulacion de puntos con parte entera de importe */
        dec = compras[i].importe % 1;             /* Obtencion de parte decimal del importe */

        if (dec > 0.5) {                          /* Si parte decimal mayor que 0.5 */
          puntos++;                               /* Acumular +1 punto */
        }
      }
        
      return Tarjeta.update(numTarjeta, { puntos: puntos }) /* Actualizacion de puntos */
        .then(tarjeta => {
          /* Caso de exito */
          /* Comprobacion de resultado */
          if (tarjeta) {
            return true;  /* Actualizacion correcta */
          } else {
            return false; /* Actualizacion incorrecta */            
          }
        })
        .catch(reason => {
          /* Caso de fallo */
          console.log('Error acumulando puntos: ', reason);
          return false; /* Acumulacion incorrecta por problema en DB actualizando puntos */
        });
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error listando compras: ', reason);
      return false; /* Acumulacion incorrecta por problema en db buscando compras por numTarjeta */
    });
}

/* get: Control de consulta de datos compras */
function list(req, res, next) {
  Compra.list() /* Llamada a consulta del modelo */
    .then(compras => {
      /* Caso de exito */
      res.status(200).json(compras); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error listando compras: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* get: Control de consulta de datos compras */
function listByTienda(req, res, next) {
  Compra.listByTienda(req.params.nombreTienda) /* Llamada a consulta del modelo */
    .then(compras => {
      /* Caso de exito */
      res.status(200).json(compras); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error listando compras: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
    });
}

/* post: Control registro de datos compra */
function create(req, res, next) {
  const compra = new Compra(req.body); /* Construccion objeto tipo schema Compra a partir de datos del cuerpo */
  /* Datos de compra a verificar */
  const numTarjeta = compra.numTarjeta;
  const nombreTienda = compra.nombreTienda;

  /* Verificacion de datos */
  verifyTienda(nombreTienda).then(verifiedTienda => {     /* Verificacion de tienda */
    if (verifiedTienda) {
      /* Tienda verificada */
      verifyTarjeta(numTarjeta).then(verifiedTarjeta => { /* Verificacion de tarjeta */
        if (verifiedTarjeta) {
          /* Tarjeta verificada */
          compra.save() /* Insercion de datos en DB a partir de objeto tipo schema construido previamente */
            .then(compra => {
              /* Caso de exito */
              accumulate(compra.numTarjeta).then(isAccumulated => { /* Acumulacion de puntos */
                if (isAccumulated) {
                  /* Acumulacion de puntos correcta */
                  res.status(201).json({ status: 0, msg: 'Compra almacenada y puntos acumulados' }); /* Status: Compra y acumulacion de puntos correcto + codigo: 201 + mensaje de exito */
                } else {
                  /* Acumulacion de puntos incorrecta */
                  res.status(201).json({ status: 1, msg: 'Compra almacenada pero fallo en acumulacion de puntos' }); /* Status: Compra correcta y acumulacion de puntos fallida + codigo: 201 + mensaje de exito */
                }
              });
            })
            .catch(reason => {
              /* Caso de fallo */
              console.log('Error almacenando compra: ', reason);
              res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
            });
        } else {
          /* Tarjeta no verificada */
          res.status(401).json({ msg: 'Credenciales erroneas' }); /* Codigo: 401 + mensaje de fallo */
        }
      });
    } else {
      /* Tienda no verificada */
      res.status(401).json({ msg: 'Credenciales erroneas' }); /* Codigo: 401 + mensaje de fallo */      
    }
  })
  .catch(reason => {
    /* Caso de fallo */
    console.log('Error verificando credenciales de compra: ', reason);
    res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
  });
}

/* put: Control actualizaciones de datos compra */
function modify(req, res, next) {
  verifyTarjeta(req.body.numTarjeta).then(verifiedTarjeta => { /* Verificacion de tarjeta */
    if (verifiedTarjeta) {
      /* Tarjeta verificada */
      Compra.update(req.params.id, req.body) /* Llamada a consulta del modelo */
        .then(oldCompra => {
          /* Caso de exito */
          if (oldCompra) {
            /* Caso actualizacion de datos correcta */
            accumulate(oldCompra.numTarjeta).then(isAccumulated => { /* Actualizacion de puntos de tarjeta antigua */
              if (isAccumulated) {
                /* Acumulacion correcta */
                if (req.body.numTarjeta && req.body.numTarjeta !== oldCompra.numTarjeta) {
                  /* Caso actualizacion implica actualizar dos tarjetas */
                  accumulate(req.body.numTarjeta).then(isOtherAccumulated => { /* Actualizacion de puntos de tarjeta nueva */
                    if (isOtherAccumulated) {
                      /* Acumulacion correcta */
                      res.status(200).json({ status: 0, msg: 'Compra y puntos modificados' }); /* Status: Compra y acumulacion de puntos correcto + codigo: 200 + mensaje de exito */
                    } else {
                      /* Acumulacion incorrecta */
                      res.status(200).json({ status: 2, msg: 'Compra modificada pero puntos de nueva tarjeta no modificada' }); /* Status: Compra correcta y acumulacion de puntos fallida + codigo: 200 + mensaje */
                    }
                  });
                } else {
                  /* Caso actualizacion implica actualizar una tarjeta */
                  res.status(200).json({ status: 0, msg: 'Compra y puntos modificados' }); /* Status: Compra y acumulacion de puntos correcto + codigo: 200 + mensaje de exito */
                }
              } else {
                /* Acumulacion incorrecta */
                res.status(200).json({ status: 1, msg: 'Compra modificada pero puntos de antigua tarjeta no modificada' }); /* Status: Compra correcta, fallo en puntos + codigo: 200 + mensaje */
              }
            });   
          } else {
            /* Caso de actualizacion fallida por compra no encontrada */
            res.status(404).json({ msg: 'Compra a modificar no encontrada' }); /* Codigo: 404 + mensaje de fallo */ 
          }
        })
        .catch(reason => {
          /* Caso de fallo */
          console.log('Error modificando compra: ', reason);
          res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
        });
    } else {
      /* Tarjeta no encontrada */
      res.status(404).json({ msg: 'Número de tarjeta no encontrada' }); /* Codigo: 404 + mensaje de fallo */
    }
  });
}

/* delete: Control borrado de datos compras */
function remove(req, res, next) {
  Compra.findCompra(req.params.id) /* Busqueda de compra a partir de consulta del modelo */
    .then(compra => {
      /* Caso de exito */
      /* Comprobacion de resultado */
      if (compra) {
        compra.remove() /* Eliminacion de compra a partir de objeto tipo schema obtenido de la consulta */
          .then(() => {
            accumulate(compra.numTarjeta).then(isAccumulated => { /* Actualizacion de puntos de tarjeta que figura en la compra eliminada */
            if (isAccumulated) {
              /* Acumulacion correcta */
              res.status(201).json({ status: 0, msg: 'Compra eliminada y puntos modificados' }); /* Status: Eliminacion compra y acumulacion de puntos correcto + codigo: 201 + mensaje de exito */
            } else {
              /* Acumulacion incorrecta */
              res.status(201).json({ status: 1, msg: 'Compra eliminada pero puntos no modificados' }); /* Status: Eliminacion compra correcta, fallo en puntos + codigo: 204 + mensaje */ 
            }
          });
        })
        .catch(reason => {
          /* Caso de fallo */
          console.log('Error eliminando compra: ', reason);
          res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
        });
      }
    });
}

/* Exportacion de funciones controladoras */
export default { list, listByTienda, create, modify, remove }
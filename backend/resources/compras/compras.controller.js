/* Controlador */
/* Librerias locales */
import Compra from './compras.model';
import Tarjeta from '../tarjetas/tarjetas.model';
import Tienda from '../tiendas/tiendas.model';

/* Funcion que verifica datos de tiendas */
function verifyTienda(nombreTienda) {
  /* Verificar si num de tarjeta registrado */
  return Tienda.findTienda(nombreTienda)
    .then(tienda => {
      /* Caso de exito */
      /* Comprobacion de resultado */
      if (tienda) {
        return true;
      } else {
        return false
      }
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error verificando tienda: ', reason);
      return false;
    });
}

/* Funcion que verifica datos de tarjetas */
function verifyTarjeta(numTarjeta) {
  let result = false
  /* Verificar si num de tarjeta registrado */
  return Tarjeta.findTarjeta(numTarjeta)
    .then(tarjeta => {
      /* Caso de exito */
      /* Comprobacion de resultado */
      if (tarjeta) {
        return true;
      } else {
        return false;
      }
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error verificando tarjeta: ', reason);
      return false;
    });
}

/* Funcion de acumulacion de puntos */
function accumulate(numTarjeta) {
  /* Obtencion de compras */
  return Compra.listByNumTarjeta(numTarjeta)
  .then(compras => {
      /* Caso de exito */
      let puntos = 0;
      let dec = 0;

      /* Iteracion de compras para calulo y acumulacion de puntos */
      for(let i = 0; i < compras.length; i++) {
        /* Comprobacion de si importe minimo */
          puntos += Math.floor(compras[i].importe);
          dec = compras[i].importe % 1;
          if (dec > 0.5) {
            puntos++;
          }
        }
        
      /* Actualizar puntos */
      return Tarjeta.update(numTarjeta, { puntos: puntos })
        .then(tarjeta => {
          /* Caso de exito */
          if (tarjeta) {
            /* Actualizacion correcta */
            return true;
          } else {
            /* Actualizacion incorrecta */
            return false;            
          }
        })
        .catch((reason) => {
          /* Caso de fallo */
          console.log('Error acumulando puntos: ', reason);
          return false;          
        });
    })
    .catch(reason => {
      /* Caso de fallo */
      console.log('Error listando compras: ', reason);
      return false;      
    });
}

/* get: Control de consulta de datos compras */
function list(req, res, next) {
    /* Llamada a consulta del modelo */
    Compra.list()
    .then(compras => {
        /* Caso de exito */
        res.status(200).json(compras); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
        /* Caso de fallo */
        console.log('Error listando compras: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* get: Control de consulta de datos compras */
function listByTienda(req, res, next) {
    /* Llamada a consulta del modelo */
    Compra.listByTienda(req.params.nombreTienda)
    .then(compras => {
        /* Caso de exito */
        res.status(200).json(compras); /* Codigo: 200 + resultado de consulta por cuerpo */
    })
    .catch(reason => {
        /* Caso de fallo */
        console.log('Error listando compras: ', reason);
      res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo*/
    });
}

/* post: Control registro de datos compra */
function create(req, res, next) {
  /* Construccion objeto tipo schema compras a partir de datos del cuerpo */
  const compra = new Compra(req.body);

  /* Datos de compra a verificar */
  const numTarjeta = compra.numTarjeta;
  const nombreTienda = compra.nombreTienda;

  /* Verificacion de datos */ 
  verifyTienda(nombreTienda).then(verifiedTienda => {
    if (verifiedTienda) {
      verifyTarjeta(numTarjeta).then(verifiedTarjeta => {
        if (verifiedTarjeta) {
          /* Insercion de datos en DB a partir de objeto tipo schema construido previamente */
          compra.save()
            .then(compra => {
              /* Caso de exito */
              /* Acumulacion de puntos */
              accumulate(compra.numTarjeta).then(isAccumulated => {
                if (isAccumulated) {
                  /* Status: Compra y acumulacion de puntos correcto + codigo: 201 + mensaje de exito */
                  res.status(201).json({ status: 0, msg: 'Compra almacenada y puntos acumulados' });
                } else {
                  /* Status: Compra correcta y acumulacion de puntos fallida + codigo: 201 + mensaje de exito */
                  res.status(201).json({ status: 1, msg: 'Compra almacenada pero fallo en acumulacion de puntos' });
                }
              });
            })
            .catch(reason => {
              /* Caso de fallo */
              console.log('Error almacenando compra: ', reason);
              res.status(500).json({ msg: 'DB blew up!' }); /* Codigo: 500 + mensaje de fallo */
            });
        } else {
          res.status(401).json({ msg: 'Credenciales erroneas' }); /* Codigo: 401 + mensaje de fallo */
        }
      });
    } else {
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
  /* Llamada a consulta del modelo */
  Compra.update(req.params.id, req.body)
    .then(oldCompra => {
      /* Caso de exito */
      if (oldCompra) {
        /* Caso actualizacion de datos correcta */
        /* Actualizacion de los puntos de la tarjeta que figura en la compra modificada */
        accumulate(oldCompra.numTarjeta).then(isAccumulated => {
          if (isAccumulated) {
            if (req.body.numTarjeta && req.body.numTarjeta !== oldCompra.numTarjeta) {
              /* Si la modificacion provoca cambio de puntos de otra tarjeta -> actualizar esa otra tarjeta */                  
              accumulate(req.body.numTarjeta).then(isOtherAccumulated => {
                if (isOtherAccumulated) {
                   /* Status: Compra y acumulacion de puntos correcto + codigo: 201 + mensaje de exito */
                  res.status(201).json({ status: 0, msg: 'Compra y puntos modificados' });
                } else {
                /* Status: Compra correcta y acumulacion de puntos fallida + codigo: 201 + mensaje */
                res.status(201).json({ status: 1, msg: 'Compra modificada pero puntos de antigua tarjeta no modificada' });
                }   
              });
            } else {
              /* Status: Compra y acumulacion de puntos correcto + codigo: 201 + mensaje de exito */
              res.status(201).json({ status: 0, msg: 'Compra y puntos modificados' });
            }
          } else {
            /* Status: Compra correcta, fallo en puntos + codigo: 201 + mensaje */                
            res.status(201).json({ status: 0, msg: 'Compra modificada pero puntos no modificados' });            
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
}

/* delete: Control borrado de datos tarjetas */
function remove(req, res, next) {
  /* Busqueda de datos a borrar a partir de consulta del modelo */
  Compra.findCompra(req.params.id)
    .then(compra => {
      /* Caso de exito */
      /* Comprobacion de resultado */
      if (compra) {
        /* Eliminacion de datos a partir de objeto tipo schema obtenido de la consulta */
        compra.remove()
          .then(() => {
          /* Actualizacion de los puntos de la tarjeta que figura en la compra eliminada */
          accumulate(compra.numTarjeta).then(isAccumulated => {
            if (isAccumulated) {
              /* Status: Eliminacion compra y acumulacion de puntos correcto + codigo: 204 + mensaje de exito */
              res.status(201).json({ status: 0, msg: 'Compra eliminada y puntos modificados' });
            } else {
              /* Status: Eliminacion compra correcta, fallo en puntos + codigo: 204 + mensaje */                
              res.status(201).json({ status: 1, msg: 'Compra eliminada pero puntos no modificados' }); 
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
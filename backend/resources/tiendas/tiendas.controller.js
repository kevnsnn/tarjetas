/* Controlador */
/* Librerias locales */
import Tienda from './tiendas.model';

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

/* Exportacion de funciones controladoras */
export default { create }
/* Controlador */
/* Librerias locales */
import Tarjeta from './tarjetas.model';

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

/* Exportacion de funciones controladoras */
export default { create }

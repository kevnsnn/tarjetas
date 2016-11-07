import Tarjeta from './tarjetas.model';

function list (req, res, next) {
    Tarjeta.list()
    .then(tarjetas => {
        res.status(200).json(tarjetas);
    })
    .catch(reason => {
        console.log('Error listando tarjetas: ', reason)
      res.status(500).json({ msg: 'DB blew up!' });
    });
}

function create(req, res, next) {
  const tarjeta = new Tarjeta(req.body);
  tarjeta.numTarjeta = Math.floor(Math.random() * (999999999 - 100000 + 1)) + 100000;
  tarjeta.save()
    .then(() => {
      res.status(201).json({ msg: 'Tarjeta almacenada' });
    })
    .catch((reason) => {
      console.log('Error almacenando tarjeta: ', reason)
      res.status(500).json({ msg: 'DB blew up!' });
    });
}

function modify(req, res, next) {
  Tarjeta.update(req.params.numTarjeta, req.body)
    .then(() => {
      res.status(201).json({ msg: 'Tarjeta modificada' });
    })
    .catch((reason) => {
      console.log('Error modificando tarjeta: ', reason)
      res.status(500).json({ msg: 'DB blew up!' });
    });
}

function remove(req, res, next) {
  const tarjeta = Tarjeta.findTarjeta(req.params.numTarjeta);
  tarjeta.remove()
    .then(() => {
      res.status(204).json({ msg: 'Tarjeta eliminada'});
    })
    .catch((reason) => {
      console.log('Error modificando tarjeta: ', reason)
      res.status(500).json({ msg: 'DB blew up!' });
    });
}

export default { list, create, modify, remove }
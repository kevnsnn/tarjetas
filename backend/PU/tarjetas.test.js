import request from 'supertest-as-promised';
import chai from 'chai';
import { expect } from 'chai';
import Tienda from '../resources/tiendas/tiendas.model';
import Tarjeta from '../resources/tarjetas/tarjetas.model';
import Compra from '../resources/compras/compras.model';
import app from '../index';

describe('## POST tiendas', () => {
  describe('# Registra una nueva tienda y no permite registrar otra tienda con los mismos datos', () => {
    before((done) => {
      Tienda.remove()
        .then(() => done());
    })
    it('Debe crear una nueva tienda', (done) => {
      request(app)
        .post('/api/tiendas')
          .send({ nombreTienda: 'Zara', direccion: 'C/Galicia', telefono: 910001122})
          .expect(201)
          .then(res => {
            expect(res.body.msg).to.equal('Tienda almacenada');
            done();
          })
          .done(null, done)
    });
    it('Debe dar error al crear una nueva tienda con los mismos datos', (done) => {
      request(app)
        .post('/api/tiendas')
          .send({ nombreTienda: 'Zara', direccion: 'C/Galicia', telefono: 910001122})
          .expect(500)
          .then(res => {
            expect(res.body.msg).to.equal('DB blew up!');
            done();
          })
          .done(null, done)
    });
  });
});

describe('## POST tarjetas', () => {
  describe('# Registra una nueva tarjeta y no permite registrar otra tarjeta con los mismos datos', () => {
    before((done) => {
      Tarjeta.remove()
        .then(() => done());
    })
    it('Debe crear una nueva tarjeta', (done) => {
      request(app)
        .post('/api/tarjetas')
          .send({ nombre: 'Roberto', primerApellido: 'Gomez', segundoApellido: 'Aguilera', 
          direccion: 'C/Palas de Rey', telefono: 911112233, email: 'roberto@email.com'})
          .expect(201)
          .then(res => {
            expect(res.body.msg).to.equal('Tarjeta almacenada');
            done();
          })
          .done(null, done)
    });
    it('Debe dar error al crear una nueva tarjeta con los mismos datos', (done) => {
      request(app)
        .post('/api/tarjetas')
          .send({ nombre: 'Roberto', primerApellido: 'Gomez', segundoApellido: 'Aguilera', 
          direccion: 'C/Palas de Rey', telefono: 911112233, email: 'roberto@email.com'})
          .expect(500)
          .then(res => {
            expect(res.body.msg).to.equal('DB blew up!');
            done();
          })
          .done(null, done)
    });
  });
});

describe('## POST compras', () => {
  describe('# No registra una nueva compra', () => {
    before((done) => {
      Compra.remove()
        .then(() => done());
    })
    it('Debe dar error al crear una nueva compra', (done) => {
      request(app)
        .post('/api/compras')
          .send({ nombreTienda: 'Zara', numTarjeta: 1234, importe: 47.50 })
          .expect(401)
          .then(res => {
            expect(res.body.msg).to.equal('Credenciales erroneas');
            done();
          })
          .done(null, done)
    });
  });
});

describe('## GET compras', () => {
  describe('# Lista las compras', () => {
    before((done) => {
      Compra.remove()
        .then(() => done());
    })
    it('Debe listar las compras con resultado vacio', (done) => {
      request(app)
        .get('/api/compras')
        .expect(200)
        .then(res => {
          expect(res.body).to.eql([]);
          done();
        })
        .done(null, done)
    });
  });
});

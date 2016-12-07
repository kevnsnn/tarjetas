import request from 'supertest-as-promised';
import chai from 'chai';
import { expect } from 'chai';
import Tienda from '../resources/tiendas/tiendas.model';
import Tarjeta from '../resources/tarjetas/tarjetas.model';
import Compra from '../resources/compras/compras.model';
import app from '../index';

let numTarjeta = 0;
let numTarjeta2 = 0;
let idCompra = '';

/*********************************** Vaciar DB ***********************************/
describe('### Pruebas', () => {
  describe('## Unitarias', () => {
    before((done) => {
      Tarjeta.remove()
        .then(() => { Tienda.remove().then(() => { Compra.remove().then(() => done()); }); } );
    })

/********************************** Gets vacios **********************************/
    it('#1 GET: debe listar las tarjetas con resultado vacio', (done) => {
      request(app)
        .get('/api/tarjetas')
        .expect(200)
        .then(res => {
          expect(res.body).to.eql([]);
          done();
        })
        .done(null, done)
    });
    it('#2 GET: debe listar las tiendas con resultado vacio', (done) => {
      request(app)
        .get('/api/tiendas')
        .expect(200)
        .then(res => {
          expect(res.body).to.eql([]);
          done();
        })
        .done(null, done)
    });
    it('#3 GET: debe listar las compras con resultado vacio', (done) => {
      request(app)
        .get('/api/compras')
        .expect(200)
        .then(res => {
          expect(res.body).to.eql([]);
          done();
        })
        .done(null, done)
    });

/********************* Posts de tarjetas y tiendas correctos *********************/
    it('#4 POST: debe crear una nueva tarjeta', (done) => {
      request(app)
        .post('/api/tarjetas')
          .send({ nombre: 'Roberto', primerApellido: 'Gomez', segundoApellido: 'Aguilera',
          direccion: 'C/Palas de Rey', telefono: 911112233, email: 'roberto@email.com', password: 'con123' })
          .expect(201)
          .then(res => {
            expect(res.body.msg).to.equal('Tarjeta almacenada');
            done();
          })
          .done(null, done)
    });
    it('#5 POST: debe crear una nueva tienda', (done) => {
      request(app)
        .post('/api/tiendas')
          .send({ nombreTienda: 'Zara', direccion: 'C/Galicia', telefono: 910001122, password: 'con123' })
          .expect(201)
          .then(res => {
            expect(res.body.msg).to.equal('Tienda almacenada');
            done();
          })
          .done(null, done)
    });

/******************** Posts de tarjetas y tiendas incorrectos ********************/
    it('#6 POST: debe dar error al crear una nueva tarjeta con los mismos datos', (done) => {
      request(app)
        .post('/api/tarjetas')
          .send({ nombre: 'Roberto', primerApellido: 'Gomez', segundoApellido: 'Aguilera', 
          direccion: 'C/Palas de Rey', telefono: 911112233, email: 'roberto@email.com', password: 'con123' })
          .expect(500)
          .then(res => {
            expect(res.body.msg).to.equal('DB blew up!');
            done();
          })
          .done(null, done)
    });
    it('#7 POST: debe dar error al crear una nueva tienda con los mismos datos', (done) => {
      request(app)
        .post('/api/tiendas')
          .send({ nombreTienda: 'Zara', direccion: 'C/Galicia', telefono: 910001122, password: 'con123' })
          .expect(500)
          .then(res => {
            expect(res.body.msg).to.equal('DB blew up!');
            done();
          })
          .done(null, done)
    });

/********************************* Gets no vacios ********************************/
    it('#8 GET: debe listar 1 tarjeta habiendo generado numTarjeta y puntos inicializados a 0', (done) => {
      request(app)
        .get('/api/tarjetas')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.length.of(1);
          expect(res.body[0].nombre).to.equal('Roberto');
          expect(res.body[0].primerApellido).to.equal('Gomez');
          expect(res.body[0].segundoApellido).to.equal('Aguilera');
          expect(res.body[0].direccion).to.equal('C/Palas de Rey');
          expect(res.body[0].telefono).to.equal(911112233);
          expect(res.body[0].email).to.equal('roberto@email.com');
          expect(res.body[0].password).to.equal('con123');
          expect(res.body[0]).to.have.property('numTarjeta');
          expect(res.body[0]).to.have.property('puntos');
          expect(res.body[0].puntos).to.equal(0);
          numTarjeta = res.body[0].numTarjeta;
          done();
        })
        .done(null, done)
    });
    it('#9 GET: debe listar 1 tienda', (done) => {
      request(app)
        .get('/api/tiendas')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.length.of(1);
          expect(res.body[0].nombreTienda).to.equal('Zara');
          expect(res.body[0].direccion).to.equal('C/Galicia');
          expect(res.body[0].telefono).to.equal(910001122);
          expect(res.body[0].password).to.equal('con123');
          done();
        })
        .done(null, done)
    });

/******************************** Compra correcta ********************************/
    it('#10 POST: debe crear una nueva compra', (done) => {
      request(app)
        .post('/api/compras')
          .send({ numTarjeta: numTarjeta, nombreTienda: 'Zara', importe: 30 })
          .expect(201)
          .then(res => {
            expect(res.body.msg).to.equal('Compra almacenada y puntos acumulados');
            done();
          })
          .done(null, done)
    });


/******************************* Compra incorrecta *******************************/
    it('#11 POST: debe dar error al crear una nueva compra', (done) => {
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

/******************* Puntos y compra almacenados correctamente *******************/
    it('#12 GET: debe listar 1 tarjeta con numTarjeta generada y puntos = 30', (done) => {
      request(app)
        .get('/api/tarjetas')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.length.of(1);
          expect(res.body[0].numTarjeta).to.equal(numTarjeta);          
          expect(res.body[0].puntos).to.equal(30);
          done();
        })
        .done(null, done)
    });
    it('#13 GET: debe listar 1 compra generando una fecha y datos correctos', (done) => {
      const now = new Date();
      const asecondago = new Date(now.getTime() - 1000);
      request(app)
        .get('/api/compras')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.length.of(1);
          expect(res.body[0].nombreTienda).to.equal('Zara');
          expect(res.body[0].numTarjeta).to.equal(numTarjeta);          
          expect(res.body[0].importe).to.equal(30);
          expect(res.body[0]).to.have.property('fecha');
          expect(new Date(res.body[0].fecha)).to.be.within(asecondago, now);
          idCompra = res.body[0]._id;          
          done();
        })
        .done(null, done)
    });

/******************************* Posts  correctos ********************************/
    it('#14 POST: debe crear una nueva tarjeta', (done) => {
      request(app)
        .post('/api/tarjetas')
          .send({ nombre: 'Elena', primerApellido: 'Robledo', segundoApellido: 'Moreno',
          direccion: 'C/Calle', telefono: 919998877, email: 'elena@email.com', password: 'con123' })
          .expect(201)
          .then(res => {
            expect(res.body.msg).to.equal('Tarjeta almacenada');
            done();
          })
          .done(null, done)
    });
    it('#15 POST: debe crear una nueva tienda', (done) => {
      request(app)
        .post('/api/tiendas')
          .send({ nombreTienda: 'Adidas', direccion: 'C/Deportes', telefono: 916665544, password: 'con123' })
          .expect(201)
          .then(res => {
            expect(res.body.msg).to.equal('Tienda almacenada');
            done();
          })
          .done(null, done)
    });
    it('#16 POST: debe crear una nueva compra', (done) => {
      request(app)
        .post('/api/compras')
          .send({ numTarjeta: numTarjeta, nombreTienda: 'Adidas', importe: 25.52 })
          .expect(201)
          .then(res => {
            expect(res.body.msg).to.equal('Compra almacenada y puntos acumulados');
            done();
          })
          .done(null, done)
    });

/******************************** Gets un resultado ******************************/
    it('#17 GET: debe obtener solo la tarjeta por email y esta tener 56 puntos', (done) => {
      request(app)
        .get('/api/tarjetas/roberto@email.com')
        .expect(200)
        .then(res => {
          expect(res.body.puntos).to.equal(56);
          done();
        })
        .done(null, done)
    });
    it('#18 GET: debe obtener solo la tarjeta por email', (done) => {
      request(app)
        .get('/api/tarjetas/elena@email.com')
        .expect(200)
        .then(res => {
          numTarjeta2 = res.body.numTarjeta;
          done();
        })
        .done(null, done)
    });
    it('#19 GET: debe obtener solo la tienda Adidas', (done) => {
      request(app)
        .get('/api/tiendas/Adidas')
        .expect(200)
        .then(res => {
          expect(res.body.nombreTienda).to.equal('Adidas');
          expect(res.body.direccion).to.equal('C/Deportes');
          expect(res.body.telefono).to.equal(916665544);
          done();
        })
        .done(null, done)
    });

/****************************** Get compras por tienda ***************************/
    it('#20 GET: debe listar 1 compra de Zara con datos correctos', (done) => {
      const now = new Date();
      const asecondago = new Date(now.getTime() - 1000);
      request(app)
        .get('/api/compras/Zara')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.length.of(1);
          expect(res.body[0].nombreTienda).to.equal('Zara');
          expect(res.body[0].numTarjeta).to.equal(numTarjeta);          
          expect(res.body[0].importe).to.equal(30);
          expect(res.body[0]).to.have.property('fecha');
          expect(new Date(res.body[0].fecha)).to.be.within(asecondago, now);
          done();
        })
        .done(null, done)
    });

/********************************* Puts correctos ********************************/
    it('#21 PUT: debe modificar tarjeta existente', (done) => {
      request(app)
        .put(`/api/tarjetas/${numTarjeta}`)
          .send({ telefono: 911117733 })
          .expect(200)
          .then(res => {
            done();
          })
          .done(null, done)
    });

    it('#22 PUT: debe modificar tienda existente', (done) => {
      request(app)
        .put('/api/tiendas/Zara')
          .send({ direccion: 'C/Moda' })
          .expect(200)
          .then(res => {
            done();
          })
          .done(null, done)
    });

    it('#23 PUT: debe modificar compra existente', (done) => {
      request(app)
        .put(`/api/compras/${idCompra}`)
          .send({ numTarjeta: numTarjeta, importe: 20 })
          .expect(200)
          .then(res => {
            expect(res.body.msg).to.equal('Compra y puntos modificados');            
            done();
          })
          .done(null, done)
    });

/************************ Puntos modificados correctamente ***********************/
    it('#24 GET: debe listar 1 tarjeta con numTarjeta generada y puntos = 46', (done) => {
      request(app)
        .get('/api/tarjetas/roberto@email.com')
        .expect(200)
        .then(res => {
          expect(res.body.numTarjeta).to.equal(numTarjeta);          
          expect(res.body.puntos).to.equal(46);
          done();
        })
        .done(null, done)
    });

/******************************** Puts incorrectos *******************************/
    it('#25 PUT: no debe modificar tarjeta existente', (done) => {
      request(app)
        .put('/api/tarjetas/1234')
          .send({ telefono: 911117733 })
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Tarjeta a modificar no encontrada');            
            done();
          })
          .done(null, done)
    });

    it('#26 PUT: no debe modificar tienda existente', (done) => {
      request(app)
        .put('/api/tiendas/Pepe')
          .send({ direccion: 'C/Moda' })
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Tienda a modificar no encontrada');            
            done();
          })
          .done(null, done)
    });
    it('#27 PUT: no debe modificar compra existente por numTarjeta', (done) => {
      request(app)
        .put(`/api/compras/${idCompra}`)
          .send({ numTarjeta: 1234, importe: 20 })
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Número de tarjeta no encontrada');            
            done();
          })
          .done(null, done)
    });
    it('#28 PUT: no debe modificar compra existente por id', (done) => {
      request(app)
        .put('/api/compras/584727b11bbc4d559149e1f3')
          .send({ numTarjeta: numTarjeta, importe: 20 })
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Compra a modificar no encontrada');            
            done();
          })
          .done(null, done)
    });

/******************************* Accesos correctos *******************************/
    it('#29 POST: debe loguear un socio', (done) => {
      request(app)
        .post('/api/login')
          .send({ email: 'roberto@email.com', password: 'con123' })
          .expect(200)
          .then(res => {
            done();
          })
          .done(null, done)
    });
    it('#30 POST: debe loguear una tienda', (done) => {
      request(app)
        .post('/api/login')
          .send({ nombreTienda: 'Zara', password: 'con123' })
          .expect(200)
          .then(res => {
            done();
          })
          .done(null, done)
    });

/**************** Put compra implica cambio puntos dos tarjetas ******************/
      it('#31 PUT: debe modificar compra existente y puntos de dos tarjetas', (done) => {
      request(app)
        .put(`/api/compras/${idCompra}`)
          .send({ numTarjeta: numTarjeta2 })
          .expect(200)
          .then(res => {
            expect(res.body.msg).to.equal('Compra y puntos modificados');            
            done();
          })
          .done(null, done)
    });

/************************ Puntos modificados correctamente ***********************/
    it('#32 GET: debe listar 1 tarjeta con numTarjeta generada y puntos = 26', (done) => {
      request(app)
        .get('/api/tarjetas/elena@email.com')
        .expect(200)
        .then(res => {
          expect(res.body.numTarjeta).to.equal(numTarjeta2);          
          expect(res.body.puntos).to.equal(20);
          done();
        })
        .done(null, done)
    });

/******************************** Delete compra *********************************/
    it('#33 DELETE: debe eliminar compra existente', (done) => {
      request(app)
        .delete(`/api/compras/${idCompra}`)
          .expect(201)
          .then(res => {
            expect(res.body.msg).to.equal('Compra eliminada y puntos modificados');            
            done();
          })
          .done(null, done)
    });


/******************************* Resto de deletes ********************************/
    it('#34 DELETE: debe eliminar tarjeta existente', (done) => {
      request(app)
        .delete(`/api/tarjetas/${numTarjeta}`)
          .expect(204)
          .then(res => {
            done();
          })
          .done(null, done)
    });
    it('#35 DELETE: debe eliminar tienda existente', (done) => {
      request(app)
        .delete('/api/tiendas/Zara')
          .expect(204)
          .then(res => {
            done();
          })
          .done(null, done)
    });

/****************************** Accesos incorrectos ******************************/
    it('#36 POST: no debe loguear un socio', (done) => {
      request(app)
        .post('/api/login')
          .send({ email: 'roberto@email.com', password: 'con123' })
          .expect(401)
          .then(res => {
            expect(res.body.msg).to.equal('Credenciales erroneas');            
            done();
          })
          .done(null, done)
    });
    it('#35 POST: no debe loguear una tienda', (done) => {
      request(app)
        .post('/api/login')
          .send({ nombreTienda: 'Zara', password: 'con123' })
          .expect(401)
          .then(res => {
            expect(res.body.msg).to.equal('Credenciales erroneas');            
            done();
          })
          .done(null, done)
    });
  });
});

/* Modelo */
/* Librerias npm */
import mongoose from 'mongoose';

/* Construccion schema de compras */
const CompraSchema = new mongoose.Schema({
  idTienda: {
    type: Number,
    required: true
  },
  numTarjeta: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: Number,
    required: true
  },
  importe: {
    type: Number,
    required: true
  }
},
{
  versionKey: false
});

CompraSchema.method({
});

CompraSchema.statics = {
  /* get: consulta todas las Compras en DB*/
  list() {
    return this.find({});
  },
  /* put: Busca los datos de una Compra y actualiza el importe */
  update(idTienda, numTarjeta, fecha, hora, modificaciones) {
    return this.findOneAndUpdate({idTienda: idTienda, 
                                  numTarjeta: numTarjeta, 
                                  fecha: fecha, 
                                  hora: hora},
       modificaciones, {multi: true});
  },
  /* Busca los datos de numTarjeta */
  findCompra(idTienda, numTarjeta, fecha, hora) {
    return this.findOne({ idTienda: idTienda, 
                          numTarjeta: numTarjeta, 
                          fecha: fecha, 
                          hora: hora });
  }
};

/* Exportacion de modelo tarjetas */
export default mongoose.model('Compra', CompraSchema);
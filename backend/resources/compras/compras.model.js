/* Modelo */
/* Librerias npm */
import mongoose from 'mongoose';

/* Construccion schema de compras */
const CompraSchema = new mongoose.Schema({
  nombreTienda: {
    type: String,
    required: true
  },
  numTarjeta: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now
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
  /* get: consulta todas las Compras en DB */
  list() {
    return this.find({});
  },
  /* get: consulta todas las Compras en DB por numTarjeta*/
  listByNumTarjeta(numTarjeta) {
    return this.find({numTarjeta: numTarjeta});
  },
  /* put: Busca los datos de una compra y actualiza los datos de modificaciones */
  update(fecha, modificaciones) {
    return this.findOneAndUpdate({ fecha: fecha }, modificaciones, { multi: true });
  },
  /* Busca los datos de una compra */
  findCompra(fecha) {
    return this.findOne({ fecha: fecha });
  },
  /* Busca los datos de una compra */
  findNumTarjeta(fecha) {
    return this.findOne({ fecha: fecha }).select('numTarjeta -_id');
  }
};

/* Exportacion de modelo tarjetas */
export default mongoose.model('Compra', CompraSchema);
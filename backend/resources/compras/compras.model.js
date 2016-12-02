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
    return this.find({ });
  },
  /* get: consulta todas las Compras en DB por numTarjeta*/
  listByNumTarjeta(numTarjeta) {
    return this.find({ numTarjeta: numTarjeta });
  }
};

/* Exportacion de modelo tarjetas */
export default mongoose.model('Compra', CompraSchema);
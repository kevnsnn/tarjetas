/* Modelo */
/* Librerias npm */
import mongoose from 'mongoose';

/* Construccion schema de compras */
const CompraSchema = new mongoose.Schema({
  nombreTienda: {
    type: Number,
    required: true
  },
  numTarjeta: {
    type: Number,
    required: true,
  },
  date: {
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
  /* get: consulta todas las Compras en DB*/
  list() {
    return this.find({});
  },
  /* put: Busca los datos de una compra y actualiza los datos de modificaciones */
  update(idTienda, numTarjeta, modificaciones) {
    return this.findOneAndUpdate({nombreTienda: nombreTienda, numTarjeta: numTarjeta}, modificaciones, {multi: true});
  },
  /* Busca los datos de una compra */
  findCompra(nombreTienda, numTarjeta) {
    return this.findOne({ nombreTienda: nombreTienda, numTarjeta: numTarjeta});
  }
};

/* Exportacion de modelo tarjetas */
export default mongoose.model('Compra', CompraSchema);
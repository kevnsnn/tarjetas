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
  },
  /* put: Busca los datos de una compra y actualiza los datos de modificaciones */
  update(id, modificaciones) {
    return this.findByIdAndUpdate(id, modificaciones, { multi: true });
  },
  /* Busca los datos de una compra */
  findCompra(id) {
    return this.findById(new mongoose.Types.ObjectId(id));
  },
  /* Busca los datos de una compra */
  findCompra2(id) {
    return this.findById(id);
  },
  /* Busca los datos de una compra */
  findCompra3(id) {
    return this.findOne({ _id: id }, 'numTarjeta');
  }
};

/* Exportacion de modelo tarjetas */
export default mongoose.model('Compra', CompraSchema);

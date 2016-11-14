/* Modelo */
/* Librerias npm */
import mongoose from 'mongoose';

/* Construccion schema de compras */
const PremioSchema = new mongoose.Schema({
  idPremio: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cuantity: {
    type: Number,
    required: true
  },
  numberPoints: {
    type: Number,
    required: true
  }
},
{
  versionKey: false
});

PremioSchema.method({
});

PremioSchema.statics = {
  /* put: Busca los datos del premio y actualiza los datos de modificaciones */
  update(idPremio, modificaciones) {
    return this.findOneAndUpdate({idPremio: idPremio}, modificaciones, {multi: true});
  },
  /* Busca los datos de un premio en base a su identificador */
  findPremio(idPremio) {
    return this.findOne({ idPremio: idPremio });
  }
};

/* Exportacion de modelo tarjetas */
export default mongoose.model('Premio', PremioSchema);
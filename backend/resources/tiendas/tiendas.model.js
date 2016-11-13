/* Modelo */
/* Librerias npm */
import mongoose from 'mongoose';

/* Construccion schema de tiendas */
const TiendaSchema = new mongoose.Schema({
  nombreTienda: {
    type: String,
    required: true,
    unique: true
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: Number,
    required: true
  }
},
{
  versionKey: false
});

TiendaSchema.method({
});

TiendaSchema.statics = {
  /* get: consulta todas las tiendas en DB*/
  list() {
    return this.find({});
  },
  /* put: Busca los datos de nombreTienda y actualiza los datos de modificaciones */
  update(nombreTienda, modificaciones) {
    return this.findOneAndUpdate({nombreTienda: nombreTienda}, modificaciones, {multi: true});
  },
  /* Busca los datos de nombreTienda */
  findTienda(nombreTienda) {
    return this.findOne({ nombreTienda: nombreTienda });
  }
};

/* Exportacion de modelo tiendas */
export default mongoose.model('Tienda', TiendaSchema);
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
  /* Busca los datos de nombreTienda */
  findTienda(nombreTienda) {
    return this.findOne({ nombreTienda: nombreTienda });
  }
};

/* Exportacion de modelo tiendas */
export default mongoose.model('Tienda', TiendaSchema);
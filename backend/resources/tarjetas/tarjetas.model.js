/* Modelo */
/* Librerias npm */
import mongoose from 'mongoose';

/* Construccion schema de tarjetas */
const TarjetaSchema = new mongoose.Schema({
  numTarjeta: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  primerApellido: {
    type: String,
    required: true
  },
  segundoApellido: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  puntos: {
    type: Number,
    required: true,
    default: 0
  }
},
{
  versionKey: false
});

TarjetaSchema.method({
});

TarjetaSchema.statics = {
  /* get: consulta todas las tarjetas en DB*/
  list() {
    return this.find({});
  },
  /* put: Busca los datos de numTarjeta y actualiza los datos de modificaciones */
  update(numTarjeta, modificaciones) {
    return this.findOneAndUpdate({ numTarjeta: numTarjeta }, modificaciones, { multi: true });
  },
  /* Busca los datos por numTarjeta */
  findTarjeta(numTarjeta) {
    return this.findOne({ numTarjeta: numTarjeta });
  },
  /* Busca los datos por email */
  findByEmail(email) {
    return this.findOne({ email: email });
  },
  /* Comprueba credenciales de logueo de socio */
  findByCredentials(email, password) {
    return this.findOne({email: email, password: password}).select('-password');
  }
};

/* Exportacion de modelo tarjetas */
export default mongoose.model('Tarjeta', TarjetaSchema);

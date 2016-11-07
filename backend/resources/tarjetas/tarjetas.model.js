import mongoose from 'mongoose';

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
  list() {
    return this.find({});
  },
  update(numTarjeta, modificaciones) {
    return this.findOneAndUpdate({numTarjeta: numTarjeta}, modificaciones, {multi: true});
  },
  findTarjeta(numTarjeta) {
    return this.findOne({ numTarjeta: numTarjeta });
  }
};

export default mongoose.model('Tarjeta', TarjetaSchema);
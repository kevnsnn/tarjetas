/* Librerias npm */
import express from 'express';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import fs from 'fs';
import schedule from 'node-schedule';
/* Librerias locales */
import config from './config';
import tasks from './tasks';

// Uso de promesas tipo bluebird en lugar de tipo mongoose
mongoose.Promise = Promise;

/* Conexion a base de datos */
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } });

/* Mongoose listeners */
/* Caso de fallo de conexion */
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});
/* Caso de exito de conexion */
mongoose.connection.on('connected', () => {
  console.log(`connection to database: ${config.db} establecied`);  
});
/* Caso de desconexion */
mongoose.connection.on('disconnected', () => {
  console.log(`connection to database: ${config.db} lost`);
});

/* Construccion de API */
const app = express();
/* Sobre protocolo http */
const httpServer = http.Server(app);

/* Middleware para cruce de dominios */
app.use(cors());
/* Middleware de configuracion: json como lenguaje de objetos para intercambios de datos */
app.use(bodyParser.json());

/* Montaje recursos de API */
app.use('/api', require('./resources/routes').default);

/* tareas */
let j = schedule.scheduleJob({day: 1}, () => {
  tasks.global();
})

/* Endpoint por defecto */
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Endpoint not found' });
});

/* Lanzamiento API */
httpServer.listen(config.port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Listening....');
});

/* Exportaion API */
export default httpServer;
import express from 'express';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import http from 'http';
import config from './config';
import cors from 'cors';

// Use bluebird promises instead of mongoose ones
mongoose.Promise = Promise;

// Connect to Database!
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } });

// Mongoose listeners
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});
mongoose.connection.on('connected', () => {
  console.log(`connection to database: ${config.db} establecied`);  
});
mongoose.connection.on('disconnected', () => {
  console.log(`connection to database: ${config.db} lost`);
});

const app = express();
const httpServer = http.Server(app);

app.use(cors());
app.use(bodyParser.json());

app.use('/api', require('./resources/routes').default);

app.use((req, res, next) => {
  res.status(404).json({ msg: 'Endpoint not found' });
});

httpServer.listen(config.port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Listening....');
});

export default httpServer;
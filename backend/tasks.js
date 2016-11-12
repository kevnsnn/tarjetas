/* Tareas mensuales */
/* Librerias */
import fs from 'fs';
import nodemailer from 'nodemailer';

/* Asignar mes de informes */
const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

let date = new Date();
let month = monthNames[date.getMonth()];

/* Configuración email */
/* Credenciales */
let transporter = nodemailer.createTransport('smtps://tarjetasis2%40gmail.com:IS2tarjetas@smtp.gmail.com');

/* Funcion de envio de email */
function sendEmail(to, subject) {
  /* Opciones de transporte */
  let mailOptions = {
    from: '"Ing Software ?" <tarjetasis2@gmail.com>', /* Emisor */
    to: to, /* Receptor/es */
    subject: subject, /* Asunto */
    text: 'Hello world ?', /* plaintext body */
    html: '<b>Hello world ?</b>' /* html body */
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      return console.log(error);
    }
    console.log('Mensaje enviado: ' + info.response);
  });
}

/* Tareas */
/* Generar informe global de tarjetas */
function global() {
  let writeStream = fs.createWriteStream(`./reports/IGT_${month}.xls`);

  let header = 'Numero'+'\t'+'Nombre'+'\t'+'Gastos'+'\t'+'Puntos acumulados'+'\t'+'Canjes'+'\t'+'Puntos actuales'+'\n';

  writeStream.write(header);
  writeStream.close();
}

/* Generar listado de premios y envio */
function premios() {
  let to = 'kevcubero@gmail.com';
  let subject = '¡Estos son los premios disponibles de este mes!';

  sendEmail(to, subject);
}

export default { global, premios };
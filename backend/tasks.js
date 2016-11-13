/* Tareas mensuales */
/* Librerias */
import fs from 'fs';
import nodemailer from 'nodemailer';

/* Metodo para asignacion de meses de informes */
const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

function asignarMes() {
  let date = new Date(); /* Dia actual */
  let month = monthNames[date.getMonth()]; /* Mes actual */
  return month;
}

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

  /* Envio de email */
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      /* Caso de fallo de envio */
      return console.log(error);
    }
    /* Caso de exito de envio */
    console.log('Mensaje enviado: ' + info.response);
  });
}

/* Tareas */
/* Generar informe global de tarjetas */
function global() {
  let month = asignarMes(); /* Asignacion del mes del informe */

  console.log(`Generando informe global de tarjetas del mes de ${month}`)
  
  /* Crear directorio de informes si no existe */
  if (!fs.existsSync('./reports')){
    fs.mkdirSync('./reports');
  }

  let writeStream = fs.createWriteStream(`./reports/IGT_${month}.xls`); /* Crear informe (archivo excel) */

  /* Cadecera de tabla con datos requeridos */
  let header = 'Numero'+'\t'+'Nombre'+'\t'+'Gastos'+'\t'+'Puntos acumulados'+'\t'+'Canjes'+'\t'+'Puntos actuales'+'\n';

  /* Escritura y cierre de informe */
  writeStream.write(header);
  writeStream.close();
}

/* Generar listado de premios y envio */
function premios() {
  let to = 'kevcubero@gmail.com'; /* Receptores del email */
  let subject = '¡Estos son los premios disponibles de este mes!'; /* Asunto del email */

  sendEmail(to, subject); /* Envio del email */
}

/* Generar informe de movimientos y envio */
function movimientos() {
  let to = 'kevcubero@gmail.com'; /* Receptores del email */
  let subject = '¡Estos han sido tus movimientos de este mes!'; /* Asunto del email */

  sendEmail(to, subject); /* Envio del email */
}

/* Exportacion de funciones */
export default { global, premios, movimientos };
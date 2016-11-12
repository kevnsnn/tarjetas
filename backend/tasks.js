/* Tareas mensuales */
/* Librerias */
import fs from 'fs';

/* Asignar mes de informes */
const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

let date = new Date();
let month = monthNames[date.getMonth()];

/* Tareas */

/* Generar informe global de tarjetas */
function global() {
  let writeStream = fs.createWriteStream(`./reports/IGT_${month}.xls`);

  let header = 'Numero'+'\t'+'Nombre'+'\t'+'Gastos'+'\t'+'Puntos acumulados'+'\t'+'Canjes'+'\t'+'Puntos actuales'+'\n';

  writeStream.write(header);
  writeStream.close();
}

export default { global };
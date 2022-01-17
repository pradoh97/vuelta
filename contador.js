let fecha = {};
fecha['actual'] = new Date();
fecha['vuelta'] = new Date("2021-12-15");
fecha['enterado'] = new Date("2021-11-26");

let fechasDOM;
let progresoDOM;
let imagenProgreso;
let barraProgreso;
let tiempo = {};
let idAnimacion;

tiempo['dias'] = '0';
tiempo['horas'] = '0';
tiempo['minutos'] = '0';
tiempo['segundos'] = '0';

window.addEventListener('load', iniciarContador);

function iniciarContador(){
  fechasDOM = document.querySelectorAll('.tiempo');
  progresoDOM = document.querySelector('.progreso');
  imagenProgreso = document.querySelector('.animacion img');
  barraProgreso = document.querySelector('progress');

  fechasDOM

  idAnimacion = requestAnimationFrame(actualizarRestante);
}

function calcularProgreso(){
  let total = Date.parse(fecha['vuelta']) - Date.parse(fecha['enterado']);
  let restante = (Date.parse(fecha['vuelta']) - Date.parse(fecha['actual']));
  
  let progreso = 1 - Number((restante/total).toFixed(2));

  return progreso;
}

function calcularTiempoRestante() {
  fecha['actual'] = new Date();

  diferencia = Math.abs(fecha["vuelta"]-fecha["actual"])/(1000*60*60*24);

  for(division in tiempo){
    if(diferencia > 0.01) tiempo[division] = String(Math.floor(diferencia));

    if(division == 'dias') diferencia = (diferencia - tiempo[division])*24;
    else diferencia = (diferencia - tiempo[division])*60;

    if(tiempo[division] < 10) tiempo[division] = tiempo[division].padStart(2, '0');
  }
}

function actualizarRestante(){
  calcularTiempoRestante();

  let progreso = calcularProgreso();
  let llegue = false;

  if(progreso >= 1){
    window.cancelAnimationFrame(idAnimacion);
    progreso = 1;
    llegue = true;
  }

  progresoDOM.style.width = String(100*progreso) + "%";
  imagenProgreso.style.left = String(100*progreso) + "%";
  barraProgreso.value = progreso*100;

  if(llegue){
    document.querySelector('h1').innerText = "Hernán ya llegó de la Antartida :)";
    return;
  }

  for(nodoDivision of fechasDOM){
    let elemento = nodoDivision.querySelector('span:first-child');
    let division = elemento.parentElement.getAttribute('data-division');
    elemento.innerText = tiempo[division][0];

    elemento = nodoDivision.querySelector('span:last-of-type');
    division = elemento.parentElement.getAttribute('data-division');
    elemento.innerText = tiempo[division][1];
  }

  idAnimacion = requestAnimationFrame(actualizarRestante);
}

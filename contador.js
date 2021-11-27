let fecha = {};
fecha['actual'] = new Date();
fecha['vuelta'] = new Date("2021-12-16");

let fechasDOM = document.querySelectorAll('.tiempo');
let tiempo = {};

tiempo['dias'] = '0';
tiempo['horas'] = '0';
tiempo['minutos'] = '0';
tiempo['segundos'] = '0';

window.addEventListener('load', iniciarContador);

function iniciarContador(){
  calcularRestante();
  requestAnimationFrame(actualizarRestante);
}

function calcularRestante() {
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
  for(nodoDivision of fechasDOM){
    let elemento = nodoDivision.querySelector('span:first-child');
    let division = elemento.parentElement.getAttribute('data-division');
    elemento.innerText = tiempo[division][0];

    elemento = nodoDivision.querySelector('span:last-of-type');
    division = elemento.parentElement.getAttribute('data-division');
    elemento.innerText = tiempo[division][1];

  }
  calcularRestante();
  requestAnimationFrame(actualizarRestante);
}

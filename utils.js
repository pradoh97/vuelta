let alternador;

iniciarAlternadores();

function iniciarAlternadores(){
  alternarModo();
  alternador = document.getElementById('alternar-modo');

  alternador.disabled = false;

  alternador.addEventListener('click', alternarModo);
}

function alternarModo(e = 0) {
  let modo = localStorage.getItem('modo');

  if(e){
    document.body.classList.toggle('claro');
    localStorage.setItem('modo', document.body.classList[0] || '');
  } else if(modo){
    document.body.classList.add(modo);
  }
}

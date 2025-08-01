let numeroSecreto = 0;
let intentos = 0;
let numeroMaximo = 10;
let listaNumerosSorteados = [];
let listaNumeroASortear = [];

const botonIntentar = document.getElementById("intentar");
const botonReiniciar = document.getElementById("reiniciar");
const botonMostrarResultado = document.getElementById("pista");

const textoEnunciado = document.getElementById("texto-enunciado");
const textoPista = document.getElementById("texto-pista");

const imagenBase = "img/ia.png";
const imagenDerrota = "img/pngDerrota.png"
const animacionDerrota = "img/gifDerrota.gif";
const imagenVictoria = "img/pngVictoria.png";
const animacionVictoria = "img/gifVictoria.gif"

function listaNumerosBase() {
  listaNumeroASortear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

function activarBoton(boton) {
  boton.removeAttribute("disabled");
}
function desactivarBoton(boton) {
  boton.setAttribute("disabled", "true");
}
function cambiarImagen(pathImagen) {
  document.getElementById("imagen").setAttribute("src", pathImagen);
}

function verificarIntento() {
  intentos++;
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
  console.log(`introducido: ${numeroDeUsuario} secreto: ${numeroSecreto}`);
  if (numeroDeUsuario === numeroSecreto) {
    textoEnunciado.innerText = `Acertaste en el intento numero: ${intentos}`;
    listaNumeroASortear = listaNumeroASortear.filter(
      (numero) => numero !== numeroDeUsuario);
    
    cambiarImagen(animacionVictoria);
    setTimeout(function(){cambiarImagen(imagenVictoria); },5000);
    estadoBotonesDespuesDeSorteo();

  } else {
    actualizarEnunciado();
    let texto = `El número es ${
      numeroDeUsuario < numeroSecreto ? "mayor" : "menor"
    }`;
    textoEnunciado.innerText = `Intento ${intentos}: ${texto} que ${numeroDeUsuario}`;
  }
  if (listaNumerosSorteados.length === 10) {
    actualizarEnunciado();
    listaNumerosBase();
    estadoBotonesDespuesDeSorteo();
    listaNumerosSorteados = [];
  }
}

function reiniciarJuego() {
  condicionesIniciales();
  botonesEstadoInicial();
  actualizarEnunciado();
  cambiarImagen(imagenBase);

  if (listaNumeroASortear.length === 0) {
    listaNumerosBase();
  }
}

function botonesEstadoInicial() {
  desactivarBoton(botonReiniciar);
  activarBoton(botonIntentar);
  activarBoton(botonMostrarResultado);
}

function estadoBotonesDespuesDeSorteo() {
  desactivarBoton(botonIntentar);
  desactivarBoton(botonMostrarResultado);
  activarBoton(botonReiniciar);
}

function asignarTextoElemento(elemento, texto) {
  document.querySelector(elemento).innerHTML = texto;
}

function generarNumeroSecreto() {
  if (listaNumeroASortear.length === 0) {
    return;
  }
  let i = Math.floor(Math.random() * listaNumeroASortear.length);
  let numeroGenerado = listaNumeroASortear[i];
  listaNumerosSorteados.push(numeroGenerado);
  console.log(listaNumerosSorteados.join(", "));
  console.log(`Numero generado: ${numeroGenerado}`);

  return numeroGenerado;
}

function condicionesIniciales() {
  numeroSecreto = generarNumeroSecreto();
  asignarTextoElemento("h1", "Juego del número secreto");
  intentos = 0;
  botonesEstadoInicial();
}

function mostrarRespuesta() {
  textoEnunciado.innerText = `El número secreto era: ${numeroSecreto}`;
  estadoBotonesDespuesDeSorteo();
  listaNumeroASortear = listaNumeroASortear.filter(
    (numero) => numero !== numeroSecreto);
    
    cambiarImagen(animacionDerrota);
    setTimeout(function(){cambiarImagen(imagenDerrota); },4400);
    
    
}

function actualizarEnunciado() {
  if (listaNumeroASortear.length > 0) {
    const min = Math.min(...listaNumeroASortear);
    const max = Math.max(...listaNumeroASortear);
    textoEnunciado.innerText =
      min === max
        ? `Elige el numero ${min}`
        : `Elige un numero del ${min} al ${max}`;
    textoPista.innerText = `Números disponibles: ${listaNumeroASortear.join(
      ", "
    )}`;
  } else {
    textoEnunciado.innerText = "Sin números disponibles";
    textoPista.innerText = "No hay números para mostrar la pista.";
  }
}

listaNumerosBase();
condicionesIniciales();
actualizarEnunciado();

document
  .getElementById("valorUsuario")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter" && !botonIntentar.disabled) {
      event.preventDefault();
      verificarIntento();
    }
  });

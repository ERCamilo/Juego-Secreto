
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let listaNumeroASortear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


const botonIntentar = document.getElementById("intentar");
const botonReiniciar = document.getElementById("reiniciar");
const textoRango = document.getElementById("rango");
const botonPista = document.getElementById("pista");
const rangoNormalSpan = document.querySelector(".rango-normal");
const rangoPistaSpan = document.querySelector(".rango-pista");


function verificarIntento() {

    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    console.log(`introducido: ${numeroDeUsuario} secreto: ${numeroSecreto}`);
    if (numeroDeUsuario === numeroSecreto) {
        botonReiniciar.removeAttribute("disabled");
        rangoNormalSpan.innerText = `Acertaste en el intento numero: ${intentos}`;
        botonIntentar.setAttribute('disabled', 'true');
        listaNumeroASortear = listaNumeroASortear.filter(numero => numero !== numeroDeUsuario);

    } else {
        actualizarEnunciado()
    }
    if (listaNumerosSorteados.length === 10) {
        actualizarEnunciado();
        botonIntentar.setAttribute('disabled', 'true');
        listaNumeroASortear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        listaNumerosSorteados = [];
        return;
    }
    intentos++;
    return;
}

function reiniciarJuego() {

    condicionesIniciales();
    botonReiniciar.setAttribute('disabled', 'true');
    botonIntentar.removeAttribute("disabled");
    document.getElementById("imagen").setAttribute('src', 'img/ia.png');
    listaNumeroASortear = listaNumeroASortear.length == 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : listaNumeroASortear;
    actualizarEnunciado();


    return;
}



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}


function generarNumeroSecreto() {
    if (listaNumeroASortear.length === 0) {
        return;
    }
    let indice = Math.floor(Math.random() * listaNumeroASortear.length);
    let numeroGenerado = listaNumeroASortear[indice];
    listaNumerosSorteados.push(numeroGenerado);
    console.log(listaNumerosSorteados);
    console.log(`Numero generado: ${numeroGenerado}`);
    return numeroGenerado;
}


function condicionesIniciales() {
    numeroSecreto = generarNumeroSecreto();
    asignarTextoElemento("h1", "Juego del numero secreto");
    intentos = 1;
    botonReiniciar.setAttribute('disabled', 'true');
    botonIntentar.removeAttribute("disabled");
    document.getElementById("pista").removeAttribute("disabled");

    return;
}


function mostrarRespuesta() {
    rangoNormalSpan.innerText  = `El numero secreto es: ${numeroSecreto}`;
    botonPista.setAttribute('disabled', 'true');
    botonIntentar.setAttribute('disabled', 'true');
    botonReiniciar.removeAttribute("disabled");
    document.getElementById("imagen").setAttribute('src', 'img/iaSad.png');
    listaNumeroASortear = listaNumeroASortear.filter(numero => numero !== numeroSecreto);
    return;
}

condicionesIniciales();
actualizarEnunciado();


function actualizarEnunciado() {
    let textoNormal = "";
    let textoPista = "";

    if (listaNumeroASortear.length > 0) {
        const min = Math.min(...listaNumeroASortear);
        const max = Math.max(...listaNumeroASortear);
       textoNormal= min === max ? `Elige el numero ${min}` : `Elige un numero del ${min} al ${max}`
       textoPista = `Números disponibles: ${listaNumeroASortear.join(", ")}`;

       
    } else {
           textoNormal = "Sin números disponibles";
           textoPista = "No hay números para mostrar la pista.";
    }
    rangoNormalSpan.innerText = textoNormal;
    rangoPistaSpan.innerText = textoPista;

}


//funcion al precionar enter en imput verifica intento
document.getElementById("valorUsuario").addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !botonIntentar.disabled) {
        event.preventDefault();
        verificarIntento();
    }
});



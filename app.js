
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let listaNumeroASortear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];




function verificarIntento() {

    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    console.log(`introducido: ${numeroDeUsuario} secreto: ${numeroSecreto}`);
    if (numeroDeUsuario === numeroSecreto) {
        document.getElementById("reiniciar").removeAttribute("disabled");

        document.getElementById("rango").innerText = `Acertaste el numero en el intento numero: ${intentos}`;
        document.getElementById("intentar").setAttribute('disabled', 'true');
        listaNumeroASortear = listaNumeroASortear.filter(numero => numero !== numeroDeUsuario);

    } else {
        document.getElementById("rango").innerText = `Intenta con un numero ${numeroDeUsuario > numeroSecreto ? "menor" : "mayor"}`;
    }
    if (listaNumerosSorteados.length === 10) {
        document.getElementById("rango").innerText = "Ya se han utilizado todos los numeros posibles";
        document.getElementById("intentar").setAttribute('disabled', 'true');
        listaNumeroASortear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        listaNumerosSorteados = [];
        return;
    }
    limpliarCaja();
    intentos++;
    return;
}

function reiniciarJuego() {

    condicionesIniciales();
    document.getElementById("reiniciar").setAttribute('disabled', 'true');
    document.getElementById("intentar").removeAttribute("disabled");
    limpliarCaja();
    document.getElementById("imagen").setAttribute('src', 'img/ia.png');
    listaNumeroASortear = listaNumeroASortear.length == 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : listaNumeroASortear;
    actualizarEnunciado();


    return;
}

function limpliarCaja() {
    let valueCaja = document.querySelector('#valorUsuario').value = "";
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
    document.getElementById("reiniciar").setAttribute('disabled', 'true');
    document.getElementById("intentar").removeAttribute("disabled");
    document.getElementById("pista").removeAttribute("disabled");
    return;
}


function mostrarRespuesta() {
    document.getElementById("rango").innerText = `El numero secreto es: ${numeroSecreto}`;
    document.getElementById("pista").setAttribute('disabled', 'true');
    document.getElementById("intentar").setAttribute('disabled', 'true');
    document.getElementById("reiniciar").removeAttribute("disabled");
    document.getElementById("imagen").setAttribute('src', 'img/iaSad.png');
    listaNumeroASortear = listaNumeroASortear.filter(numero => numero !== numeroSecreto);
    return;
}

condicionesIniciales();
actualizarEnunciado();


function actualizarEnunciado() {
    if (listaNumeroASortear.length > 0) {
        const min = Math.min(...listaNumeroASortear);
        const max = Math.max(...listaNumeroASortear);
        let textoEnunciado = min === max ? `Elige el numero ${min}` : `Elige un numero del ${min} al ${max}`;
        document.getElementById("rango").innerText = textoEnunciado;
    } else {
        document.getElementById("rango").innerText = "Sin números disponibles";
    }
}


function mostrarPista() {
    document.getElementById("rango").innerText = `Números disponibles: ${listaNumeroASortear.join(", ")}`;
}

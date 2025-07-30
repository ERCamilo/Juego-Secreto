
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados =[];
let numeroMaximo = 10;

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    console.log(`introducido: ${numeroDeUsuario} secreto: ${numeroSecreto}`);        
    if(numeroDeUsuario === numeroSecreto){
      document.getElementById("reiniciar").removeAttribute("disabled");
      asignarTextoElemento("p",`Acertaste el numero en el intento numero: ${intentos}`);
      document.getElementById("intentar").setAttribute('disabled', 'true');
    }else{
      asignarTextoElemento("p",`Intenta con un numero ${numeroDeUsuario > numeroSecreto? "menor":"mayor"}`);
    }
        if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento("p", "Ya se han utilizado todos los numeros posibles");
        document.getElementById("intentar").setAttribute('disabled', 'true');
        document.getElementById("reintentar").setAttribute('disabled', 'true');
        return;
        }

    limpliarCaja();
    intentos++;
    return;
}

function reiniciarJuego(){
    condicionesIniciales();
    document.getElementById("reiniciar").setAttribute('disabled', 'true');
    document.getElementById("intentar").removeAttribute("disabled");
    limpliarCaja();
    document.getElementById("imagen").setAttribute('src', 'img/ia.png');
    return;
}

function limpliarCaja(){
   let valueCaja = document.querySelector('#valorUsuario').value ="";
}

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function generarNumeroSegreto(){
    let numeroGenerado = Math.floor(Math.random()*10)+1;
    if (listaNumerosSorteados.length === numeroMaximo) {
        return;
    }

    if(listaNumerosSorteados.includes(numeroGenerado)){
        return generarNumeroSegreto();
    }else{
        listaNumerosSorteados.push(numeroGenerado);
        console.log(listaNumerosSorteados);
        console.log(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales(){
numeroSecreto = generarNumeroSegreto();
asignarTextoElemento("h1", "Juego del numero secreto");
asignarTextoElemento("p", `Elige un numero del 1 al ${numeroMaximo}`);
intentos = 1;
document.getElementById("reiniciar").setAttribute('disabled', 'true');
document.getElementById("intentar").removeAttribute("disabled");
document.getElementById("pista").removeAttribute("disabled");
return;
}


function mostrarPista(){
    let texto = `El numero secreto es ${numeroSecreto}`;
    asignarTextoElemento("p", texto);
    document.getElementById("pista").setAttribute('disabled', 'true');
    document.getElementById("intentar").setAttribute('disabled', 'true');
    document.getElementById("reiniciar").removeAttribute("disabled");
    document.getElementById("imagen").setAttribute('src', 'img/iaSad.png');
    return;
}

condicionesIniciales();





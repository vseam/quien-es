function Persona(nombre, genero, pelo, complemento) {
    this.nombre      = nombre;
    this.genero      = genero;
    this.pelo        = pelo;
    this.complemento = complemento;

    this.mostrar = mostrar;
    function mostrar(elemento) {
        elemento.innerHTML = '<b>Nombre</b>: ' + nombre + '<br />' +
                             '<b>Género</b>: ' + genero + '<br />' +
                             '<b>Pelo</b>: ' + pelo + '<br />' +
                             '<b>Complemento</b>: ' + complemento;
    }
}

// Genera un número aleatorio desde 0 hasta el número dado.
function numeroAleatorio(tamaño) {
    return Math.floor(Math.random() * tamaño);
}

// Comprueba si la persona generada ya está en el tablero.
function comprobarRepetido(personasJugador, genero, pelo, complemento) {
    var repetido = false;
    for(var i = 0; i < personasJugador.length; i++) {
        if(personasJugador[i].genero == genero && personasJugador[i].pelo == pelo && personasJugador[i].complemento == complemento) {
            repetido = true;
            break;
        }
    }

    return repetido;
}

// Genera las características de las personas.
function generarCaracteristicas(personasJugador, posicion) {
    var personaRepetida = false;
    do {
        var generoPersona      = genero[numeroAleatorio(genero.length)];
            peloPersona        = pelo[numeroAleatorio(pelo.length)];
            complementoPersona = complemento[numeroAleatorio(complemento.length)];

        personaRepetida = comprobarRepetido(personasJugador, generoPersona, peloPersona, complementoPersona);
    } while(personaRepetida);

    return new Persona('Sospechoso ' + (posicion+1), generoPersona, peloPersona, complementoPersona);
}

function caracteristicasPersonas(personasJ1, personasJ2) {
    for(var i = 0; i < 8; i++) {
        if(i == 0) {
            personasJ1[i] = new Persona('Sospechoso 1', genero[numeroAleatorio(genero.length)], pelo[numeroAleatorio(pelo.length)], complemento[numeroAleatorio(complemento.length)]);
            personasJ2[i] = new Persona('Sospechoso 1', genero[numeroAleatorio(genero.length)], pelo[numeroAleatorio(pelo.length)], complemento[numeroAleatorio(complemento.length)]);
        } else {
            personasJ1[i] = generarCaracteristicas(personasJ1, i);
            personasJ2[i] = generarCaracteristicas(personasJ2, i);
        }
    }
}

function comprobarSospechoso(personasJugador, sospechosoJugador) {
    var existe = false;
    for(var i = 0; i < personasJugador.length; i++) {
        if(personasJugador[i].nombre.toLowerCase() == sospechosoJugador.toLowerCase()) {
            existe = true;
            break;
        }
    }

    return existe;
}

function comprobarEmpezar() {
    if(sospechosoJ1.length != 0 && sospechosoJ2.length != 0) {
        gestorJuego();
    } else {
        return false;
    }
}

var temporizador = null;
function empezarTiempo() {
    console.log('------------');
    var tiempo = 30;
    temporizador = setInterval(function() {
        tiempo--;
        console.log('Timeleft: ' + tiempo);

        if(tiempo == 0) {
            clearInterval(temporizador);
            (jugadorActual) ? jugadorActual = false : jugadorActual = true;

            gestorJuego();
        }
    }, 1000);
}

function cambiarJugador(jugadorActual) {
    // True  = Jugador 1
    // False = Jugador 2
    var inputPreguntaJ1  = document.getElementById('pregunta-j1');
        buttonPreguntaJ1 = document.getElementById('enviar-pregunta-j1');
        inputPreguntaJ2  = document.getElementById('pregunta-j2');
        buttonPreguntaJ2 = document.getElementById('enviar-pregunta-j2');

    if(jugadorActual) {
        alert('Turno del Jugador 1!');

        for(var i = 0; i < personasJ1.length; i++) {
            var elementoJ1 = document.getElementsByClassName('persona-j1')[i];
            personasJ1[i].mostrar(elementoJ1);
            document.getElementsByClassName('persona-j2')[i].innerHTML = '';

            inputPreguntaJ1.disabled  = false;
            buttonPreguntaJ1.disabled = false;
            inputPreguntaJ2.disabled  = true;
            buttonPreguntaJ2.disabled = true;
        }
    } else {
        alert('Turno del Jugador 2!');

        for(var i = 0; i < personasJ2.length; i++) {
            var elementoJ2 = document.getElementsByClassName('persona-j2')[i];
            personasJ2[i].mostrar(elementoJ2);
            document.getElementsByClassName('persona-j1')[i].innerHTML = '';

            inputPreguntaJ2.disabled  = false;
            buttonPreguntaJ2.disabled = false;
            inputPreguntaJ1.disabled  = true;
            buttonPreguntaJ1.disabled = true;
        }
    }
}

function gestorJuego() {
    empezarTiempo();
    cambiarJugador(jugadorActual);
}














function comprobarGanar(jugador) {
    var contadorJ1 = 0;
        contadorJ2 = 0;
    // True = Jugador 1; False = Jugador 2;
    if(jugador) {
        for(var i = 0; i < personasJugador1.length; i++) {
            var elementoJ1 = document.getElementsByClassName('persona-j1');
            if(elementoJ1[i].value == 'true') {
                contadorJ1++;
            }
        }
    } else {
        for(var i = 0; i < personasJugador1.length; i++) {
            var elementoJ2 = document.getElementsByClassName('persona-j2');
            if(elementoJ2[i].value == 'true') {
                contadorJ2++;
            }
        }
    }

    if(contadorJ1 == 7) {
        return true;
    }

    if(contadorJ2 == 7) {
        return true;
    }
}

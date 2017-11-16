// Genera las características de los sospechosos.
caracteristicasPersonas(personasJ1, personasJ2);

// Imprime en el cuadro correspondiente las características del sospechoso.
for(var i = 0; i < personasJ1.length; i++) {
    var elementoJ1 = document.getElementsByClassName('persona-j1')[i];
    personasJ1[i].mostrar(elementoJ1);

    var elementoJ2 = document.getElementsByClassName('persona-j2')[i];
    personasJ2[i].mostrar(elementoJ2);
}

// Comprueba que el nombre del sospechoso introducido existe. Luego comprueba
// si los dos jugadores han introducido a su suspechoso para empezar el juego.
document.getElementById('seleccionar-sospechoso-j1').onclick = function() {
    sospechosoJ1 = document.getElementById('sospechoso-j1');

    if(comprobarSospechoso(personasJ1, sospechosoJ1.value)) {
        sospechosoJ1.disabled = true;
        this.disabled = true;

        comprobarEmpezar();
    } else {
        alert('El nombre introducido no existe');
    }
}

document.getElementById('seleccionar-sospechoso-j2').onclick = function() {
    sospechosoJ2 = document.getElementById('sospechoso-j2');

    if(comprobarSospechoso(personasJ2, sospechosoJ2.value)) {
        sospechosoJ2.disabled = true;
        this.disabled = true;

        comprobarEmpezar();
    } else {
        alert('El nombre introducido no existe');
    }
}

// Envia la pregunta y comprueba los sospechosos.
document.getElementById('enviar-pregunta-j1').onclick = function() {
    var pregunta = document.getElementById('pregunta-j1');
    var preguntaValue = pregunta.value;
    pregunta.value = '';

    preguntaValue = preguntaValue.split(' ');
    if(preguntaValue.length == 2) {
        preguntaValue = preguntaValue[1].toLowerCase();

        var sospechoso = obtenerSospechoso(sospechosoJ2.value, personasJ1);

        if(sospechoso.genero.toLowerCase() == preguntaValue || sospechoso.pelo.toLowerCase() == preguntaValue || sospechoso.complemento.toLowerCase() == preguntaValue) {
            for(var k = 0; k < personasJ1.length; k++) {
                if(personasJ1[k].genero.toLowerCase() != preguntaValue && personasJ1[k].pelo.toLowerCase() != preguntaValue && personasJ1[k].complemento.toLowerCase() != preguntaValue) {
                    var elementoJ1 = document.getElementsByClassName('persona-j1');
                    elementoJ1[k].style.backgroundColor = '#CCC';
                    elementoJ1[k].value = 'true';
                }
            }
        } else {
            for(var k = 0; k < personasJ1.length; k++) {
                if(personasJ1[k].genero.toLowerCase() == preguntaValue || personasJ1[k].pelo.toLowerCase() == preguntaValue || personasJ1[k].complemento.toLowerCase() == preguntaValue) {
                    var elementoJ1 = document.getElementsByClassName('persona-j1');
                    elementoJ1[k].style.backgroundColor = '#CCC';
                    elementoJ1[k].value = 'true';
                }
            }
        }

        clearInterval(temporizador);
        if(comprobarGanar(jugadorActual)) {
            alert('Ha ganado el Jugador 1!');
        } else {
            (jugadorActual) ? jugadorActual = false : jugadorActual = true;
            gestorJuego();
        }
    }
}

document.getElementById('enviar-pregunta-j2').onclick = function() {
    var pregunta = document.getElementById('pregunta-j2');
    var preguntaValue = pregunta.value;
    pregunta.value = '';

    preguntaValue = preguntaValue.split(' ');
    if(preguntaValue.length == 2) {
        preguntaValue = preguntaValue[1].toLowerCase();

        var sospechoso = obtenerSospechoso(sospechosoJ1.value, personasJ2);

        if(sospechoso.genero.toLowerCase() == preguntaValue || sospechoso.pelo.toLowerCase() == preguntaValue || sospechoso.complemento.toLowerCase() == preguntaValue) {
            for(var k = 0; k < personasJ2.length; k++) {
                if(personasJ2[k].genero.toLowerCase() != preguntaValue && personasJ2[k].pelo.toLowerCase() != preguntaValue && personasJ2[k].complemento.toLowerCase() != preguntaValue) {
                    var elementoJ2 = document.getElementsByClassName('persona-j2');
                    elementoJ2[k].style.backgroundColor = '#CCC';
                    elementoJ2[k].value = 'true';
                }
            }
        } else {
            for(var k = 0; k < personasJ2.length; k++) {
                if(personasJ2[k].genero.toLowerCase() == preguntaValue || personasJ2[k].pelo.toLowerCase() == preguntaValue || personasJ2[k].complemento.toLowerCase() == preguntaValue) {
                    var elementoJ2 = document.getElementsByClassName('persona-j2');
                    elementoJ2[k].style.backgroundColor = '#CCC';
                    elementoJ2[k].value = 'true';
                }
            }
        }

        clearInterval(temporizador);
        if(comprobarGanar(jugadorActual)) {
            alert('Ha ganado el Jugador 1!');
        } else {
            (jugadorActual) ? jugadorActual = false : jugadorActual = true;
            gestorJuego();
        }
    }
}

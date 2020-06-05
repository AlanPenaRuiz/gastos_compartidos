document.getElementById('resetBTN').addEventListener('click', reset);
////////////////////Variables
const formulario = document.getElementById('agregar-gasto');
let presupuestoA = 0;
let presupuestoB = 0;
let presupuestoC = 0;
/////////////CLASES
class Presupuesto {
    constructor(userS, gasto, ) {
        this.userS = Number(userS);
        this.gasto = Number(gasto);
    }

    calculo() {
        if (this.userS === 1) {
            presupuestoA = presupuestoA + this.gasto;
            presupuestoC = presupuestoC - (this.gasto / 2);
            presupuestoB = presupuestoB - (this.gasto / 2);
        } else if (this.userS === 2) {
            presupuestoB = presupuestoB + this.gasto;
            presupuestoA = presupuestoA - (this.gasto / 2);
            presupuestoC = presupuestoC - (this.gasto / 2);
        } else {
            presupuestoC = presupuestoC + this.gasto;
            presupuestoA = presupuestoA - (this.gasto / 2);
            presupuestoB = presupuestoB - (this.gasto / 2);
        }
        // Instanciar la clase de Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(this.gasto);
        ui.restanteUsuario();
    }
}
// Clase de Interfaz maneja todo lo relacionado a el HTML
class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        // Insertar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        //restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        // Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitar el alert despues de 3 segundos
        setTimeout(function() {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
    restanteUsuario() {
            const restante = document.querySelector('span#restante');
            const restante2 = document.querySelector('span#restante2');
            const restante3 = document.querySelector('span#restante3');
            //Imprimir presupuesto usuarios
            restante.innerHTML = `${presupuestoA}`;
            restante2.innerHTML = `${presupuestoB}`;
            restante3.innerHTML = `${presupuestoC}`;

            this.colores();
        }
        //colores
    colores() {
        // Comprobar negativo 
        if (presupuestoA < 0) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-danger');
        } else {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-danger');
            restante.classList.add('alert-success');
        }
        if (presupuestoB < 0) {
            const restante = document.querySelector('.restante2');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-danger');
        } else {
            const restante = document.querySelector('.restante2');
            restante.classList.remove('alert-danger');
            restante.classList.add('alert-success');
        }
        if (presupuestoC < 0) {
            const restante = document.querySelector('.restante3');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-danger');
        } else {
            const restante = document.querySelector('.restante3');
            restante.classList.remove('alert-danger');
            restante.classList.add('alert-success');
        }
    }
}
// Event Listeners
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    //Leer user del select (1,2,3)
    const user = document.getElementById('user');
    const userS = user.options[user.selectedIndex].value;
    // Leer del formulario de Gastos
    const gasto = document.querySelector('#cantidad').value;
    if (userS === '' || gasto === '') {
        const ui = new Interfaz();
        ui.imprimirMensaje('Hubo un error', 'error');
        //window.location.reload();
    } else {
        // Instanciar un presupuesto
        gasto2 = new Presupuesto(userS, gasto);
        console.log(gasto2);
        // Instanciar la clase de Interfaz
        // const ui = new Interfaz();
        gasto2.calculo();
    }
});

function reset() {

    location.reload();
}
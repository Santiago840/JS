function agregarTarea() {
    const nombre = document.getElementById('nombre').value;
    const lista = document.getElementById('listaTarea');

    if (validacionNombre(nombre)) {
        crearCard(nombre, lista);
    }
}

function eliminarTarea(card) {
    card.remove();
}

function validacionNombre(nombre) {
    if (nombre == '') {
        return alert('El campo se encuentra vacío');
    } else {
        return true;
    }
}

function crearCard(nombre, lista) {
    const texto = document.createElement('p');
    texto.textContent = nombre;

    const card = document.createElement('div');
    card.id = 'card' + lista.childElementCount;
    console.log(lista.childElementCount);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = function () {
        eliminarTarea(card);
    }
    
    card.appendChild(texto);
    card.appendChild(botonEliminar);

    lista.appendChild(card);
}
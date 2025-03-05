document.addEventListener("DOMContentLoaded", () => {
    const btnAgregar = document.getElementById("btnAgregar");
    const txtAgregar = document.getElementById("txtAgregar");
    const contP = document.getElementById("contenedorTareasPendientes");
    let valorOriginal;
    propiedadesTexto();
    agregarListeners(btnAgregar, txtAgregar, contP);
});

function propiedadesTexto() {
    let campos = document.querySelectorAll(".camposTexto");

    for (let campo of campos) {
        campo.maxLength = 35;
    }
}

function agregarListeners(btnAgregar, txtAgregar, contP) {
    btnAgregar.addEventListener("click", () => {
        if (verificarCampoVacio(txtAgregar)) {
            agregarTarea(txtAgregar, contP);
        }
    });

    txtAgregar.addEventListener("keydown", (event) => {
        if (presionarEnter(event)) {
            if (verificarCampoVacio(txtAgregar)) {
                agregarTarea(txtAgregar, contP);
            }
        }
    });
}

function agregarTarea(tarea, contP) {
    let contTarea = document.createElement("div");
    let chbChecar = document.createElement("input");
    let txtTarea = document.createElement("input");
    let btnEditar = document.createElement("button");
    let btnEliminar = document.createElement("button");
    let numero = obtenerNumeroTareas(contP);
    valorOriginal = tarea.value;

    contTarea.classList.add("tarea");
    contTarea.id = "contTarea" + numero;

    chbChecar.type = "checkbox";
    chbChecar.name = "chbChecar";
    chbChecar.id = "chbChecar" + numero;

    txtTarea.classList.add("textoTarea", "camposTexto");
    txtTarea.type = "text";
    txtTarea.readOnly = true;
    txtTarea.value = tarea.value.trim();
    txtTarea.id = "txtTarea" + numero;
    txtTarea.maxLength = 35;
    txtTarea.addEventListener("click", () => {
        txtTarea.readOnly = false;
    });
    txtTarea.addEventListener("change", () => {
        valorOriginal = txtTarea.value.trim();
        txtTarea.readOnly = true;
    });
    txtTarea.addEventListener("keydown", (event) => {
        editarTarea(event, txtTarea, valorOriginal);
    });
    txtTarea.addEventListener("blur", () => {
        txtTarea.readOnly = true;
    });

    btnEditar.classList.add("botones", "btnEditar", "fa-solid", "fa-edit");
    btnEditar.type = "button";
    btnEditar.id = "btnEditar" + numero;
    btnEditar.addEventListener("click", () => {
        editarTareaBoton(txtTarea);
    });

    btnEliminar.classList.add("botones", "btnEliminar", "fa-solid", "fa-trash");
    btnEliminar.type = "button";
    btnEliminar.id = "btnEliminar" + numero;
    btnEliminar.addEventListener("click", () => {
        eliminarTarea(contTarea);
    });

    contTarea.appendChild(chbChecar);
    contTarea.appendChild(txtTarea);
    contTarea.appendChild(btnEditar);
    contTarea.appendChild(btnEliminar);

    contP.appendChild(contTarea);

    limpiarCampo(tarea);
}

function editarTarea(event, tarea, valorOriginal) {
    if (presionarEnter(event)) {
        if (!verificarCampoVacio(tarea)) {
            tarea.value = valorOriginal.trim();
        }else{
            console.log(tarea.value.trim());
            tarea.value = tarea.value.trim();
        }
    }
}

function editarTareaBoton(tarea) {
    let valor = tarea.value;
    tarea.value = valor;
}

function eliminarTarea(contTarea) {
    alertaEliminarTarea(contTarea);
}

function obtenerNumeroTareas(contP) {
    let longitud = contP.children.length;
    return longitud;
}

function verificarCampoVacio(campo) {
    if (campo.value.trim() === "") {
        return false;
    } else {
        return true;
    }
}

function limpiarCampo(campo) {
    campo.value = "";
}

function limpiarLista() {
    const listaTarea = document.getElementById("contenedorTareasPendientes");

    if (listaTarea.hasChildNodes()) {
        alertaEliminar(listaTarea, "¿Estás seguro de eliminar todos las tareas de la lista?");
    }else{
        alert('No hay tareas a eliminar');
    }
}

function alertaEliminar(lista, mensaje) {
    let alerta = window.confirm(mensaje);
    if (alerta) {
        while (lista.hasChildNodes()) {
            lista.removeChild(lista.lastChild);
        }
    }else{
        console.log("No se eliminaron las tareas");
    }
}

function alertaEliminarTarea(tarea){
    let alerta = window.confirm("¿Estás seguro de eliminar esta tarea?");
    if(alerta){
        tarea.remove();
    }
}

function presionarEnter(tecla) {
    if (tecla.key === "Enter") {
        return true;
    } else {
        return false;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const btnAgregar = document.getElementById("btnAgregar");
    const txtAgregar = document.getElementById("txtAgregar");
    const contP = document.getElementById("contenedorTareasPendientes");
    agregarListeners(btnAgregar, txtAgregar, contP);
});

function agregarListeners(btnAgregar, txtAgregar, contP) {
    btnAgregar.addEventListener("click", () => {
        agregarTarea(txtAgregar.value, contP);
    });
}

function agregarTarea(tarea, contP) {
    let contTarea = document.createElement("div");
    let chbChecar = document.createElement("input");
    let txtTarea = document.createElement("input");
    let btnEditar = document.createElement("button");
    let btnEliminar = document.createElement("button");
    let numero = obtenerNumeroTareas(contP);

    contTarea.classList.add("tarea");
    contTarea.id = "contTarea" + numero;

    chbChecar.type = "checkbox";
    chbChecar.name = "chbChecar";
    chbChecar.id = "chbChecar" + numero;

    txtTarea.classList.add("textoTarea");
    txtTarea.type = "text";
    txtTarea.readOnly = true;
    txtTarea.value = tarea;
    txtTarea.id = "txtTarea" + numero;
    txtTarea.addEventListener("click", () => {
        txtTarea.readOnly = false;
    });
    txtTarea.addEventListener("change", () => {
        txtTarea.readOnly = true;
    });
    txtTarea.addEventListener("keydown", (event) => {
        editarTarea(event, txtTarea);
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
        eliminarTarea(contP, contTarea);
    });

    contTarea.appendChild(chbChecar);
    contTarea.appendChild(txtTarea);
    contTarea.appendChild(btnEditar);
    contTarea.appendChild(btnEliminar);

    contP.appendChild(contTarea);
}

function editarTarea(event, tarea) {
    if (presionarEnter(event.key)) {
        let valor = tarea.value;
        tarea.value = valor;
    }
}

function editarTareaBoton(tarea) {
    let valor = tarea.value;
    tarea.value = valor;

}

function eliminarTarea(contP, contTarea) {
    contP.removeChild(contTarea);
}

function obtenerNumeroTareas(contP) {
    let longitud = contP.children.length;
    return longitud;
}

function recibirTarea() {
}

function agregarTexto() {

}

function presionarEnter(tecla) {
    if (tecla.key === "Enter") {
        return true;
    } else {
        return false;
    }
}
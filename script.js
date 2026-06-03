const input = document.getElementById("input");
const historial = document.getElementById("historialContenido");

const digitButtons = document.querySelectorAll(".digit-button");
const operationButtons = document.querySelectorAll(".operation-button");

let expresion = "";

cargarHistorial();

digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        expresion += button.textContent;
        input.value = expresion;
    });
});

operationButtons.forEach(button => {

    if (button.id === "clear" || button.id === "erase") {
        return;
    }

    button.addEventListener("click", () => {
        expresion += button.textContent;
        input.value = expresion;
    });

});

document.getElementById("clear").addEventListener("click", () => {
    expresion = "";
    input.value = "";
});

document.getElementById("erase").addEventListener("click", () => {
    expresion = expresion.slice(0, -1);
    input.value = expresion;
});

document.getElementById("equal").addEventListener("click", () => {

    try {

        const resultado = eval(expresion);

        const operacion = `${expresion} = ${resultado}`;

        guardarOperacion(operacion);
        agregarAlHistorial(operacion);

        expresion = resultado.toString();
        input.value = resultado;

    } catch {

        input.value = "Error";
        expresion = "";

    }

});

// ---------- FUNCIONES ----------

function agregarAlHistorial(texto) {

    const item = document.createElement("div");
    item.classList.add("historial-item");
    item.textContent = texto;

    historial.prepend(item);

}

function guardarOperacion(operacion) {

    let operaciones =
        JSON.parse(localStorage.getItem("historial")) || [];

    operaciones.unshift(operacion);

    localStorage.setItem(
        "historial",
        JSON.stringify(operaciones)
    );

}

function cargarHistorial() {

    let operaciones =
        JSON.parse(localStorage.getItem("historial")) || [];

    operaciones.forEach(operacion => {

        const item = document.createElement("div");

        item.classList.add("historial-item");
        item.textContent = operacion;

        historial.appendChild(item);

    });

}
// Este archivo "explorer-init.js" trabaja iniciando la funcionalidad de nuestro proyecto en general mediante
// la creación de instancias de las clases que hemos creado previamente
const template = document.getElementById("template");
const banderas = document.getElementById("banderas");
const formulario = document.getElementById("formulario");
const inputFormulario = document.getElementById("inputFormulario");
// Instancias de las clases que hemos definido en nuestros archivos js
const darkMode = new DarkMode();
darkMode.setEventListener();
const paisList = new PaisList([], 10);
const buscador = new BuscadorNombres("formulario", "inputFormulario", paisList);
const dataFetcher = new DataFetcher();
// Inicializamos los selectores personalizados, pasando la instancia de paisList
const customSelectElements = document.getElementsByClassName("custom-select");
for (const selectElement of customSelectElements) {
    new CustomSelect(selectElement.getElementsByTagName("select")[0], paisList);
}
dataFetcher.fetchData(API_URL)
.then(data => {
        paisList.setPaises(data);
        paisList.enlazarElementosHTML('banderas', 'atras', 'siguiente', 'informacion-pagina', 'infoModal');
        paisList.mostrarPaginaActual();
    });
// Se tiene conocimiento que este sector de código pudiera ser el mas vulnerable respecto a Programación Orientada a Objetos pura,
// por ello es que se deja abierta la posibilidad de su modificación y así cumplir en lo absoluto la POO
// Este archivo de nombre "find-names.js" aloja la clase "BuscadorNombres" encargada en cierta parte
//  de complementar la funcionalidad de filtrado por nombre
class BuscadorNombres {
    constructor(formularioId, inputFormularioId, paisList) {
        this.formulario = document.getElementById(formularioId);
        this.input = document.getElementById(inputFormularioId);
        this.paisList = paisList;
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.input.addEventListener("keyup", this.handleSearch.bind(this));
        this.formulario.addEventListener("submit", this.handleSubmit.bind(this));
    }
    handleSearch(event) {
        event.preventDefault();
        const textoBusqueda = this.input.value;
        this.paisList.filtrarPorNombre(textoBusqueda); // El filtrado y la actualización de la vista se hacen en PaisList
    }
    handleSubmit(event) {
        // Utilizamos esta línea de código para que nuestro input no modifique en lo absoluto la dirección de nuestro proyecto
        // lo conseguimos anulando el evento por defecto del submit, utilizando "preventDefault()"
        event.preventDefault();
    }
    resetearValue() {
        this.input.value = null;
    }
}
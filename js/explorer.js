// El archivo explorer.js se encarga de alojar la clase "Pais" y "PaisList"

// La clase "Pais" mediante su constructor se encarga de crear un objeto y sus propiedades, en este caso
// dichas propiedades es la información que vamos a estar manipulando en nuestro código para brindarle al
// usuario la respectiva información de cada país que desee
class Pais {
    constructor(nombre, capital, region, codigoTelefonico, poblacion, bandera, nombreEsp, subregion, nombreOficial, nombreOficialNativo,
        abreviacion, limites, mapas, zonaHoraria, cca3) {
        this.name = nombre;
        this.capital = capital;
        this.region = region;
        this.codigoTelefonico = codigoTelefonico;
        this.poblacion = poblacion;
        this.bandera = bandera;
        this.nombreEsp = nombreEsp;
        this.subregion = subregion;
        this.nombreOficial = nombreOficial;
        this.nombreOficialNativo = nombreOficialNativo;
        this.abreviacion = abreviacion;
        this.limites = limites;
        this.mapas = mapas;
        this.zonaHoraria = zonaHoraria;
        this.cca3 = cca3;
    }
    // Este método dentro de la clase "Pais" actúa creando el elemento que verá el usuario en su pantalla
    crearElemento() {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".card");
        card.dataset.cca3 = this.cca3;
        
        clone.querySelector(".nombre").textContent = this.name;
        clone.querySelector(".capital").textContent = this.capital;
        clone.querySelector(".region").textContent = this.region;
        clone.querySelector(".telefono").textContent = this.codigoTelefonico;
        clone.querySelector(".poblacion").textContent = this.poblacion.toLocaleString();
        clone.querySelector(".img-fluid").src = this.bandera;
        clone.querySelector(".nombreEsp").textContent = this.nombreEsp;
        return clone;
    }
}
// La clase "PaisList" recibe como parámetros los países iniciales y posterior la cantidad de elementos que se mostrarán por página
class PaisList {
    constructor(paisesIniciales = [], elementosPorPagina = 5) {
        this._todosLosPaises = paisesIniciales;
        this._paisesFiltradosPorNombre = [...paisesIniciales];
        this._paisesFiltradosPorRegion = null;
        this._filtroRegionActivo = false;
        // Dentro del constructor de nuestra clase creamos la propiedad "_paginador" que tiene por valor la instancia de la clase "Paginator"
        this._paginador = new Paginator(elementosPorPagina);
        this._botonAtras = null;
        this._botonSiguiente = null;
        this._infoPagina = null;
        this._contenedorBanderas = null;
    }
    // En este punto de nuestra clase tenemos el método dedicado a enlazar los elementos HTML para utilizarlos en el plano javascript
    enlazarElementosHTML(contenedorBanderasId, botonAtrasId, botonSiguienteId, infoPaginaId, modalId) {
        this._contenedorBanderas = document.getElementById(contenedorBanderasId);
        this._botonAtras = document.getElementById(botonAtrasId);
        this._botonSiguiente = document.getElementById(botonSiguienteId);
        this._infoPagina = document.getElementById(infoPaginaId);
        this._modalDetalles = new ModalDetalles(modalId, this);
        
        this._botonAtras?.addEventListener('click', () => this.navegarPagina('anterior'));
        this._botonSiguiente?.addEventListener('click', () => this.navegarPagina('siguiente'));
        this._contenedorBanderas?.addEventListener('click', this._modalDetalles.handleMostrarModal.bind(this._modalDetalles));
        
        this.actualizarInterfazPaginacion();
    }
    // Este método es el que hace posible el filtrado de países por nombre, cabe destacar la utilización de (||) para brindarle al usuario
    // la capacidad de buscar países por su nombre en Inglés y Español 
    filtrarPorNombre(texto) {
        const textoLower = texto.toLowerCase();
        let listaParaFiltrar;
        // La lista de países donde se aplicará el filtrado por nombre será la que contenga la variable
        // listaParaFiltrar, el valor de dicha variable será definido por el condicional en la línea inferior a esta
        if (this._filtroRegionActivo && this._paisesFiltradosPorRegion) {
            listaParaFiltrar = this._paisesFiltradosPorRegion;
        } else {
            listaParaFiltrar = this._todosLosPaises;
        }
        this._paisesFiltradosPorNombre = listaParaFiltrar.filter(pais =>
            pais.nombreEsp.toLowerCase().includes(textoLower) || pais.name.toLowerCase().includes(textoLower)
        );
        this._filtroRegionActivo ? this.aplicarFiltroCombinado() : this._paginador.setTotalItems(this._paisesFiltradosPorNombre.length);
        this._paginador._paginaActual = 1;
        this.mostrarPaginaActual();
    }

    filtrarPorRegion(region) {
        buscador.resetearValue(); // Resetea el valor del input de búsqueda
        if (region === "Todos") {
            this._paisesFiltradosPorRegion = null;
            this._filtroRegionActivo = false;
            this._paisesFiltradosPorNombre = [...this._todosLosPaises]; // Restablecer la lista filtrada por nombre a todos los países
        } else {
            this._paisesFiltradosPorRegion = this._todosLosPaises.filter(pais => pais.region === region);
            this._filtroRegionActivo = true;
            // Al cambiar la región, la lista filtrada por nombre DEBE ser la misma que la filtrada por región inicialmente
            this._paisesFiltradosPorNombre = [...this._paisesFiltradosPorRegion];
        }
        this.aplicarFiltroCombinado();
        this._paginador._paginaActual = 1;
        this.mostrarPaginaActual();
    }
    aplicarFiltroCombinado() {
        let listaFiltrada;
        if (this._filtroRegionActivo && this._paisesFiltradosPorRegion) {
            listaFiltrada = this._paisesFiltradosPorNombre.filter(paisNombre =>
                this._paisesFiltradosPorRegion.some(paisRegion => paisRegion.cca3 === paisNombre.cca3)
            );
        } else {
            listaFiltrada = this._paisesFiltradosPorNombre;
        }
        this._paginador.setTotalItems(listaFiltrada.length);
    }
    // Utilizamos la serie de métodos que comienzan su nombre con "get" para referirnos a ellos como métodos
    // que tienen como propósito devolvernos datos que normalmente no podemos acceder a ellos debido al principio de encapsulamiento en OOP
    getPaises() {
        return [...this._todosLosPaises];
    }
    // Así como vimos anteriormente que los métodos que empiezan por "get" se encargan de devolvernos un valor al que no podríamos acceder normalmente
    // los métodos que comienzan por la palabra "set" nos permiten modificar propiedades que normalmente no podríamos, solamente utilizando esta serie de métodos
    setPaises(nuevosPaises) {
        this._todosLosPaises = nuevosPaises;
        this._paisesFiltradosPorNombre = [...nuevosPaises];
        this._paisesFiltradosPorRegion = null;
        this._filtroRegionActivo = false;
        this._paginador.setTotalItems(this._todosLosPaises.length);
        this.mostrarPaginaActual();
    }
    // En este método reemplazamos los elementos por página por los nuevos elementos otorgados en el parámetro del método
    setElementosPorPagina(nuevaCantidad) {
        if (typeof nuevaCantidad === 'number' && nuevaCantidad > 0) {
            this._paginador._itemsPorPagina = nuevaCantidad;
            this.aplicarFiltroCombinado(); // Recalcular total de páginas
            this.mostrarPaginaActual();
        } else {
            console.error("La cantidad de elementos por página debe ser un número positivo.");
        }
    }
    getElementosPorPagina() {
        return this._paginador.getItemsPorPagina();
    }
    mostrarPaginaActual(paisesAMostrar) {
        if (!this._contenedorBanderas) return;
        this._contenedorBanderas.innerHTML = '';
        let listaAMostrar;

        if (this._filtroRegionActivo && this._paisesFiltradosPorRegion) {
            // Si el filtro de región está activo, usamos la lista combinada
            listaAMostrar = this._paisesFiltradosPorNombre.filter(paisNombre =>
                this._paisesFiltradosPorRegion.some(paisRegion => paisRegion.cca3 === paisNombre.cca3)
            );
        } else {
            // Si no, usamos la lista filtrada por nombre (que podría ser la lista completa)
            listaAMostrar = this._paisesFiltradosPorNombre;
        }

        const paisesPagina = this._paginador.getItemsEnPagina(listaAMostrar);
        const fragment = document.createDocumentFragment();
        paisesPagina.forEach(pais => {
            fragment.appendChild(pais.crearElemento());
        });
        this._contenedorBanderas.appendChild(fragment);
        this.actualizarInterfazPaginacion();
    }
    navegarPagina(direccion) {
        const listaActual = this._filtroRegionActivo && this._paisesFiltradosPorRegion ? this._paisesFiltradosPorRegion : this._paisesFiltradosPorNombre;
        if (direccion === 'anterior') {
            if (this._paginador.paginaAnterior()) {
                this.mostrarPaginaActual(listaActual);
            }
        } else if (direccion === 'siguiente') {
            if (this._paginador.paginaSiguiente()) {
                this.mostrarPaginaActual(listaActual);
            }
        }
    }
    actualizarInterfazPaginacion() {
        const totalPaginas = this._paginador.getTotalPaginas();
        if (this._infoPagina && totalPaginas > 0) {
            this._infoPagina.textContent = `${this._paginador.getPaginaActual()} / ${totalPaginas}`;
        } else if (this._infoPagina) {
            this._infoPagina.textContent = `No hay países para mostrar`;
        }
        if (this._botonAtras) {
            this._botonAtras.disabled = this._paginador.getPaginaActual() === 1 || totalPaginas === 0;
        }
        if (this._botonSiguiente) {
            this._botonSiguiente.disabled = this._paginador.getPaginaActual() === totalPaginas || totalPaginas === 0;
        }
    }
    obtenerPaisPorCCA3(cca3) {
        return this._todosLosPaises.find(pais => pais.cca3 === cca3);
    }
}

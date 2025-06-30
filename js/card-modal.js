// Este archivo card-modal.js se encarga de alojar toda la clase "ModalDetalles" que controla la funcionalidad para proporcionar al usuario
// información más allá de lo que puede apreciar en la carta principal
class ModalDetalles {
    constructor(modalId, paisListInstance) {
        this.modal = document.getElementById(modalId);
        this.closeButton = this.modal.querySelector(".close-button");
        this.modalNombre = document.getElementById("modal-nombre");
        this.modalNombreEsp = document.getElementById("modal-nombreEsp");
        this.modalBandera = document.getElementById("modal-bandera");
        this.modalNombreOficial = document.getElementById("modal-nombreOficial");
        this.modalNombreOficialNativo = document.getElementById("modal-nombreOficialNativo");
        this.modalAbreviacion = document.getElementById("modal-abreviacion");
        this.modalCapital = document.getElementById("modal-capital");
        this.modalRegion = document.getElementById("modal-region");
        this.modalSubregion = document.getElementById("modal-subregion");
        this.modalTelefono = document.getElementById("modal-telefono");
        this.modalPoblacion = document.getElementById("modal-poblacion");
        this.modalZonaHoraria = document.getElementById("modal-zonaHoraria");
        this.modalLimites = document.getElementById("modal-limites");
        this.modalMapa = document.getElementById("modal-mapa");
        this.paisList = paisListInstance; // Recibimos la instancia de PaisList
        this.setupEventListeners();
    }
    // Este método trabaja aplicandole escuchadores de eventos a los elementos ya captados en el constructor de la presente clase
    setupEventListeners() {
        this.closeButton.addEventListener('click', this.cerrarModal.bind(this));
        window.addEventListener('click', this.cerrarModalSiFuera.bind(this));
    }
    // Este método maneja la funcionalidad para mostrar el modal que contiene toda la información captada
    handleMostrarModal(event) {
        const infoButton = event.target.closest('.info-button');
        if (infoButton) {
            const card = infoButton.closest('.card');
            const cca3 = card.dataset.cca3;
            const pais = this.paisList.obtenerPaisPorCCA3(cca3);
            if (pais) {
                this.mostrarDetalles(pais);
            }
        }
    }
    // Este método es el responsable de asignarle a cada modal los detalles del país en específico
    mostrarDetalles(pais) {
        this.modalNombre.textContent = pais.name;
        this.modalNombreEsp.textContent = `(${pais.nombreEsp})`;
        this.modalBandera.src = pais.bandera;
        this.modalNombreOficial.textContent = pais.nombreOficial;
        this.modalNombreOficialNativo.textContent = pais.nombreOficialNativo || 'No disponible';
        this.modalAbreviacion.textContent = pais.abreviacion;
        this.modalCapital.textContent = pais.capital;
        this.modalRegion.textContent = pais.region;
        this.modalSubregion.textContent = pais.subregion || 'No disponible';
        this.modalTelefono.textContent = pais.codigoTelefonico;
        this.modalPoblacion.textContent = pais.poblacion.toLocaleString();
        this.modalZonaHoraria.textContent = pais.zonaHoraria.join(', ');
        this.modalLimites.textContent = pais.limites ? pais.limites.join(', ') : 'No posee';
        this.modalMapa.href = pais.mapas;
        this.modal.style.display = "block";
    }
    // Este método agrupa las instrucciones para ocultar el modal
    cerrarModal() {
        this.modal.style.display = "none";
    }
    cerrarModalSiFuera(event) {
        if (event.target === this.modal) {
            this.cerrarModal();
        }
    }
}
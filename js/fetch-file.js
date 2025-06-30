// El presente archivo "fetch-file" aloja la clase "DataFetcher" encargada de la principal interacción con los diversos
// endpoints de nuestra API de países y la preparación de dichos datos para su uso en el resto de funcionalidades
// del proyecto
class DataFetcher {
    async fetchData(url) {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Error en la petición: ${res.status}`);
            }
            const data = await res.json();
            return data.map(item => new Pais(item.name.common, item.capital, item.region,
                item.idd?.root + (item.idd?.suffixes?.[0] || ''), item.population,
                item.flags.png, item.translations?.spa?.common, item.subregion, item.name.official, item.translations?.spa?.official,
                item.cca3, item.borders, item.maps?.googleMaps, item.timezones, item.cca3));
        } catch (error) {
            // En este punto, si llega a fallar la recolección de datos posterior al error que se puede apreciar inferior
            // a estas líneas se pueden apreciar la serie de instrucciones que alternan el modo offline del proyecto
            // comunicandole apropiadamente al usuario la situación encontrada y otorgandole la confirmación de las medidas
            // que se pueden tomar para resolver el conflicto
            console.error("Error al obtener los datos, confirme para acceder a una versión local de la API", error);
            this.modalOffline("modalOffline");
            this.offlineMode("api.json");

            // Medidas tomadas respecto a problemas con la API
            // Este modal le brinda al usuario la capacidad de cambiar de modo online a offline
            // this.abrirConfirmacionModal();
            
            return [];
            }
        }
    // Este método capta el elemento modal presente en el documento HTML, para contar con su interacción de ser necesaria
    modalOffline(modalId) {
        this.offlineModal = document.getElementById(modalId);
        this.confirmButton = this.offlineModal.querySelector(".exit-button");
    }
    // Método encargado de desplegar/abrir el modal de confirmación del modo offline
    abrirConfirmacionModal() {
        this.offlineModal.style.display = "block";
        this.setEventListener();
    }
    // Método que trabaja llevando la linea de instrucciones encargadas de cerrar el modal de confirmacion del modo offline
    cerrarConfirmacionModal() {
        this.offlineModal.style.display = "none";
    }
    // Este método agrega el escuchador de eventos al botón dentro del modal
    setEventListener() {
        this.confirmButton.addEventListener('click', (e) => {
            this.cerrarConfirmacionModal();
            this.offlineMode("api.json");
        })
    }
    offlineMode(url) {
        dataFetcher.fetchData(url)
            .then(data => {
                paisList.setPaises(data);
                paisList.mostrarPaginaActual();
                });
    }
}
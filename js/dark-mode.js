// Este archivo dark-mode.js aloja la funcionalidad encargada de gestionar el cambio entre modo claro y oscuro del proyecto
// tenemos la clase DarkMode que al crear una instancia se seleccionará el botón para su pronta interacción
class DarkMode {
    constructor() {
        this.btnDark = document.querySelector(".btn-dark-mode");
    }
    // Este método "setEventListener" se encarga de agregar el escuchador de eventos a dicho botón mencionado previamente
    // asignandole a este la capacidad de ejecutar el bloque de instrucciones que se puede apreciar en las líneas inferiores
    // cada vez que se escucha un evento click sobre este
    setEventListener() {
        this.btnDark.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }
}
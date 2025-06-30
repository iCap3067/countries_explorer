class CustomSelect {
    constructor(selectElement, paisListInstance) { // Recibimos la instancia de PaisList
        this.originalSelect = selectElement;
        this.container = selectElement.parentNode;
        this.selectedElement = null;
        this.itemsContainer = null;
        this.options = [];
        this.paisList = paisListInstance; // Guardamos la instancia de PaisList
        this.init();
    }
    init() {
        this.createCustomElements();
        this.attachEventListeners();
        this.originalSelect.style.display = "none"; // Ocultar el select original
    }
    createCustomElements() {
        const selected = document.createElement("DIV");
        selected.setAttribute("class", "select-selected");
        selected.innerHTML = this.originalSelect.options[this.originalSelect.selectedIndex].innerHTML;
        this.selectedElement = selected;
        this.container.appendChild(this.selectedElement);

        const items = document.createElement("DIV");
        items.setAttribute("class", "select-items select-hide");
        this.itemsContainer = items;
        for (let i = 1; i < this.originalSelect.options.length; i++) {
            const option = document.createElement("DIV");
            option.innerHTML = this.originalSelect.options[i].innerHTML;
            option.addEventListener("click", this.handleOptionClick.bind(this, i));
            this.itemsContainer.appendChild(option);
        }
        this.container.appendChild(this.itemsContainer);
    }
    attachEventListeners() {
        this.selectedElement.addEventListener("click", this.toggleDropdown.bind(this));
        document.addEventListener("click", this.closeAllSelect.bind(this));
        this.originalSelect.addEventListener("change", this.handleNativeSelectChange.bind(this));
    }
    handleOptionClick(index) {
        this.originalSelect.selectedIndex = index;
        this.selectedElement.innerHTML = this.originalSelect.options[index].innerHTML;
        const sameAsSelected = this.itemsContainer.getElementsByClassName("same-as-selected");
        while (sameAsSelected.length) {
            sameAsSelected[0].classList.remove("same-as-selected");
        }
        this.itemsContainer.children[index - 1]?.classList.add("same-as-selected");
        this.itemsContainer.classList.add("select-hide");
        this.selectedElement.classList.remove("select-arrow-active");
        // Disparar el evento change manualmente
        const changeEvent = new Event('change');
        this.originalSelect.dispatchEvent(changeEvent);
        // Obtener el valor seleccionado y filtrar la lista de países
        const regionSeleccionada = this.originalSelect.value;
        this.paisList.filtrarPorRegion(regionSeleccionada); // Llamamos al método de PaisList
    }
    toggleDropdown(e) {
        e.stopPropagation();
        this.closeAllSelect(this.selectedElement);
        this.itemsContainer.classList.toggle("select-hide");
        this.selectedElement.classList.toggle("select-arrow-active");
    }
    closeAllSelect(elmnt) {
        const selectItems = document.getElementsByClassName("select-items");
        const selectSelected = document.getElementsByClassName("select-selected");
        const arrNo = [];
        for (let i = 0; i < selectSelected.length; i++) {
            if (elmnt == selectSelected[i]) {
                arrNo.push(i);
            } else {
                selectSelected[i].classList.remove("select-arrow-active");
            }
        }
        for (let i = 0; i < selectItems.length; i++) {
            if (arrNo.indexOf(i) === -1) { // Solo ocultar los que no están en arrNo
                selectItems[i].classList.add("select-hide");
            }
        }
    }
    handleNativeSelectChange() {
        this.selectedElement.innerHTML = this.originalSelect.options[this.originalSelect.selectedIndex].innerHTML;
        const sameAsSelected = this.itemsContainer.getElementsByClassName("same-as-selected");
        while (sameAsSelected.length) {
            sameAsSelected[0].classList.remove("same-as-selected");
        }
        this.itemsContainer.children[this.originalSelect.selectedIndex - 1]?.classList.add("same-as-selected");
    }
}
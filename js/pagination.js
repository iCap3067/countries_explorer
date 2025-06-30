// El presente archivo "pagination.js" aloja la clase "Paginator" encargada de la funcionalidad que hace realidad la paginación
// de elementos de nuestro proyecto
class Paginator {
    // El constructor de la clase "paginator" recibe como parámetro la cantidad visible de items por página 
    constructor(itemsPorPagina = 20) {
        this._itemsPorPagina = itemsPorPagina;
        this._paginaActual = 1;
        this._totalItems = 0;
    }
    setTotalItems(total) {
        this._totalItems = total;
        this._paginaActual = 1;
    }
    getItemsPorPagina() {
        return this._itemsPorPagina;
    }
    getPaginaActual() {
        return this._paginaActual;
    }
    getTotalPaginas() {
        return Math.ceil(this._totalItems / this._itemsPorPagina);
    }
    getItemsEnPagina(items) {
        const inicio = (this._paginaActual - 1) * this._itemsPorPagina;
        const fin = inicio + this._itemsPorPagina;
        return items.slice(inicio, fin);
    }
    paginaSiguiente() {
        if (this._paginaActual < this.getTotalPaginas()) {
            this._paginaActual++;
            return true;
        }
        return false;
    }
    paginaAnterior() {
        if (this._paginaActual > 1) {
            this._paginaActual--;
            return true;
        }
        return false;
    }
}
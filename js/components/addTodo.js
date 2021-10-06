export default class AddTodo {
    constructor() {
        this.btn = document.getElementById('add');
        this.Nombre = document.getElementById('Nombre');
        this.Autor = document.getElementById('Autor');
        this.Edición = document.getElementById('Edición');
        this.Páginas = document.getElementById('Páginas');

        this.alert = document.getElementById('alert');
    }

    onClick(callback) {
        this.btn.onclick = () => {

            if(this.Nombre.value === '' || this.Autor.value === ''|| this.Edición.value === ''|| this.Páginas.value === ''){
                this.alert.classList.remove('d-none');
                this.alert.innerText = 'La información no esta completa.';
                return;
            }

            this.alert.classList.add('d-none');

            callback(this.Nombre.value, this.Autor.value, this.Edición.value, this.Páginas.value);

            this.Nombre.value = "";
            this.Autor.value = "";
            this.Edición.value = "";
            this.Páginas.value = "";
        }
    }
}
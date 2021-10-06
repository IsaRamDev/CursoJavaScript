import AddTodo from "./components/addTodo.js";
let books = [];
export default class View {
	
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();
        this.libro = {};
        this.addTodoForm.onClick( (n , a, e, p) => this.addTodo(n , a, e, p) );  
    }
    setModel(model) {
        this.model = model;
    }

    EditTodo(id){
        this.libro = this.model.findTodo(id);
        this.addTodoForm.Nombre.value = this.libro.Nombre;
        this.addTodoForm.Autor.value = this.libro.Autor;
        this.addTodoForm.Edición.value = this.libro.Edición;
        this.addTodoForm.Páginas.value = this.libro.Páginas;
    }

    addTodo(Nombre, Autor, Edición, Páginas){

        if(this.libro.id != null){
            this.model.editTodo(this.libro.id, this.addTodoForm.Nombre.value, this.addTodoForm.Autor.value, this.addTodoForm.Edición.value, this.addTodoForm.Páginas.value)
        }else{
            const todo = this.model.addTodo(Nombre, Autor, Edición, Páginas);
        }
        
        this.createTable();
        this.libro = {};
    }

    removeTodo(id){
        this.model.removeTodo(id);
        this.createTable();
    }
	createTable() {
		const todos = this.model.getTodos();
		this.table.getElementsByTagName('tbody')[0].innerHTML = "";
        todos.forEach(
			(element, index) => 
			{
				this.createRow(element);
			});
	}
    createRow(todo) {
        const row = this.table.getElementsByTagName('tbody')[0].insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.id}: ${todo.Nombre}</td>
            <td>${todo.Autor}</td>
            <td>${todo.Edición}</td>
            <td>${todo.Páginas}</td>
            <td class="text-right"></td>
            <td class="text-right"></td>`;

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id) ;
        row.children[5].appendChild(removeBtn);
		
		const Editar = document.createElement('button');
        Editar.classList.add('btn', 'btn-primary', 'mb-1');
        Editar.innerHTML = '<i class="fa fa-edit"></i>';
        Editar.onclick = () => this.EditTodo(todo.id);
        row.children[4].appendChild(Editar);

    }
}
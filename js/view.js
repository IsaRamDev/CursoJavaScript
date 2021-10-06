import AddTodo from "./components/addTodo.js";

export default class View {

    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();

        this.addTodoForm.onClick( (n , a, e, p) => this.addTodo(n , a, e, p) );  
    }

    render() {
        const todos = this.model.getTodos();
        if( todos && todos.length > 0)
            todos.forEach( n => this.createRow(n));
    }

    setModel(model) {
        this.model = model;
    }

    EditTodo(Nombre, Autor, Edición, Páginas){
        const todo = this.model.addTodo(Nombre, Autor, Edición, Páginas);
        this.RecreateRow(todo)
    }

    addTodo(Nombre, Autor, Edición, Páginas){
        const todo = this.model.addTodo(Nombre, Autor, Edición, Páginas);
        this.createRow(todo)
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    EditTodo(id){
        this.model.EditTodo(id);
        document.addEventListener(id),value();
    
    }

    createRow(todo) {
        const row = this.table.getElementsByTagName('tbody')[0].insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.Nombre}</td>
            <td>${todo.Autor}</td>
            <td>${todo.Edición}</td>
            <td>${todo.Páginas}</td>
            <td class="text-right"></td>
            <td class="text-right"></td>
        `;

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id) ;
        row.children[5].appendChild(removeBtn);

    }
    RecreateRow(todo) {
        const row = this.table.getElementsByTagName('tbody')[0].insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.Nombre}</td>
            <td>${todo.Autor}</td>
            <td>${todo.Edición}</td>
            <td>${todo.Páginas}</td>
            <td class="text-right"></td>
            <td class="text-right"></td>
        `;
        
        const Editar = document.createElement('button');
        Editar.classList.add('btn', 'btn-primary', 'mb-1');
        Editar.innerHTML = '<i class="fa fa-edit"></i>';
        Editar.onclick = () => this.EditTodo(todo.id);
        row.children[4].appendChild(Editar);
    }
}
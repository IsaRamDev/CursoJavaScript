import AddTodo from "./components/addTodo.js";

export default class View {

    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();

        this.addTodoForm.onClick( (t , d) => this.addTodo(t,d) );  
    }

    render() {
        const todos = this.model.getTodos();
        if( todos && todos.length > 0)
            todos.forEach( t => this.createRow(t) );
    }

    setModel(model) {
        this.model = model;
    }

    addTodo(Nombre, Autor, Edición, Páginas){
        const todo = this.model.addTodo(Nombre, Autor, Edición, Páginas);
        this.createRow(todo)
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    toogleCompleted(id){
        this.model.toogleCompleted(id);
    }

    createRow(todo) {
        const row = this.table.getElementsByTagName('tbody')[0].insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.Nombre}</td>
            <td>${todo.Autor}</td>
            <td>${todo.Edición}</td>
            <td>${todo.Páginas}</td>
            <td class="text-center"></td>
            <td class="text-right"></td>
        `;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toogleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id) ;
        row.children[3].appendChild(removeBtn);

    }
}
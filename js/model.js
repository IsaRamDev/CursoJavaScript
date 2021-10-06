export default class Model {

    constructor(){
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if( !this.todos || this.todos.length === 0 ){
            this.currentId = 1;
            this.todos = [];
        }else{
            this.currentId = this.todos[this.todos.length - 1 ].id + 1;
        }

    }

    setView(view) {
        this.view = view;
    }

    getTodos() {
        return this.todos.map( todo => ({...todo}) );
    }

    addTodo(Nombre, Autor, Edición, Páginas) {
        const todo = { 
            id: this.currentId++,
            Nombre, 
            Autor, 
            Edición, 
            Páginas,
            Editar: false,
            Eliminar: false
        };

        this.todos.push(todo);

        this.save();
        return {...todo};
    }

    findTodo(id){
        return this.todos.findIndex( t => t.id === id);
    }

    removeTodo(id){
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }

    save(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

}
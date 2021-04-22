import { Todo } from ".";

export class TodoList{

    constructor(){

        this.cargarLocalStorage();

    }

    nuevoTodo( todo ){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id){

        this.todos=this.todos.filter( todo => todo.id != id); // con la ayuda de la funcion filter se obtiene un arreglo cuyos id's de los elementos son distintos al id que resive la funcion y luego se guarde en el atributo de la clase todolist, que es una lista de objetos de tipo todo
        this.guardarLocalStorage();

    }

    marcarCompletado(id){

        for (const todo of this.todos) {
            
            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }

        }

    }

    eliminarCompletados(){

        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos));// JSON.stringify(this.todos) sirve para transformar un objeto a su forma JSON

    }

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []);

        this.todos = this.todos.map(obj => Todo.fromJson(obj));//Se hace un mapeo de todo el arreglo que esta en el dominio de los objetos literales, se transforma a objetos de tipo todo, esto con la ayuda de la funcion estatica o de clase fromJSON
                                
    }

}

// obj => Todo.fromJson(obj)
// Esto es un call back ya que del argumento obj se usa en otra funcion llamada por la funcion de flecha 
// Por lo que es comun ver solo Todo.fromJson siempre y cuando solo se un argumento usado en este caso solo se usa obj por lo que es viable
// en el caso de foreach, todos.forEach(todo => crearTodoHtml(todo)); tambien se puede poner todos.forEach(crearTodoHtml); por que solo se usa el argumento todo
// nota de recuerdo: forEach recive como argumenta una funcion de tipo flecha, tal cual significa: "para cada elemento del arreglo ejecutar lo que contiene la funcion de flecha"
// Ejemplo de foreach:
// const a = [1,2,3,4,5];
// a.forEach(consle.log);
// a.forEach(i => consle.log(i));
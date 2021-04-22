import { Todo } from "../classes";
import {todolist} from "../index";

// Referecnias al html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const ContadorPendientes = document.querySelector('todo-count');

// esta funcion recive un objeto de tipo todo (una tarea), la cual consiste en crear una clase en tipo html y luego la incerta
//  a la lista creada con anterioridad, la cual es una lista tal cual de tareas por hacer, entonces por asi decirlo se transforma
// de un objeto de JS a un objeto de HTML
export const crearTodoHtml = (todo) => {
    const HtmlTodo = `
    
        <li class="${(todo.completado)?'complited':''}" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox"  ${(todo.completado) ? 'checked' : ''}>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
		</li>

    `;

    const div = document.createElement('div');

    div.innerHTML = HtmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

const actualizarContadorPendientesHTML = (todolist) =>{
    
    const cont = todolist.todos.filter(todo => !todo.completado).length;
    const HtmlTodo = `<span class="todo-count"><strong>${cont}</strong> pendiente(s)</span>`

    const div = document.createElement('div');
    div.innerHTML = HtmlTodo;
    ContadorPendientes.append(div.firstElementChild);
    return div.firstElementChild;
}

// Eventos
//Funcion que sirve para agregar una nueva tarea y ademas agregarla en el html
txtInput.addEventListener('keyup',(event)=>{//event es la escuha del teclado, se va ir registrando que tecla se presiona, nos interesa la de enter en este caso


    if(event.keyCode === 13 && txtInput.value.length >0){
        const nuevoTodo = new Todo(txtInput.value);
        todolist.nuevoTodo(nuevoTodo);
        console.log(todolist);
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }

});

//Funcion que sirve para marcar como completada o eliminar alguna tarea y ademas implematar la modifiacion en el html
divTodoList.addEventListener('click', (event)=>{

    const nombreElemento = event.target.localName;//Lo unico que pueden ser es input, label o button
    // Esto sirve para obtener el id del label o boton al darse click
    //por lo consiguiente se obtiene el atributo data-id donde se guarda el id creado previamente
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){//Para cuando se da click en la flechita

        todolist.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

    }else if(nombreElemento.includes('button')){ // para cuando se da click en el tachecito 

        todolist.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

    console.log(todolist);

});

//Evento que al presionar el boton de "Borrar completados", elimina todas las tareas completadas
btnBorrar.addEventListener('click', ()=>{

    todolist.eliminarCompletados();
    
    for (let i = divTodoList.children.length-1; i>-1; i--) {
        
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
        
    }

});

ulFiltros.addEventListener('click', (event)=>{

    const  filtro = event.target.text;
    
    if(!filtro) {
        return;
    }

    anchorFiltros.forEach(elemento => elemento.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
       
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
            default:
                break;
        }

    }
});

ContadorPendientes.addEventListener('keyup',(event)=>{
    actualizarContadorPendientesHTML(todolist);
    

});
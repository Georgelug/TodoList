import './styles.css';

import {Todo, TodoList} from './classes'
import { crearTodoHtml } from './js/componentes';

export const todolist = new TodoList();

todolist.todos.forEach(todo => crearTodoHtml(todo));


// localStorage.setItem('myKey','abc123');
// sessionStorage.setItem('myKey', 'abc123');
// setTimeout(()=>{
//     localStorage.removeItem('myKey');
// },5000);//Funcion que sirve para ejecutar una funcion anonima en un tiempo determinado

// setTimeout(() => {
//     sessionStorage.removeItem('myKey');
// }, 5000);//Funcion que sirve para ejecutar una funcion anonima en un tiempo determinado


// // Local storage: se guarda la informacion del lado del cliente
// // Session storage: se guarda pero al cerrar el navegador se borra todo

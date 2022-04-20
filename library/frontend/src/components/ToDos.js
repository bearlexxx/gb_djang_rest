import React from "react";

const ToDoItem = ({todo, deleteTodoItem}) => {
   return (
       <tr>
           <td>
               {todo.text}
           </td>
           <td>
               {todo.user}
           </td>
           <td>
                <button onClick={()=>deleteTodoItem(todo.id)} type='button'>Удалить</button>
            </td>
       </tr>
   )
}

const ToDotList = ({todos, deleteTodoItem, is_authenticated}) => {
    const authenticated = is_authenticated();

    return (

       <table className="App-header">
            <thead>
            <tr>
                <th>
                    text
                </th>
                <th>
                    User
                </th>
            </tr>
            </thead>
           <tbody>
                {todos.map((todo) => <ToDoItem todo={todo} deleteTodoItem={deleteTodoItem}/>)}
           </tbody>
           {authenticated ? <a href='/todos/create/'>Создать заметку</a> : ''}
       </table>
   )
}


export default ToDotList;

import React from "react";
import EditNav from "./EditNav";
import Todo from "./Todo";


export default function TodoList({ todoList, toggleTodo ,openEditBar }) {
    return (
    todoList.map( todo => {
        return <Todo  key={todo.id} todoData={todo} toggleTodo={toggleTodo} openEditBar={openEditBar} /> 
    })
    
  );
}

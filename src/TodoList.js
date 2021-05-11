import React from "react";
import Todo from "./Todo";

export default function TodoList({
  todoList,
  toggleTodo,
  openEditBar,
  selectedList,
  myDay,
  isImportant,
  updateTodo,
}) {
  const filterPredicate = (e) => {
    if (myDay) return e.myday;
    else if(isImportant) return e.important;
    return e.list === selectedList;
  };
  const filteredTodos = todoList.filter(filterPredicate);

  return filteredTodos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todoData={todo}
        toggleTodo={toggleTodo}
        openEditBar={openEditBar}
        updateTodo={updateTodo}
      />
    );
  });
}

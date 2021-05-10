import React from "react";
import EditNav from "./EditNav";
import Todo from "./Todo";

export default function TodoList({
  todoList,
  toggleTodo,
  openEditBar,
  selectedList,
  myDay,
}) {
  const filterPredicate = (e) => {
    if (myDay) return e.myday;
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
      />
    );
  });
}

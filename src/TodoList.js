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
  total,
}) {
  const filterPredicate = (e) => {
    // maybe should go through list and show all of them 
    // or just check if has total value true just show them
    if(total) return e;
    else if(myDay) return e.myday;
    else if(isImportant) return e.important;
    else if(selectedList === e.list) return e.list;
    // return e.list === selectedList;
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

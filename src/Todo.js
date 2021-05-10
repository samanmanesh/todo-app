import React from "react";

export default function Todo({ todoData, toggleTodo, openEditBar }) {
  function handleTodoClick() {
    toggleTodo(todoData.id);
  }
  return (
    <div className="todo-elements">
      <input
        type="checkbox"
        checked={todoData.complete}
        onChange={handleTodoClick}
      />
      <div onClick={() => openEditBar(todoData.id)}>
        <span>{todoData.name}</span>
      </div>
    </div>
  );
}

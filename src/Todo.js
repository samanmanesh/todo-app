import React from "react";

export default function Todo({ todoData, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todoData.id);
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={todoData.complete}
        onChange={handleTodoClick}
      />
      <span onClick={() => console.log("hit me & open a side bar")}>{todoData.name}</span>
    </div>
  );
}

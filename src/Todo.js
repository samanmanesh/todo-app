import React from "react";

export default function Todo({ todoData, toggleTodo }) {
  
    function handleTodoClick() {
    toggleTodo(todoData.id);
  }

  return (
    <div>
      <label htmlFor="">
        <input
          type="checkbox"
          checked={todoData.complete}
          onChange={handleTodoClick}
        />
        {todoData.name}
      </label>
    </div>
  );
}

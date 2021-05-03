import React from "react";
import EditNav from "./EditNav";

export default function Todo({ todoData, toggleTodo, openEditBar}) {
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
      <span onClick={openEditBar}>{todoData.name}, <EditNav data={todoData}/>
      </span>
    </div>
  );
}

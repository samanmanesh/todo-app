import dayjs from "dayjs";
import React from "react";
import { ReactComponent as Important } from "./feather/star.svg";
export default function Todo({ todoData, toggleTodo, openEditBar,updateTodo }) {
  function handleTodoClick() {
    toggleTodo(todoData.id);
  }

  const handleImportant= () => {
    const newData = {...todoData, important: !todoData.important}
    updateTodo(newData);
  }

  const displayReminder = () => {
    
    // dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A');

    // return todoData.reminder.dayjs();
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
        <span>{displayReminder()}</span>
      </div>
      <button onClick={handleImportant}><Important className="logo" width={14} height={14}/></button>
    </div>
  );
}

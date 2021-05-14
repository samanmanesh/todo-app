import dayjs from "dayjs";
import React from "react";
import { ReactComponent as Important } from "./feather/star.svg";
export default function Todo({
  todoData,
  toggleTodo,
  openEditBar,
  updateTodo,
}) {
  function handleTodoClick() {
    toggleTodo(todoData.id);
  }

  const handleImportant = () => {
    const newData = { ...todoData, important: !todoData.important };
    updateTodo(newData);
  };

  // const displayReminder = () => {
  //   console.log(todoData);
  //   const day = dayjs(todoData.reminder);
  //   console.log(day.diff(dayjs(), "minute"));

  //   return dayjs(todoData.reminder).format('YYYY-MM-DD');

   
  //   // return day.isBefore(dayjs())
  //   //   ? dayjs(todoData.reminder).format("YYYY-MM-DD")
  //   //   : "";
  // };

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
      <button onClick={handleImportant}>
        <Important className="logo" width={14} height={14} />
      </button>
    </div>
  );
}

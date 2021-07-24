import dayjs from "dayjs";
import React from "react";
import { ReactComponent as Important } from "./feather/star.svg";
import { ReactComponent as ReminderLogo } from "./feather/bell.svg";
import { ReactComponent as Calendar } from "./feather/calendar.svg";

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
  const displayDue = () => {
    if (todoData.due) return dayjs(todoData.due).format(" MMM-DD");
  };
  const displayDot = () => {
    if (todoData.reminder && todoData.due) return " . ";
  };
  return (
    <div className="todo-elements">
      <input
        className="checkbox"
        type="checkbox"
        checked={todoData.complete}
        onChange={handleTodoClick}
      />
      <div onClick={() => openEditBar(todoData.id)}>
        <span className="todo-name">
          {todoData.name}
          <div className="option-container">
            {todoData.due && (
              <div className="todo-due">
                <Calendar
                  className="todo-due-calendar"
                  width={13}
                  height={13}
                />
                {displayDue()}
              </div>
            )}
            <span className="dot">{displayDot()}</span>
            {todoData.reminder && (
              <ReminderLogo className="reminder-logo" width={13} height={13} />
            )}
          </div>
        </span>
      </div>
      <button onClick={handleImportant}>
        <Important className="logo" width={14} height={14} />
      </button>
    </div>
  );
}

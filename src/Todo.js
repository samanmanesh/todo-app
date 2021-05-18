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
          {todoData.due && 
            <div className="todo-due"> <Calendar width={13} height={13}/>
                {displayDue()}
            </div>  
          } 
          
        {todoData.reminder &&
          <ReminderLogo className="reminder-logo" width={13} height={13}/>
        }
        
      </div>
      <button onClick={handleImportant}>
        <Important className="logo" width={14} height={14} />
      </button>
    </div>
  );
}

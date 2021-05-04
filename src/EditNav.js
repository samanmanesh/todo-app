import React, { useState } from "react";
import Reminder from "./Reminder";

export default function EditNav({ todoData, toggleTodo }) {
  const [isClickedReminder, setIsClickedReminder] = useState(false);

  if (todoData === undefined) return null;
  function handleTodoClick() {
    toggleTodo(todoData.id);
  }

  function handleReminderClick() {
    isClickedReminder === false
      ? setIsClickedReminder(true)
      : setIsClickedReminder(false);
  }
  return (
    <div className="edit-nav">
      <div className="edit-todo">
        <input
          type="checkbox"
          checked={todoData.complete}
          onChange={handleTodoClick}
        />
        {todoData.name}
      </div>
      <div className="myday">Add to My Day</div>
      <div className="reminder">
        <button onClick={handleReminderClick} className="popup-button">
          Remind me
          {isClickedReminder && (
            <Reminder>
              <p>Reminder</p>
              <button>Later today 10:00 PM</button>
              <button>Tomorrow Tue, 9 Am</button>
              <button>Next week Mon,9 Am</button>
              <button>Pick a data &amp; time</button>
            </Reminder>
          )}
        </button>
        <button>Add due date</button>
        <button>Repeat</button>
      </div>
      <textarea name="notepad" cols="15" rows="10"></textarea>
    </div>
  );
}

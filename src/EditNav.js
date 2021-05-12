import React, { useState } from "react";
import Reminder from "./Reminder";
import { ReactComponent as MyDay } from "./feather/sun.svg";
import { ReactComponent as Calendar } from "./feather/calendar.svg";
import { ReactComponent as ReminderLogo } from "./feather/bell.svg";
import { ReactComponent as Repeat } from "./feather/repeat.svg";

export default function EditNav({ todoData, updateTodo }) {
  const [isClickedReminder, setIsClickedReminder] = useState(false);

  if (todoData === undefined) return null;

  function toggleTodo() {
    const newTodo = { ...todoData, complete: !todoData.complete };
    updateTodo(newTodo);
  }

  function handleReminderClick() {
    isClickedReminder === false
      ? setIsClickedReminder(true)
      : setIsClickedReminder(false);
  }

  const updateNote = (newText) => {
    const newTodo = { ...todoData, notes: newText };
    updateTodo(newTodo);
  };

  const handleNameChange = (e) => {
    const newTodo = { ...todoData, name: e.target.value };
    updateTodo(newTodo);
  };

  const handleAddToMyDay = () => {
    const myDay = { ...todoData, myday: !todoData.myday };
    // console.log({myDay})
    updateTodo(myDay);
  };

  return (
    <div className="edit-nav">
      <div className="edit-todo">
        <input
          type="checkbox"
          checked={todoData.complete}
          onChange={toggleTodo}
        />
        <input
          value={todoData.name}
          className="edit-name"
          onChange={handleNameChange}
        ></input>
      </div>
      <button className="my-day-editbar" onClick={handleAddToMyDay}>
        <MyDay className="my-day-editbar-logo" height={14} height={14} />
        Add{todoData.myday && "ed"} to My Day
      </button>
      <div className="reminder">
        <button onClick={handleReminderClick} className="popup-button">
          <ReminderLogo className="reminder-logo" height={14} height={14} />
          Remind me
          {isClickedReminder && (
            <Reminder>
              <p>Reminder</p>
              <hr />
              <button>Later today 10:00 PM</button>
              <button>Tomorrow Tue, 9 Am</button>
              <button>Next week Mon, 9 Am</button>
              <button>Pick a data &amp; time</button>
            </Reminder>
          )}
        </button>
        <button>
          <Calendar className="Add-due-date-logo" height={14} height={14} />
          Add due date
        </button>
        <button>
          <Repeat className="repeat-logo" height={14} width={14} />
          Repeat
        </button>
      </div>
      <textarea
        className="text-area"
        name="notepad"
        cols="15"
        rows="10"
        value={todoData.notes}
        onChange={(e) => updateNote(e.target.value)}
      />
    </div>
  );
}

import React, { useState } from "react";
import Reminder from "./Reminder";

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

  const handleNameChange = e => {
    const newTodo = { ...todoData, name: e.target.value };
    updateTodo(newTodo);
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
      <textarea
        name="notepad"
        cols="15"
        rows="10"
        value={todoData.notes}
        onChange={(e) => updateNote(e.target.value)}
      />
    </div>
  );
}

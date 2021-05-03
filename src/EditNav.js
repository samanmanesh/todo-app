import React from "react";

export default function EditNav({ todoData }) {
  if (todoData === undefined) return null;

  return (
    <div className="edit-nav">
      <div className="edit-todo">
        {todoData.name}
      </div>
      <div className="myday">Add to My Day</div>
      <div className="reminder">
        <div>Remind me</div>
        <div>Add due date</div>
        <div>Repeat</div>
      </div>
      <div className="notepad"> notepad</div>
    </div>
  );
}

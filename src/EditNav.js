import React from "react";

export default function EditNav({data}) {
  return (
    <div className="edit-nav">
      <div className="edit-todo">
        {data.name}    
        <br/>   
        show the todo
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

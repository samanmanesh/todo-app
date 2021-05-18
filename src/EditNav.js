import React, { useState } from "react";
import Reminder from "./Reminder";
import DatePicker from "react-datepicker";
import Due from "./Due";
// import "react-datepicker/dist/react-datepicker.css";

import dayjs from "dayjs";
import { ReactComponent as MyDay } from "./feather/sun.svg";
import { ReactComponent as Calendar } from "./feather/calendar.svg";
import { ReactComponent as ReminderLogo } from "./feather/bell.svg";
import { ReactComponent as Repeat } from "./feather/repeat.svg";
import { ReactComponent as Close } from "./feather/x.svg";
import { ReactComponent as Rotate } from "./feather/rotate-ccw.svg";
import { ReactComponent as ArrowRight } from "./feather/arrow-right-circle.svg";
import { ReactComponent as Chevrons } from "./feather/chevrons-right.svg";

export default function EditNav({ todoData, updateTodo }) {
  const [isClickedReminder, setIsClickedReminder] = useState(false);
  const [isClickPickDay, setIsClickPickDay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [tomorrow, setTomorrow] = useState(new Date());
  const [isClickDue, setIsClickDue] = useState(false);

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

  const handleAddReminder = (e) => {
    const reminder = { ...todoData, reminder: e };
    console.log(reminder);
    updateTodo(reminder);
  };

  const displayReminderTime = () => {
    // const date = dayjs(todoData.reminder).format('YYYY-MM-DD')
    if (todoData.reminder) {
      const title = "Remind me at \n";
      return "Remind me at " + dayjs(todoData.reminder).format(" h:mm A");
    } else {
      return "Remind me";
    }
  };
  const displayReminderDate = () => {
    if (todoData.reminder) {
      const title = "Remind me at \n";
      return dayjs(todoData.reminder).format(" MMM-DD");
    }
  };

  const handleAddDue = (e) => {
    const dueDate = { ...todoData, due: e };
    console.log(dueDate);
    updateTodo(dueDate);
  };
  const displayDueDate = () => {
    if (todoData.due) {
      const title = "Due";
      return title + dayjs(todoData.due).format(" MMM-DD");
    }else {
      return "Add due date";
    }
  };

  return (
    <div className="edit-nav">
      <div className="edit-todo">
        <input
          className="checkbox"
          type="checkbox"
          checked={todoData.complete}
          onChange={toggleTodo}
        />
        <input
          className="edit-name"
          value={todoData.name}
          onChange={handleNameChange}
        ></input>
      </div>
      <button className="my-day-editbar" onClick={handleAddToMyDay}>
        <MyDay className="my-day-editbar-logo" height={17} height={17} />
        Add{todoData.myday && "ed"} to My Day
      </button>
      <div className="reminder">
        <div className="editbar-container">
          <button
            onClick={() => setIsClickedReminder(!isClickedReminder)}
            className="popup-button-remind"
          >
            <ReminderLogo className="reminder-logo" height={17} height={17} />
            {displayReminderTime()}

            <div className="reminder-date">
              {setIsClickPickDay && displayReminderDate()}
            </div>
          </button>
          {todoData.reminder && (
            <Close
              className="cancel"
              onClick={() => {
                handleAddReminder(null);
                setIsClickedReminder(false);
              }}
              width={18}
              height={18}
            />
          )}
        </div>
        {isClickedReminder && (
          <Reminder onClick={() => setIsClickedReminder(false)}>
            <p>Reminder</p>
            <hr />
            <button>
              <Rotate width={16} height={16} /> Later today 10:00 PM
            </button>
            <button>
              <ArrowRight width={16} height={16} /> Tomorrow Tue, 9 Am
            </button>
            <button>
              <Chevrons width={16} height={16} /> Next week Mon, 9 Am
            </button>
            <button
              onClick={() => {
                setIsClickPickDay(true);
                setIsClickedReminder(true);
              }}
            >
              <Calendar width={16} height={16} /> Pick a date &amp; time
            </button>
            {isClickPickDay && (
              <div className="date-time-picker-container">
                <DatePicker
                  // inline
                  className="date-time-picker"
                  selected={startDate}
                  // showTimeSelect
                  showTimeInput
                  dateFormat="Pp"
                  onChange={(date) => {
                    setStartDate(date);
                    handleAddReminder(date);
                  }}
                />
                <Close
                  className="date-time-picker-close-logo"
                  width={19}
                  height={19}
                  onClick={() => setIsClickedReminder(!isClickedReminder)}
                />
              </div>
            )}
          </Reminder>
        )}
        <div className="editbar-container">
          <button
            className="popup-button-due"
            onClick={() => setIsClickDue(!isClickDue)}
          >
            <Calendar className="Add-due-date-logo" height={17} height={17} />
            {displayDueDate()}
          </button>
          <Close
            className="cancel"
            onClick={() => {
              handleAddDue(null);
              setIsClickedReminder(false);
            }}
            width={18}
            height={18}
          />
        </div>
        {isClickDue && (
          <Due>
            <p>Due</p>
            <hr />
            <button>
              <Rotate width={16} height={16} /> Later today 10:00 PM
            </button>
            <button>
              <ArrowRight width={16} height={16} /> Tomorrow Tue, 9 Am
            </button>
            <button>
              <Chevrons width={16} height={16} /> Next week Mon, 9 Am
            </button>
            <button
              onClick={() => {
                setIsClickPickDay(true);
                // setIsClickedReminder(true);
              }}
            >
              <Calendar width={16} height={16} /> Pick a date &amp; time
            </button>
            {isClickPickDay && (
              <div className="date-time-picker-container">
                <DatePicker
                  className="date-time-picker"
                  selected={startDate}
                  showTimeInput
                  dateFormat="Pp"
                  onChange={(date) => {
                    setStartDate(date);
                    handleAddDue(date);
                  }}
                />
                <Close
                  className="date-time-picker-close-logo"
                  width={19}
                  height={19}
                  onClick={() => setIsClickDue(!isClickDue)}
                />
              </div>
            )}
          </Due>
        )}

        <button>
          <Repeat className="repeat-logo" height={17} width={17} />
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

      {/* <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          handleAddReminder(date);
        }} */}

      {/* <DateRange date={date} onChange={(date) => setDate(date)}/> */}
      {/* <DateTimePicker
      className = "date-time-picker"
                   onChange={{onChange}}
                   value={value}
                 /> */}
    </div>
  );
}

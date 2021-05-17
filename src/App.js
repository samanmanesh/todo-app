import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import EditNav from "./EditNav";
import { ReactComponent as Close } from "./feather/x.svg";
import { ReactComponent as Add } from "./feather/plus.svg";
import { ReactComponent as MyDay } from "./feather/sun.svg";
import { ReactComponent as Important } from "./feather/star.svg";
const TODOS_KEY = "todoApp.todos";
const LISTS_KEY = "todoApp.lists";

function App() {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [myDay, setMyDay] = useState(false);
  const [important, setImportant] = useState(false);
  const [total, setTotal] = useState(false);
  const [isMakingList, setIsMakingList] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const todoNameRef = useRef();
  const listNameRef = useRef();

  //reading & loading the stored items
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
    if (storedTodos) setTodos(storedTodos);

    const storedLists = JSON.parse(localStorage.getItem(LISTS_KEY));
    if (storedLists) setLists(storedLists);
  }, []);

  // saving the todo items
  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
  }, [lists]);

  function handleAddTodo() {
    const name = todoNameRef.current.value;

    if (name === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          name: name,
          complete: false,
          list: selectedList,
          notes: "",
          myday: false,
          important: false,
          total: true,
          reminder:"",
          due:"",
        },
      ];
    });
    todoNameRef.current.value = null;
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const foundTodo = newTodos.find((todo) => todo.id === id);
    foundTodo.complete = !foundTodo.complete;
    setTodos(newTodos);
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function makeList() {
    const listName = listNameRef.current.value;
    if (
      listName === null ||
      listName === " " ||
      lists.some((e) => e === listName)
    )
      return;
    setLists((prevLists) => [...prevLists, listName]);
    listNameRef.current.value = null;
    setIsMakingList(false);
    setSelectedList(listName);
  }

  const removeList = (removedList) => {
    const newTodos = todos.filter((todo) => todo.list !== removedList);
    setTodos(newTodos);
    let updatedLists = lists.filter((list) => list !== removedList);
    setSelectedList("");
    // setMyDay(true)
    setLists(updatedLists);
  };

  function selectTodo(todoID) {
    if (todoID === selectedTodo) setSelectedTodo(null);
    else setSelectedTodo(todoID);
  }

  useEffect(() => {
    if (!todos.some((e) => e.id === selectedTodo)) {
      setSelectedTodo(null);
    }
  }, [todos]);

  /**
   * Take in the updated todo (newTodo), and setTodos to be a new
   * array with old todos + newTodo
   *
   * @param {todo object} newTodo: todo that we are updating
   */
  const updateTodo = (newTodo) => {
    // remove old version
    let filteredTodos = todos.filter((todo) => todo.id !== newTodo.id);

    // put in new version
    filteredTodos.push(newTodo);

    // set
    setTodos(filteredTodos);
  };

  const selectList = (listName) => {
    setSelectedList(listName);
    setMyDay(false);
    setImportant(false);
    setTotal(false);
  };

  const displayTitle = () => {
    if (myDay) return "My Day";
    if (important) return "Important";
    if (selectedList) return selectedList;
    if (total) return "Total";
  };
  const changingMyDayState = (myDay) => {
    setMyDay(true);
    setImportant(false);
    setTotal(false);
  };

  const changingImportantState = (important) => {
    setImportant(true);
    setMyDay(false);
    setTotal(false);
  };

  const changingTotalState = (total) => {
    setTotal(true);
    setImportant(false);
    setMyDay(false);
    setSelectedList("");
  };

  const displayTime = () => {
    const showDate = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Jun",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = days[showDate.getDay()];
    const month = months[showDate.getMonth()];
    const date = showDate.getDate();
    const displayTodaysDate = day + ", " + month + " " + date;
    return displayTodaysDate;
  };

  const leftTodos = () => {
    if (selectedList) {
      const leftTodo = todos.filter((todo) => todo.list === selectedList)
        .length;
      return leftTodo;
    }
    if (myDay) {
      const myDayLeftTodo = todos.filter((todo) => todo.myday === myDay).length;
      return myDayLeftTodo;
    }
    if (important) {
      const importantLeftTodo = todos.filter(
        (todo) => todo.important === important
      ).length;
      return importantLeftTodo;
    } else {
      return todos.filter((todo) => !todo.complete).length;
    }
  };

  // return (
  //   <div>
  //     <DatePicker selected={startDate} />
  //   </div>
  // );
  return (
    <div className="foundation">
      <div className="topbar">
        <img
          src="https://source.unsplash.com/random/1917x140"
          alt="this is a picture"
        />
      </div>
      <div className="main">
        <div className="sidebar">
          <div className="options-container">
            <button
              className="my-day-sidebar"
              onClick={() => changingMyDayState(myDay)}
            >
              <MyDay className="logo" height={16} width={16} />
              My Day
            </button>
            <button
              className="my-day-sidebar"
              onClick={() => changingImportantState(important)}
            >
              <Important className="logo" height={16} width={16} />
              Important
            </button>
          </div>
          <div className="lists-container">
            <div className="total" onClick={() => {changingTotalState(total); setSelectedTodo(null)}}>
              Total
            </div>
            <div>
              {lists.map((list) => (
                <div
                  className="sidebar-list"
                  key={uuidv4()}
                  onClick={() => {selectList(list); setSelectedTodo(null)}}
                >
                  <span>{list}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeList(list);
                    }}
                  >
                    <Close width={17} height={17} />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="new-list-button"
              onClick={() => setIsMakingList(true)}
            >
              {" "}
              + New List{" "}
            </button>
          </div>
          <div>
            {/* <DatePicker selected={startDate}  onChange={date => setStartDate(date)} popperProps={{placement: 'right'}}/> */}
          </div>
        </div>
        <div className="todo">
          <p className="selected-list"> {displayTitle()} </p>
          {myDay && <div className="date"> {displayTime()} </div>}
          <div className="add-todo">
            <button className="add-todo-button" onClick={handleAddTodo}>
              <Add width={28} height={28} />
            </button>
            <input
              className="add-task-input"
              ref={todoNameRef}
              type="text"
              placeholder="Add a task"
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              autoFocus
            />
          </div>
          <br />
          <div className="left-todo">
            {leftTodos()} left to do
            {/* {todos.filter((todo) => !todo.complete).length} left to do */}
          </div>
          <button className="clear-todos" onClick={handleClearTodos}>
            Clear Completed Todos{" "}
          </button>
          <TodoList
            todoList={todos}
            toggleTodo={toggleTodo}
            openEditBar={selectTodo}
            selectedList={selectedList}
            myDay={myDay}
            isImportant={important}
            updateTodo={updateTodo}
            total={total}
          />
        </div>

        {isMakingList && (
          <Modal>
            <div>New List</div>
            <input
              type="text"
              name="new-list-input"
              placeholder="List Name"
              autoFocus
              ref={listNameRef}
              onKeyDown={(e) => e.key === "Enter" && makeList()}
            />
            <button onClick={makeList}>Make List</button>
            <button onClick={() => setIsMakingList(false)}>Cancel</button>
          </Modal>
        )}
        {selectedTodo && (
          <EditNav
            todoData={todos.find((e) => e.id === selectedTodo)}
            updateTodo={updateTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;

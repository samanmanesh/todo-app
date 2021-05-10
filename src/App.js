import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import EditNav from "./EditNav";
import FeatherIcon from "feather-icons-react";

const TODOS_KEY = "todoApp.todos";
const LISTS_KEY = "todoApp.lists";

function App() {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
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
  }

  const removeList = (removedList) => {
    const newTodos = todos.filter((todo) => todo.list !== removedList);
    setTodos(newTodos);
    let listName = lists.filter((list) => list !== removedList);
    setSelectedList("");
    setLists(listName);
  };

  function selectTodo(todoID) {
    if (todoID === selectedTodo) setSelectedTodo(null);
    else setSelectedTodo(todoID);
  }

  useEffect(() => {
    if (!todos.some((e) => e.id === selectedTodo)) {
      console.log("selected is gone!");
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

  return (
    <div className="main">
      <div className="sidebar">
        <div>
          {lists.map((list) => (
            <p className="sidebar-list" key={uuidv4()}>
              <span onClick={() => setSelectedList(list)}>{list}</span>
              <button onClick={() => removeList(list)}>
                <FeatherIcon className="feather-Icon" icon="close" size="11" />
              </button>
            </p>
          ))}
        </div>
        <button onClick={() => setIsMakingList(true)}> + New List </button>
      </div>
      <div className="todo">
        <p className="selected-list"> {selectedList} </p>
        <button className="add-todo" onClick={handleAddTodo}>+</button>
        <input
          className="add-task-input"
          ref={todoNameRef}
          type="text"
          placeholder="Add a task"
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          autoFocus
        />
        <br/>
        <button className="clear-todos" onClick={handleClearTodos}>Clear Completed Todos</button>
        <div className="left-todo">
          {todos.filter((todo) => !todo.complete).length} left to do
        </div>
        <hr/>
        {/* <p> {selectedList} </p> */}
        <TodoList
          todoList={todos}
          toggleTodo={toggleTodo}
          openEditBar={selectTodo}
          selectedList={selectedList}
        />
      </div>

      {isMakingList && (
        <Modal>
          <p>New List</p>
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
  );
}

export default App;

//todo I want first when I click a list it shows the related todos and add to do option It must add every todo and put that name for list

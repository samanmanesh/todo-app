import react, { useState, useRef, useEffect } from "react";
import "./App.scss";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import EditNav from "./EditNav";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [isMakingList, setIsMakingList] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const todoNameRef = useRef();
  const listNameRef = useRef();

  //reading & loading the stored items
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // saving the items
  useEffect(() => {
    const LOCAL_STORAGE_KEY = "todoApp.todos";
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuidv4(), name: name, complete: false, list: "" },
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
    if (listName === null || lists.some((e) => e === listName)) return;
    setLists((prevLists) => [...prevLists, listName]);
    listNameRef.current.value = null;
  }
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

  return (
    <div className="main">
      <div className="sidebar">
        This is the side bar
        <div>
          {lists.map((e) => (
            <p key={uuidv4()}>{e}</p>
          ))}
        </div>
        <button onClick={() => setIsMakingList(true)}> + New List</button>
      </div>
      <div className="todo-tm">
        <TodoList
          todoList={todos}
          toggleTodo={toggleTodo}
          openEditBar={selectTodo}
        />
        <input
          ref={todoNameRef}
          type="text"
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearTodos}>Clear Completed Todos</button>
        <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
      </div>
      {isMakingList && (
        <Modal>
          <p>New List</p>
          <input
            type="text"
            name="new-list-input"
            placeholder="List Name"
            ref={listNameRef}
            onKeyDown={(e) => e.key === "Enter" && makeList()}
          />
          <button onClick={makeList}>Make List</button>
          <button onClick={() => setIsMakingList(false)}>Cancel</button>
        </Modal>
      )}
      {selectedTodo && (
        <EditNav todoData={todos.find((e) => e.id === selectedTodo)} />
      )}
    </div>
  );
}

export default App;

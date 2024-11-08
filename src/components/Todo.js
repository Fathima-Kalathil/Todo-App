import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react"; // make sure to import useRef and useEffect
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import "./Todo.css";

function Todo() {
  const [todo, setTodo] = useState(""); // State for input value
  const [todos, setTodos] = useState([]); // State for list of todos
  const [editId, setEditId] = useState(0); // State to track editing todo

  // States for success, error, and delete messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const inputRef = useRef(null); // Reference for the input field

  useEffect(() => {
    inputRef.current.focus(); // Focus on the input field when the component is rendered
  }, []);

  // Handle form submit (when enter key is pressed)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Function to add or edit todo
  const addTodo = () => {
    if (todo === "") {
      setErrorMessage("Todo cannot be empty");
      setSuccessMessage(""); // Clear any success message
      setDeleteMessage(""); // Clear any delete message
      clearMessages();
      return;
    }

    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updateTodo = todos.map((to) =>
        to.id === editTodo.id ? { ...to, list: todo } : to
      );
      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
      setSuccessMessage("Todo successfully updated");
      setErrorMessage(""); // Clear any error message
      setDeleteMessage(""); // Clear any delete message
      clearMessages();
    } else {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo("");
      setSuccessMessage("Todo successfully added");
      setErrorMessage(""); // Clear any error message
      setDeleteMessage(""); // Clear any delete message
      clearMessages();
    }
  };

  // Function to delete a todo
  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
    setDeleteMessage("Todo successfully deleted");
    setSuccessMessage(""); // Clear any success message
    setErrorMessage(""); // Clear any error message
    clearMessages();
  };

  // Function to mark a todo as completed or incomplete
  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  // Function to edit a todo (populate the input field with the todo's value)
  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.list);
    setEditId(editTodo.id);
  };

  // Function to clear messages after a certain period
  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
      setDeleteMessage("");
    }, 5000); // Clears messages after 3 seconds
  };

  // Log the messages for debugging
  console.log("Success Message: ", successMessage);
  console.log("Error Message: ", errorMessage);
  console.log("Delete Message: ", deleteMessage);

  return (
    <div className="container">
      <h2>TODO APP</h2>

      {/* Conditionally render success, error, and delete messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}

      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef} // assign inputRef to input field
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button type="button" onClick={addTodo}>
          {editId ? "EDIT" : "ADD"}
        </button>
      </form>

      <div>
        <ul>
          {todos.map((to) => (
            <li key={to.id} className="list-items">
              <div className={`list-item-list ${to.status ? "completed" : ""}`}>
                {to.list}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(to.id)}
                />
                <FiEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(to.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;

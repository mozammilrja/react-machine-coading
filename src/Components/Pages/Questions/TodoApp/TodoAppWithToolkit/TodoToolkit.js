// TodoApp.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, editTodo } from "../../../../../Redux/Slices/todoSlice";

const TodoApp = () => {
    const [inputValue, setInputValue] = useState("");
    const [editValue, setEditValue] = useState("");
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();
    const todos = useSelector((state) => state?.todo);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleEditInputChange = (event) => {
        setEditValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== "") {
            dispatch(addTodo(inputValue));
            setInputValue("");
        }
    };

    const handleToggleTodo = (id) => {
        dispatch(toggleTodo(id));
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleEditTodo = (id, text) => {
        setEditId(id);
        setEditValue(text);
    };

    const handleSaveEdit = () => {
        if (editValue.trim() !== "") {
            dispatch(editTodo({ id: editId, text: editValue }));
            setEditId(null);
            setEditValue("");
        }
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditValue("");
    };

    return (
        <div>
            <h1>Todo App</h1>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Add a todo"
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos?.map((todo) => (
                    <li key={todo.id}>
                        {editId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={handleEditInputChange}
                                />
                                <button onClick={handleSaveEdit}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span
                                    style={{
                                        textDecoration: todo.completed ? "line-through" : "none",
                                    }}
                                    onClick={() => handleToggleTodo(todo.id)}
                                >
                                    {todo.text}
                                </span>
                                <button onClick={() => handleEditTodo(todo.id, todo.text)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteTodo(todo.id)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;

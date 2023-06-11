import React, { useState } from "react";

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editIndex, setEditIndex] = useState(-1);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== "") {
            setTodos([...todos, { text: inputValue, completed: false }]);
            setInputValue("");
        }
    };

    const handleDeleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const handleCompleteTodo = (index) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleEditTodo = (index) => {
        setEditIndex(index);
        setInputValue(todos[index].text);
    };

    const handleUpdateTodo = () => {
        if (inputValue.trim() !== "") {
            setTodos((prevTodos) =>
                prevTodos.map((todo, i) =>
                    i === editIndex ? { ...todo, text: inputValue } : todo
                )
            );
            setInputValue("");
            setEditIndex(-1);
        }
    };

    return (
        <div>
            <h1>Todo App</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter todo"
                />
                {editIndex !== -1 ? (
                    <button onClick={handleUpdateTodo}>Update</button>
                ) : (
                    <button onClick={handleAddTodo}>Add</button>
                )}
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span
                            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => handleCompleteTodo(index)}>
                            {todo.completed ? "Undo" : "Complete"}
                        </button>
                        <button onClick={() => handleEditTodo(index)}>Edit</button>
                        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;

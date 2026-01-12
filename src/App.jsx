// React imports
import { useState } from 'react'
// Custom hooks
import { useTheme } from './hooks/useTheme'
// Styles
import './App.css'

/**
 * Main App component - A todo list application with theme switching functionality
 * Features:
 * - Add new todos
 * - Toggle todo completion status
 * - Delete todos
 * - Light/Dark theme switching
 * - Navigation links
 */
function App() {
  // State for managing the list of todos
  const [todos, setTodos] = useState([])
  
  // State for managing the input field value
  const [inputValue, setInputValue] = useState('')
  
  // Custom hook for theme management (light/dark mode)
  const { theme, toggleTheme } = useTheme()

  /**
   * Handles adding a new todo item
   * @param {Event} e - Form submission event
   */
  const addTodo = (e) => {
    e.preventDefault()
    
    // Don't add empty todos
    if (inputValue.trim() === '') return

    // Add new todo with unique ID, text, and default uncompleted status
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false }
    ])
    
    // Clear the input field after adding
    setInputValue('')
  }

  /**
   * Toggles the completion status of a todo item
   * @param {number} id - The unique ID of the todo to toggle
   */
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  /**
   * Removes a todo item from the list
   * @param {number} id - The unique ID of the todo to delete
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      {/* Header section with navigation and theme toggle */}
      <header className="app-header">
        {/* Navigation links */}
        <nav className="nav-links">
          <a href="/" className="nav-link active">Home</a>
          <a href="/contact" className="nav-link">Contact</a>
        </nav>
        
        {/* Main application title */}
        <h1>My List</h1>
        
        {/* Theme toggle button - switches between light and dark modes */}
        <button onClick={toggleTheme} className="theme-btn">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      {/* Todo input form */}
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
          aria-label="New todo input"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>

      {/* Todo items list */}
      <ul className="todo-list" role="list">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            role="listitem"
          >
            {/* Checkbox for marking todo as complete/incomplete */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            
            {/* Todo text content */}
            <span className="todo-text">{todo.text}</span>
            
            {/* Delete button for removing todo */}
            <button 
              onClick={() => deleteTodo(todo.id)} 
              className="delete-btn"
              aria-label={`Delete "${todo.text}"`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Empty state message when no todos exist */}
      {todos.length === 0 && (
        <p className="empty-message">No tasks yet. Add one above!</p>
      )}
    </div>
  )
}

export default App
